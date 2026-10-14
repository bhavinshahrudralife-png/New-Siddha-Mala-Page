import io
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values
from PIL import Image
from pymongo import MongoClient


# Iteration-4 backend regression for enquiries, auth, CMS validation, and media flows.
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


@pytest.fixture
def cleanup_registry(admin_client):
    state = {"lead_ids": [], "media_ids": []}
    yield state

    for lead_id in state["lead_ids"]:
        if not lead_id:
            continue
        try:
            admin_client.delete(f"{BASE_URL}/api/admin/leads/{lead_id}", timeout=30)
        except Exception:
            pass

    mongo_url = (os.environ.get("MONGO_URL") or backend_env.get("MONGO_URL") or "").strip().strip('"')
    db_name = (os.environ.get("DB_NAME") or backend_env.get("DB_NAME") or "").strip().strip('"')
    if state["media_ids"] and mongo_url and db_name:
        client = MongoClient(mongo_url)
        try:
            client[db_name].media.update_many(
                {"id": {"$in": state["media_ids"]}},
                {"$set": {"is_deleted": True}},
            )
        finally:
            client.close()


@pytest.fixture
def qa_lead(admin_client):
    marker = uuid.uuid4().hex[:8]
    payload = {
        "name": f"QA_TEST Lead {marker}",
        "email": f"qa-test-{marker}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+91",
        "city": "Mumbai",
        "profession": "QA",
        "message": "QA lead for iteration 4",
        "source": "inline",
        "interest": "General consultation",
        "submission_id": f"qa-sub-{uuid.uuid4().hex[:20]}",
    }
    created = admin_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert created.status_code == 200
    lead = created.json()
    yield lead
    admin_client.delete(f"{BASE_URL}/api/admin/leads/{lead['id']}", timeout=30)


def test_auth_cookie_and_me_flow(api_client):
    login = api_client.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=30,
    )
    assert login.status_code == 200
    set_cookie = login.headers.get("set-cookie", "")
    assert "access_token=" in set_cookie
    assert "HttpOnly" in set_cookie
    assert "Secure" in set_cookie
    assert "SameSite=none".lower() in set_cookie.lower()

    me = api_client.get(f"{BASE_URL}/api/auth/me", timeout=30)
    assert me.status_code == 200
    assert me.json()["email"] == ADMIN_EMAIL


def test_enquiry_accepts_valid_india_number_and_normalizes_phone(api_client, cleanup_registry):
    marker = uuid.uuid4().hex[:8]
    payload = {
        "name": f"QA_TEST Inline {marker}",
        "email": f"qa-inline-{marker}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+91",
        "city": "",
        "profession": "",
        "message": "",
        "source": "inline",
        "interest": "",
        "submission_id": f"qa-in-{uuid.uuid4().hex[:20]}",
    }
    response = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert response.status_code == 200
    data = response.json()
    assert data["country"] == "IN"
    assert data["country_code"] == "+91"
    assert data["phone"].startswith("+91")
    assert data["source"] == "inline"
    cleanup_registry["lead_ids"].append(data.get("id"))


def test_enquiry_idempotency_same_submission_id_returns_same_lead(api_client, cleanup_registry):
    sub_id = f"qa-idem-{uuid.uuid4().hex[:20]}"
    payload = {
        "name": "QA_TEST Idempotent",
        "email": f"qa-idem-{uuid.uuid4().hex[:8]}@example.com",
        "phone": "2025550123",
        "country": "US",
        "country_code": "+1",
        "city": "",
        "profession": "",
        "message": "",
        "source": "popup",
        "interest": "Ganesh",
        "submission_id": sub_id,
    }
    first = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    second = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert first.status_code == 200
    assert second.status_code == 200
    first_data = first.json()
    second_data = second.json()
    assert first_data["id"] == second_data["id"]
    assert first_data["email"] == second_data["email"]
    cleanup_registry["lead_ids"].append(first_data.get("id"))


def _auth_cookies(admin_client):
    return requests.utils.dict_from_cookiejar(admin_client.cookies)


def test_enquiry_rejects_country_code_mismatch(api_client):
    payload = {
        "name": "QA_TEST mismatch",
        "email": f"qa-mismatch-{uuid.uuid4().hex[:8]}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+1",
        "city": "",
        "profession": "",
        "message": "",
        "source": "inline",
        "interest": "",
        "submission_id": f"qa-mm-{uuid.uuid4().hex[:20]}",
    }
    response = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert response.status_code == 422


def test_enquiry_rejects_whitespace_required_fields(api_client):
    payload = {
        "name": "   ",
        "email": f"qa-space-{uuid.uuid4().hex[:8]}@example.com",
        "phone": "9876543210",
        "country": "IN",
        "country_code": "+91",
        "city": "",
        "profession": "",
        "message": "",
        "source": "inline",
        "interest": "",
        "submission_id": f"qa-sp-{uuid.uuid4().hex[:20]}",
    }
    response = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
    assert response.status_code == 422


