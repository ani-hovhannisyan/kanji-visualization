from jamdict import Jamdict

jam = Jamdict(reuse_ctx=False)


class InfoController:
    @staticmethod
    def get_kanji_info(kanji: str):
        query = kanji
        result = jam.lookup(query)
        try:
            readings = result.chars[0].to_dict()["rm"][0]["readings"]
            onyomi = [
                reading["value"]
                for reading in filter(lambda x: x["type"] == "ja_on", readings)
            ]
            print("Onyomi is:", onyomi)
            kunyomi = [
                reading["value"]
                for reading in filter(lambda x: x["type"] == "ja_kun", readings)
            ]
            print("Kunyomi is:", kunyomi)
            meaning = result.chars[0].meanings(english_only=True)
            kanji_info = {
                "info": {
                    "id": kanji,
                    "onyomi": onyomi,
                    "kunyomi": kunyomi,
                    "meaning": meaning,
                }
            }
            return [True, None, kanji_info]
        except Exception:
            error_info = {"status_code": 400, "detail": kanji + "is not in data base"}
            return [False, error_info, None]
