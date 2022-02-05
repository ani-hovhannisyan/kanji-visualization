import pathmagic  # noqa: F401
from main import read_root


def test_read_root():
    res = read_root()
    assert res["message"] == "Hello from FastAPI!"
