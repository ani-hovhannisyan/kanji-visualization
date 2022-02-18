import pathmagic  # noqa: F401
from fastapi.testclient import TestClient
from main import app, read_root

client = TestClient(app)


def test_read_root():
    res = read_root()
    assert res["message"] == "Hello from FastAPI!"


def test_read_kanji_visualize():
    response = client.get("/kanji-visualize?kanji=山")
    expected_response = {
        "nodes": [
            {"id": "山", "isMain": "true"},
            {"id": "陰"},
            {"id": "治"},
            {"id": "開"},
            {"id": "道"},
            {"id": "須"},
            {"id": "弥"},
            {"id": "奥"},
            {"id": "青"},
            {"id": "富"},
            {"id": "士"},
            {"id": "脈"},
            {"id": "火"},
            {"id": "登"},
            {"id": "岩"},
            {"id": "事"},
        ],
        "links": [
            {"source": "山", "target": "陰"},
            {"source": "治", "target": "山"},
            {"source": "開", "target": "山"},
            {"source": "山", "target": "道"},
            {"source": "須", "target": "弥"},
            {"source": "弥", "target": "山"},
            {"source": "奥", "target": "山"},
            {"source": "青", "target": "山"},
            {"source": "富", "target": "士"},
            {"source": "士", "target": "山"},
            {"source": "山", "target": "脈"},
            {"source": "火", "target": "山"},
            {"source": "登", "target": "山"},
            {"source": "岩", "target": "山"},
            {"source": "山", "target": "火"},
            {"source": "火", "target": "事"},
        ],
        "info": {
            "id": "山",
            "onyomi": ["サン", "セン"],
            "kunyomi": ["やま"],
            "meaning": ["mountain"],
        },
    }
    assert response.status_code == 200
    assert response.json() == expected_response
