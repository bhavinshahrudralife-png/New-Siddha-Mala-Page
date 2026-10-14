import copy
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient


# Iteration-5 CMS persistence regression for representative content model fields.
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


def save_page(admin_client, page, revision):
    response = admin_client.put(
        f"{BASE_URL}/api/admin/page-content",
        json={"page": page, "revision": revision},
        timeout=45,
    )
    assert response.status_code == 200, response.text
    body = response.json()
    assert isinstance(body.get("revision"), int)
    return body


def auth_cookies(session):
    return requests.utils.dict_from_cookiejar(session.cookies)


def test_cms_api_persistence_for_iteration5_scope(admin_client):
    marker = uuid.uuid4().hex[:6]
    uploaded_media_id = None
    original = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
    assert original.status_code == 200
    baseline = original.json()
    base_page = baseline["page"]
    revision = baseline["revision"]

    # Keep canonical original values for strict end-state checks.
    original_hero_tagline = base_page["hero"]["tagline"]
    original_hero_image = base_page["hero"]["image"]

    try:
        # HERO TEXT
        draft = copy.deepcopy(base_page)
        draft["hero"]["tagline"] = f"QA Iter5 Hero Tagline {marker}"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["hero"]["tagline"] == f"QA Iter5 Hero Tagline {marker}"

        # HERO IMAGE via upload
        with open("/app/tests/qa_upload.png", "rb") as fh:
            upload = requests.post(
                f"{BASE_URL}/api/admin/media",
                cookies=auth_cookies(admin_client),
                files={"file": (f"qa_upload_{marker}.png", fh.read(), "image/png")},
                timeout=60,
            )
        assert upload.status_code == 200, upload.text
        media = upload.json()
        uploaded_media_id = media["id"]
        assert media["url"].startswith("/api/media/")

        draft = copy.deepcopy(saved["page"])
        draft["hero"]["image"] = media["url"]
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["hero"]["image"] == media["url"]

        # EXPERT bio + photo
        draft = copy.deepcopy(saved["page"])
        draft["experts"]["items"][0]["desc"] = f"QA Iter5 Expert Desc {marker}"
        draft["experts"]["items"][0]["img"] = "/assets/rudralife/bead-1.png"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["experts"]["items"][0]["desc"] == f"QA Iter5 Expert Desc {marker}"
        assert saved["page"]["experts"]["items"][0]["img"] == "/assets/rudralife/bead-1.png"

        # FAQ add/edit/delete
        draft = copy.deepcopy(saved["page"])
        draft["faq"]["items"].append(
            {"id": f"qa-{marker}", "q": f"QA add {marker}?", "a": f"QA answer {marker}"}
        )
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert any(item["id"] == f"qa-{marker}" for item in saved["page"]["faq"]["items"])

        draft = copy.deepcopy(saved["page"])
        draft["faq"]["items"][-1]["q"] = f"QA edit {marker}?"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["faq"]["items"][-1]["q"] == f"QA edit {marker}?"

        draft = copy.deepcopy(saved["page"])
        draft["faq"]["items"] = [item for item in draft["faq"]["items"] if item["id"] != f"qa-{marker}"]
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert not any(item["id"] == f"qa-{marker}" for item in saved["page"]["faq"]["items"])

        # FOOTER contact
        draft = copy.deepcopy(saved["page"])
        draft["footer"]["phone"] = "+91 70000 00000"
        draft["footer"]["email"] = f"qa-{marker}@example.com"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["footer"]["phone"] == "+91 70000 00000"
        assert saved["page"]["footer"]["email"] == f"qa-{marker}@example.com"

        # FORM label + city required toggle
        draft = copy.deepcopy(saved["page"])
        city_field = next(f for f in draft["form"]["fields"] if f["key"] == "city")
        city_field["label"] = f"City / State {marker}"
        city_field["required"] = True
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        city_field_saved = next(f for f in saved["page"]["form"]["fields"] if f["key"] == "city")
        assert city_field_saved["label"] == f"City / State {marker}"
        assert city_field_saved["required"] is True

        # GALLERY caption
        draft = copy.deepcopy(saved["page"])
        draft["gallery"]["items"][0]["caption"] = f"QA Gallery Caption {marker}"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["gallery"]["items"][0]["caption"] == f"QA Gallery Caption {marker}"

        # SECTION visibility + order
        draft = copy.deepcopy(saved["page"])
        draft["consultation"]["visible"] = False
        order = draft["order"]
        order[0], order[1] = order[1], order[0]
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["consultation"]["visible"] is False
        assert saved["page"]["order"][0] != base_page["order"][0]

        # MOTION length + SEO title
        draft = copy.deepcopy(saved["page"])
        draft["motion"]["journey_length"] = 4.4
        draft["seo"]["title"] = f"QA SEO {marker}"
        saved = save_page(admin_client, draft, revision)
        revision = saved["revision"]
        assert saved["page"]["motion"]["journey_length"] == 4.4
        assert saved["page"]["seo"]["title"] == f"QA SEO {marker}"

    finally:
        latest = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
        assert latest.status_code == 200
        latest_revision = latest.json()["revision"]
        restore = admin_client.put(
            f"{BASE_URL}/api/admin/page-content",
            json={"page": base_page, "revision": latest_revision},
            timeout=45,
        )
        assert restore.status_code == 200, restore.text

        mongo_url = (os.environ.get("MONGO_URL") or backend_env.get("MONGO_URL") or "").strip().strip('"')
        db_name = (os.environ.get("DB_NAME") or backend_env.get("DB_NAME") or "").strip().strip('"')
        if uploaded_media_id and mongo_url and db_name:
            client = MongoClient(mongo_url)
            try:
                client[db_name].media.update_one(
                    {"id": uploaded_media_id},
                    {"$set": {"is_deleted": True}},
                )
            finally:
                client.close()

    end_state = admin_client.get(f"{BASE_URL}/api/page-content", timeout=30)
    assert end_state.status_code == 200
    end_page = end_state.json()["page"]
    assert end_page["hero"]["tagline"] == "One mala. A complete spiritual companion."
    assert end_page["hero"]["tagline"] == original_hero_tagline
    assert end_page["hero"]["image"] == "/assets/rudralife/gold-mala-premium.png"
    assert end_page["hero"]["image"] == original_hero_image
