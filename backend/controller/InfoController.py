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
          print(i,c)
          if str(c) == query:
            index = i
        if i > -1:
            yomi = []
            for entry in result.entries:
              for kana in entry.to_dict()["kana"]:
                yomi.append(kana["text"])
            meaning = []
            for mean in result.chars[index].meanings(english_only=True):  # return only English meaning
                meaning.append(mean)
            kanji_info = ["yomi",yomi,"meaning",meaning]
            #kanji_info = {"onyomi": "さん", "detail": "やま"}
            return [True, None, kanji_info]
        else:
            error_info = ["status_code", 400, "detail","kanji is not in data base"]
            return [False, error_info, None]

＃print(InfoController.get_kanji_info("人"))
