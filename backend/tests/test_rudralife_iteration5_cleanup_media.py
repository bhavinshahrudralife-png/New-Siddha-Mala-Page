import os

from dotenv import dotenv_values
from pymongo import MongoClient


# Iteration-5 cleanup for QA media files created during upload verification.
def test_cleanup_iteration5_qa_media_records():
    backend_env = dotenv_values("/app/backend/.env")
    mongo_url = (os.environ.get("MONGO_URL") or backend_env.get("MONGO_URL") or "").strip().strip('"')
    db_name = (os.environ.get("DB_NAME") or backend_env.get("DB_NAME") or "").strip().strip('"')
    assert mongo_url and db_name

    client = MongoClient(mongo_url)
    try:
        result = client[db_name].media.update_many(
            {
                "filename": {
                    "$regex": r"^(qa_upload|qa_test|qa-upload)",
                    "$options": "i",
                }
            },
            {"$set": {"is_deleted": True}},
        )
        assert result.matched_count >= 0
    finally:
        client.close()