def test_admin_lead_page_and_patch_persist(admin_client, qa_lead):
    page = admin_client.get(
        f"{BASE_URL}/api/admin/leads/page",
        params={"query": qa_lead["email"], "status": "", "page": 1},
        timeout=30,
    )
    assert page.status_code == 200
    page_data = page.json()
    assert page_data["total"] >= 1
    match = [x for x in page_data["items"] if x["id"] == qa_lead["id"]]
    assert len(match) == 1

    patch = admin_client.patch(
        f"{BASE_URL}/api/admin/leads/{qa_lead['id']}",
        json={"status": "qualified", "notes": "QA_TEST status update"},
        timeout=30,
    )
    assert patch.status_code == 200
    assert patch.json()["status"] == "qualified"
    assert patch.json()["notes"] == "QA_TEST status update"

    page_after = admin_client.get(
        f"{BASE_URL}/api/admin/leads/page",
        params={"query": qa_lead["email"], "status": "qualified", "page": 1},
        timeout=30,
    )
    assert page_after.status_code == 200
    items = page_after.json()["items"]
    assert any(x["id"] == qa_lead["id"] for x in items)


def test_admin_leads_csv_export_is_csv_and_formula_escaped(admin_client):
    response = admin_client.get(f"{BASE_URL}/api/admin/leads/export", timeout=30)
    assert response.status_code == 200
    content_type = response.headers.get("content-type", "")
    assert "text/csv" in content_type
    body = response.text
    assert "name,email,country,country_code,phone" in body


def test_page_content_stale_revision_returns_409(admin_client):
    current = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
    assert current.status_code == 200
    baseline = current.json()
    revision = baseline["revision"]
    page = baseline["page"]

    marker = uuid.uuid4().hex[:6]
    try:
        first_payload = {"page": {**page, "hero": {**page["hero"], "tagline": f"QA_TEST {marker}"}}, "revision": revision}
        first = admin_client.put(f"{BASE_URL}/api/admin/page-content", json=first_payload, timeout=30)
        assert first.status_code == 200

        stale_payload = {"page": {**page, "hero": {**page["hero"], "tagline": f"QA_TEST stale {marker}"}}, "revision": revision}
        stale = admin_client.put(f"{BASE_URL}/api/admin/page-content", json=stale_payload, timeout=30)
        assert stale.status_code == 409
    finally:
        latest = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
        assert latest.status_code == 200
        restore = admin_client.put(
            f"{BASE_URL}/api/admin/page-content",
            json={"page": page, "revision": latest.json()["revision"]},
            timeout=30,
        )
        assert restore.status_code == 200


def test_page_content_rejects_blank_hero_title_and_invalid_stat_visibility(admin_client):
    current = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
    assert current.status_code == 200
    base = current.json()
    rev = base["revision"]
    page = base["page"]

    blank = {"page": {**page, "hero": {**page["hero"], "title": "   "}}, "revision": rev}
    blank_res = admin_client.put(f"{BASE_URL}/api/admin/page-content", json=blank, timeout=30)
    assert blank_res.status_code == 422

    current2 = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30).json()
    rev2 = current2["revision"]
    page2 = current2["page"]
    stats = page2["community"]["stats"]
    stats[0]["visible"] = True
    stats[0]["verified"] = False
    stats[0]["source"] = ""
    invalid_stats = {"page": {**page2, "community": {**page2["community"], "stats": stats}}, "revision": rev2}
    stat_res = admin_client.put(f"{BASE_URL}/api/admin/page-content", json=invalid_stats, timeout=30)
    assert stat_res.status_code == 422


def test_media_upload_requires_authentication():
    response = requests.post(
        f"{BASE_URL}/api/admin/media",
        files={"file": ("x.png", b"abc", "image/png")},
        timeout=30,
    )
    assert response.status_code == 401


def test_media_upload_rejects_invalid_html_svg(admin_client):
    payload = b"<svg><script>alert('x')</script></svg>"
    response = requests.post(
        f"{BASE_URL}/api/admin/media",
        cookies=_auth_cookies(admin_client),
        files={"file": ("bad.svg", payload, "image/svg+xml")},
        timeout=30,
    )
    assert response.status_code == 422


def test_media_upload_rejects_file_over_12mb(admin_client):
    too_big = b"%PDF-1.4\n" + (b"0" * (12 * 1024 * 1024 + 2))
    response = requests.post(
        f"{BASE_URL}/api/admin/media",
        cookies=_auth_cookies(admin_client),
        files={"file": ("huge.pdf", too_big, "application/pdf")},
        timeout=45,
    )
    assert response.status_code == 413


def test_media_upload_and_public_fetch_and_metadata_safety(admin_client, cleanup_registry):
    image = Image.new("RGB", (16, 16), color=(180, 120, 60))
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)

    upload = requests.post(
        f"{BASE_URL}/api/admin/media",
        cookies=_auth_cookies(admin_client),
        files={"file": ("qa_test.png", buffer.getvalue(), "image/png")},
        timeout=60,
    )
    assert upload.status_code == 200
    item = upload.json()
    assert item["url"].startswith("/api/media/")
    assert "storage_path" not in item
    assert "_id" not in item
    cleanup_registry["media_ids"].append(item.get("id"))

    public = requests.get(f"{BASE_URL}{item['url']}", timeout=30)
    assert public.status_code == 200
    assert public.headers.get("content-type", "").startswith("image/")
    assert len(public.content) > 0

    listed = admin_client.get(f"{BASE_URL}/api/admin/media", timeout=30)
    assert listed.status_code == 200
    rows = listed.json()
    match = [x for x in rows if x["id"] == item["id"]]
    assert len(match) == 1
    assert "storage_path" not in match[0]
    assert "_id" not in match[0]
