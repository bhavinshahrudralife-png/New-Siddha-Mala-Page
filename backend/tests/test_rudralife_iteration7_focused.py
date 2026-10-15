import os
import uuid

import pytest
import requests
from dotenv import dotenv_values


# Iteration-7 focused backend/API regression: auth cookie, enquiry acceptance, and invalid country validation.
frontend_env = dotenv_values("/app/frontend/.env")
backend_env = dotenv_values("/app/backend/.env")

BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL") or "").rstrip("/")
ADMIN_EMAIL = (os.environ.get("ADMIN_EMAIL") or backend_env.get("ADMIN_EMAIL") or "").strip().strip('"')
ADMIN_PASSWORD = (os.environ.get("ADMIN_PASSWORD") or backend_env.get("ADMIN_PASSWORD") or "").strip().strip('"')

if not BASE_URL:
    pytest.skip("REACT_APP_BACKEND_URL is required", allow_module_level=True)


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    yield session
    session.close()


@pytest.fixture
def admin_client(api_client):
    login = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=30,
    )
    assert login.status_code == 200, f"Admin login failed: {login.status_code} {login.text}"
    return api_client


def test_auth_login_sets_secure_cookie_and_me_works(api_client):
    login = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=30,
    )
    assert login.status_code == 200
    body = login.json()
    assert body["email"] == ADMIN_EMAIL.lower()
    assert body["role"] == "admin"

    set_cookie = login.headers.get("set-cookie", "").lower()
    assert "httponly" in set_cookie
    assert "secure" in set_cookie
    assert "samesite=none" in set_cookie

    me = api_client.get(f"{BASE_URL}/api/auth/me", timeout=30)
    assert me.status_code == 200
    me_body = me.json()
    assert me_body["email"] == ADMIN_EMAIL.lower()


def test_inline_and_popup_enquiries_visible_in_admin_then_cleanup(admin_client):
    suffix = uuid.uuid4().hex[:8]
    created_ids = []
    payloads = [
        {
            "name": f"QA_TEST Iter7 Inline {suffix}",
            "email": f"qa-iter7-inline-{suffix}@example.com",
            "phone": "9876543210",
            "country": "IN",
            "country_code": "+91",
            "city": "Mumbai",
            "profession": "QA",
            "message": "iteration7 inline enquiry",
            "source": "inline",
            "interest": "General consultation",
            "submission_id": f"iter7-inline-{uuid.uuid4().hex[:16]}",
        },
        {
            "name": f"QA_TEST Iter7 Popup {suffix}",
            "email": f"qa-iter7-popup-{suffix}@example.com",
            "phone": "9876543210",
            "country": "IN",
            "country_code": "+91",
            "city": "Mumbai",
            "profession": "QA",
            "message": "iteration7 popup enquiry",
            "source": "popup",
            "interest": "General consultation",
            "submission_id": f"iter7-popup-{uuid.uuid4().hex[:16]}",
        },
    ]

    try:
        for payload in payloads:
            create = requests.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
            assert create.status_code == 200, create.text
            created = create.json()
            created_ids.append(created["id"])
            assert created["email"] == payload["email"]
            assert created["source"] == payload["source"]

        leads = admin_client.get(f"{BASE_URL}/api/admin/leads", timeout=30)
        assert leads.status_code == 200
        lead_items = leads.json()
        lead_ids = {item["id"] for item in lead_items}
        assert all(lead_id in lead_ids for lead_id in created_ids)
    finally:
        for lead_id in created_ids:
            delete = admin_client.delete(f"{BASE_URL}/api/admin/leads/{lead_id}", timeout=30)
            assert delete.status_code == 200


def test_enquiry_rejects_invalid_country_code_pair():
    payload = {
        "name": "QA_TEST Iter7 Invalid Country",
        "email": f"qa-iter7-invalid-{uuid.uuid4().hex[:8]}@example.com",
        "phone": "9876543210",
        "country": "ZZ",
        "country_code": "+91",
        "city": "Mumbai",
        "profession": "QA",
        "message": "invalid country test",
        "source": "inline",
        "interest": "General consultation",
        "submission_id": f"iter7-invalid-{uuid.uuid4().hex[:16]}",
    }
    response = requests.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert response.status_code == 422
    assert "valid country" in response.text.lower() or "string should match pattern" in response.text.lower()
