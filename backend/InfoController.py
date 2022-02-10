import pprint
from jamdict import Jamdict
jam = Jamdict()
class InfoController:
    @staticmethod
    def get_kanji_info(kanji: str):
        # TODO: return acutual value
        query = kanji
        result = jam.lookup(query)
        readings = result.chars[0].to_dict()["rm"][0]["readings"]
        try:
            onyomi = [ reading["value"] for reading in  filter(lambda x: x["type"] == "ja_on", readings) ]
            print(onyomi)
            kunyomi = [ reading["value"] for reading in  filter(lambda x: x["type"] == "ja_kun", readings) ]
            print(kunyomi)
            meaning = result.chars[0].meanings(english_only=True)
            kanji_info = {"onyomi":onyomi,"kunyomi":kunyomi,"meaning":meaning}
            return [True, None, kanji_info]
        except Exception as e:
            error_info = {"status_code":400, "detail":"kanji is not in data base"}
            return [False, error_info, None]

print(InfoController.get_kanji_info("星"))