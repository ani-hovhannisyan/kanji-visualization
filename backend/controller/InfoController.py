from jamdict import Jamdict
jam = Jamdict()
class InfoController:
    @staticmethod
    def get_kanji_info(kanji: str):
        # TODO: return acutual value
        query = kanji
        result = jam.lookup(query)
        index = -1
        for i, c in enumerate(result.chars):
          if str(c) == query:
            index = i
        if i > -1:
            kanji_info = {}
            try:
                kanji_info["kunyomi"] = result.entries[0].to_dict()["kana"][0]["text"]
            except Exception as e:
                kanji_info["kunyomi"] = ""
            try:
                kanji_info["onyomi"] = result.entries[1].to_dict()["kana"][0]["text"]
            except Exception as e:
                kanji_info["onyomi"] = ""
            kanji_info["meaning"] = result.chars[index].meanings(english_only=True)[0]
            return [True, None, kanji_info]
        else:
            error_info = {"status_code":400, "detail":"kanji is not in data base"}
            return [False, error_info, None]
