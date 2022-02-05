import pathmagic  # noqa: F401
from main import read_root, read_kanji_vlsualize


def test_read_root():
    res = read_root()
    assert res["message"] == "Hello from FastAPI!"
