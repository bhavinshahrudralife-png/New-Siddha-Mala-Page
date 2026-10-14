import os
import time
import uuid

import pytest
import requests
from dotenv import dotenv_values


BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    frontend_env = dotenv_values("/app/frontend/.env")
    BASE_URL = frontend_env.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)
BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture
def api_client():
    """Shared HTTP client for public and auth endpoints."""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def test_api_root_health_message(api_client):
    """Root API endpoint returns expected service message."""
    response = api_client.get(f"{BASE_URL}/api/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Rudralife Siddha Mala API"


def test_content_endpoint_has_required_fields(api_client):
    """Public content endpoint returns landing content fields."""
    response = api_client.get(f"{BASE_URL}/api/content")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data.get("hero_title"), str)
    assert isinstance(data.get("hero_subtitle"), str)
    assert isinstance(data.get("phone"), str)
    assert isinstance(data.get("email"), str)
    flat = " ".join(str(v) for v in data.values()).lower()
    assert "ॐ" not in flat
    assert "nakshatra" not in flat
    assert "27+1" not in flat


def test_enquiry_invalid_email_validation(api_client):
    """Public enquiry endpoint rejects malformed emails."""
    payload = {
        "name": "TEST Invalid Email",
        "email": "invalid-email",
        "phone": "9999999999",
        "country": "IN",
        "country_code": "+91",
        "city": "Mumbai",
        "profession": "QA",
        "message": "invalid email test",
    }
    response = api_client.post(f"{BASE_URL}/api/enquiries", json=payload)
    assert response.status_code == 422


def test_admin_login_invalid_credentials(api_client):
    """Auth login rejects bad credentials with 401."""
    response = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": "admin@rudralife.com", "password": "wrong-password"},
    )
    assert response.status_code == 401
    detail = response.json().get("detail", "")
    assert "invalid" in detail.lower()


def test_auth_bruteforce_lock_after_five_failures(api_client):
    """Auth lockout triggers after repeated failed login attempts."""
    unique_email = f"no-user-{uuid.uuid4().hex[:8]}@example.com"
    endpoint = f"{BASE_URL}/api/auth/login"
    statuses = []
    for _ in range(6):
        response = api_client.post(endpoint, json={"email": unique_email, "password": "bad-pass"})
        statuses.append(response.status_code)
        time.sleep(0.05)
    assert statuses[:5] == [401, 401, 401, 401, 401]
    assert statuses[5] == 429


@pytest.fixture
def admin_client(api_client):
    """Authenticated admin session and login response."""
    response = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": "admin@rudralife.com", "password": "Rudralife@2025"},
    )
    assert response.status_code == 200, f"Admin login failed: {response.status_code} {response.text}"
    return api_client, response


def test_login_sets_secure_httponly_cookie(admin_client):
    """Login must set httpOnly secure cookie with SameSite=None."""
    _, response = admin_client
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "admin@rudralife.com"
    set_cookie = response.headers.get("set-cookie", "")
    assert "access_token=" in set_cookie
    assert "HttpOnly" in set_cookie
    assert "Secure" in set_cookie
    assert "SameSite=none".lower() in set_cookie.lower()


def test_auth_me_requires_authentication(api_client):
    """/auth/me should reject anonymous requests."""
    response = api_client.get(f"{BASE_URL}/api/auth/me")
    assert response.status_code == 401


def test_auth_me_returns_user_for_authenticated_session(admin_client):
    """/auth/me returns current admin profile after login."""
    client, _ = admin_client
    response = client.get(f"{BASE_URL}/api/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "admin@rudralife.com"
    assert data["role"] == "admin"


def test_admin_leads_protected_without_auth(api_client):
    """Admin leads endpoint should be protected."""
    response = api_client.get(f"{BASE_URL}/api/admin/leads")
    assert response.status_code == 401


def test_enquiry_create_visible_in_admin_then_delete(api_client, admin_client):
    """Create lead -> verify in admin list -> delete lead -> verify removed."""
    client, _ = admin_client
    marker = uuid.uuid4().hex[:8]
    payload = {
        "name": f"TEST Lead {marker}",
        "email": f"test-lead-{marker}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+91",
        "city": "Mumbai",
        "profession": "QA Engineer",
        "message": "TEST lead for API verification",
    }

    create_response = api_client.post(f"{BASE_URL}/api/enquiries", json=payload)
    assert create_response.status_code == 200
    created = create_response.json()
    assert created["name"] == payload["name"]
    assert created["email"] == payload["email"]
    assert isinstance(created["id"], str)

    leads_response = client.get(f"{BASE_URL}/api/admin/leads")
    assert leads_response.status_code == 200
    leads = leads_response.json()
    match = [l for l in leads if l["id"] == created["id"]]
    assert len(match) == 1
    assert match[0]["email"] == payload["email"]

    delete_response = client.delete(f"{BASE_URL}/api/admin/leads/{created['id']}")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "Deleted"

    leads_after_delete = client.get(f"{BASE_URL}/api/admin/leads")
    assert leads_after_delete.status_code == 200
    ids_after = [l["id"] for l in leads_after_delete.json()]
    assert created["id"] not in ids_after


def test_admin_content_update_persists_then_restore(admin_client):
    """Update admin content and restore original values."""
    client, _ = admin_client
    original_response = client.get(f"{BASE_URL}/api/content")
    assert original_response.status_code == 200
    original = original_response.json()

    marker = uuid.uuid4().hex[:6]
    updated = dict(original)
    updated["hero_title"] = f"TEST hero title {marker}"
    updated["hero_subtitle"] = f"TEST hero subtitle {marker}"

    try:
        save_response = client.put(f"{BASE_URL}/api/admin/content", json=updated)
        assert save_response.status_code == 200
        assert save_response.json()["message"] == "Content updated"

        get_after = client.get(f"{BASE_URL}/api/content")
        assert get_after.status_code == 200
        current = get_after.json()
        assert current["hero_title"] == updated["hero_title"]
        assert current["hero_subtitle"] == updated["hero_subtitle"]
    finally:
        client.put(f"{BASE_URL}/api/admin/content", json=original)


def test_logout_invalidates_admin_session(admin_client):
    """Logout endpoint clears session so /auth/me becomes unauthorized."""
    client, _ = admin_client
    logout_response = client.post(f"{BASE_URL}/api/auth/logout")
    assert logout_response.status_code == 200
    assert logout_response.json()["message"] == "Logged out"

    me_after_logout = client.get(f"{BASE_URL}/api/auth/me")
    assert me_after_logout.status_code == 401
