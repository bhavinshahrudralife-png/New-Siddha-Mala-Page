import copy
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values


# Iteration-6 regression: peach page-content validations, auth cookie, and lead CRUD sanity.
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
    response = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=30,
    )
    assert response.status_code == 200, f"Admin login failed: {response.status_code} {response.text}"
    return api_client


def read_page(client):
    response = client.get(f"{BASE_URL}/api/page-content", timeout=30)
    assert response.status_code == 200
    body = response.json()
    assert isinstance(body.get("revision"), int)
    assert isinstance(body.get("page"), dict)
    return body


def save_page(client, page, revision):
    response = client.put(
        f"{BASE_URL}/api/admin/page-content",
        json={"page": page, "revision": revision},
        timeout=45,
    )
    return response


def test_page_defaults_reflect_peach_release_and_15_body_sections(api_client):
    body = read_page(api_client)
    page = body["page"]

    assert page["appearance"]["background"] == "#fae7dc"
    assert page["appearance"]["heading"] == "#642c2b"
    assert page["hero"]["image"] == "/assets/rudralife/siddha-user.png"
    assert page["signature"]["image"] == "/assets/rudralife/siddha-user.png"
    assert page["beads"]["image"] == "/assets/rudralife/siddha-user.png"

    expected_order = {
        "intro",
        "beadJourney",
        "signature",
        "spiritual",
        "story",
        "gallery",
        "beads",
        "education",
        "benefits",
        "patrons",
        "trust",
        "experts",
        "community",
        "faq",
        "consultation",
    }
    assert len(page["order"]) == 15
    assert set(page["order"]) == expected_order


def test_auth_login_cookie_and_me_endpoint(admin_client):
    me = admin_client.get(f"{BASE_URL}/api/auth/me", timeout=30)
    assert me.status_code == 200
    data = me.json()
    assert data["email"] == ADMIN_EMAIL.lower()
    assert data["role"] == "admin"


def test_cms_accepts_valid_colour_and_persists_then_restores(admin_client):
    baseline = read_page(admin_client)
    revision = baseline["revision"]
    original_page = baseline["page"]
    draft = copy.deepcopy(original_page)
    marker_colour = "#a25737"
    draft["appearance"]["accent"] = marker_colour

    try:
        save = save_page(admin_client, draft, revision)
        assert save.status_code == 200, save.text
        saved = save.json()
        assert saved["page"]["appearance"]["accent"] == marker_colour
    finally:
        latest = read_page(admin_client)
        restore = save_page(admin_client, original_page, latest["revision"])
        assert restore.status_code == 200, restore.text


def test_cms_rejects_invalid_hex_colour(admin_client):
    baseline = read_page(admin_client)
    page = baseline["page"]
    revision = baseline["revision"]
    draft = copy.deepcopy(page)
    draft["appearance"]["background"] = "#fff"

    response = save_page(admin_client, draft, revision)
    assert response.status_code == 422
    assert "colour" in response.text.lower() or "color" in response.text.lower()


def test_cms_rejects_bad_story_intervals_outside_3_to_30(admin_client):
    baseline = read_page(admin_client)
    page = baseline["page"]
    revision = baseline["revision"]

    draft_low = copy.deepcopy(page)
    draft_low["beadJourney"]["interval_seconds"] = 2
    low_response = save_page(admin_client, draft_low, revision)
    assert low_response.status_code == 422

    latest = read_page(admin_client)
    draft_high = copy.deepcopy(latest["page"])
    draft_high["patrons"]["interval_seconds"] = 31
    high_response = save_page(admin_client, draft_high, latest["revision"])
    assert high_response.status_code == 422


def test_cms_rejects_out_of_range_marker_coordinates(admin_client):
    baseline = read_page(admin_client)
    page = baseline["page"]
    revision = baseline["revision"]
    draft = copy.deepcopy(page)

    draft["beads"]["items"][0]["locations"] = [
        {
            "id": f"qa-{uuid.uuid4().hex[:6]}",
            "x": 130,
            "y": 40,
            "verified": False,
            "image": draft["beads"]["image"],
            "note": "",
        }
    ]
    response = save_page(admin_client, draft, revision)
    assert response.status_code == 422
    assert "coordinates" in response.text.lower()


def test_cms_rejects_verified_marker_without_note_or_current_image(admin_client):
    baseline = read_page(admin_client)
    page = baseline["page"]
    revision = baseline["revision"]

    draft = copy.deepcopy(page)
    draft["beads"]["items"][0]["locations"] = [
        {
            "id": f"qa-{uuid.uuid4().hex[:6]}",
            "x": 50,
            "y": 50,
            "verified": True,
            "image": "/assets/rudralife/not-current-image.png",
            "note": "",
        }
    ]
    response = save_page(admin_client, draft, revision)
    assert response.status_code == 422
    assert "confirmed markers" in response.text.lower() or "verification" in response.text.lower()


def test_lead_create_patch_delete_roundtrip(admin_client):
    marker = uuid.uuid4().hex[:8]
    payload = {
        "name": f"QA_TEST Iter6 {marker}",
        "email": f"qa-iter6-{marker}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+91",
        "city": "Mumbai",
        "profession": "QA",
        "message": "iteration6 lead",
        "source": "inline",
        "interest": "General consultation",
        "submission_id": f"iter6-{uuid.uuid4().hex[:18]}",
    }

    create = requests.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert create.status_code == 200
    created = create.json()
    assert created["email"] == payload["email"]

    try:
        patch = admin_client.patch(
            f"{BASE_URL}/api/admin/leads/{created['id']}",
            json={"status": "contacted", "notes": "QA_TEST iteration6"},
            timeout=30,
        )
        assert patch.status_code == 200
        assert patch.json()["status"] == "contacted"
    finally:
        delete = admin_client.delete(f"{BASE_URL}/api/admin/leads/{created['id']}", timeout=30)
        assert delete.status_code == 200
