class InfoController:
    @staticmethod
    def get_kanji_info(kanji: str):
        # TODO: return acutual value
        try:
            kanji_info = {"onyomi": "さん", "detail": "やま"}
            return [True, None, kanji_info]
        except Exception:
            error_info = {"status_code": 400, "detail": "山 is not in data base"}
            return [False, error_info, None]
