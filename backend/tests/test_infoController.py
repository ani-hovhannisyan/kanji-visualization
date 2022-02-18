import pathmagic  # noqa: F401
from controller.InfoController import InfoController


def test_normal():
    result = InfoController.get_kanji_info("山")
    expected_result = [
        True,
        None,
        {
            "info": {
                "id": "山",
                "onyomi": ["サン", "セン"],
                "kunyomi": ["やま"],
                "meaning": ["mountain"],
            }
        },
    ]
    assert result == expected_result


def test_invalid():
    query = "ア"
    result = InfoController.get_kanji_info(query)
    error_info = {"status_code": 400, "detail": f"{query}is not in data base"}
    expected_result = [False, error_info, None]
    assert result == expected_result
