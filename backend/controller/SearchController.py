import re


class SearchController:
    @staticmethod
    def check_input(kanji):

        if kanji == "":
            return SearchController._create_result(
                False, 400, "Please include Kanji in the query parameters"
            )
        elif not SearchController._is_kanji(kanji):
            return SearchController._create_result(
                False, 400, "Only Kanji is permitted"
            )
        elif len(kanji) != 1:
            return SearchController._create_result(
                False, 400, "Only one character is allowed"
            )

        else:
            return SearchController._create_result(True)

    @staticmethod
    def _create_result(is_success: bool, status: int = None, detail: str = None):
        error_info = None if is_success else {"status_code": status, "detail": detail}

        return [is_success, error_info]

    @staticmethod
    def _is_kanji(kanji):
        p = re.compile(
            "[\u2E80-\u2FDF\u3005-\u3007\u3400-\u4DBF"
            "\u4E00-\u9FFF\uF900-\uFAFF\U00020000-\U0002EBEF]+"
        )
        return p.fullmatch(kanji)
