from controller.SearchController import SearchController


def test_normal():
    is_success, error_info = SearchController.check_input("山")
    assert is_success


def test_invalid1():
    is_success, error_info = SearchController.check_input("a")
    assert not is_success
    assert error_info == {"status_code": 400, "detail": "Only Kanji is permitted"}


def test_invalid2():
    is_success, error_info = SearchController.check_input("")
    assert not is_success
    assert error_info == {
        "status_code": 400,
        "detail": "Please include Kanji in the query parameters",
    }


def test_invalid3():
    is_success, error_info = SearchController.check_input("登山")
    assert not is_success
    assert error_info == {"status_code": 400, "detail": "Only one character is allowed"}
