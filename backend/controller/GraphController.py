# This is the Graph Controller class implementation.
# TODO: Remove the json if
import json
import config
from controller.SearchController import SearchController

# Note: Kanji words will be drawn by specific format in UI, the template is:
#  { "nodes":[{"id":"","isMain":1},{...}]],
#    "links":[{"source":"","target":""},{...}] }
# Added string "true" not boolean true because python uses uppercase True


class GraphController:

    # TODO: Find better algorithm for source and target moji
    @staticmethod
    def create_nodes(kanji, word, nodes):
        newNodes = []
        for moji in word:
            mojiJson = {"id": moji}
            if moji != kanji and not nodes.count(mojiJson):
                newNodes.append(mojiJson)
        return newNodes

    def create_links(kanji, word):
        links = []
        src = word[0]
        for i in range(1, len(word)):
            trg = word[i]
            links.append({"source": src, "target": trg})
            src = trg
        return links

    @staticmethod
    def construct_nodes_json(kanji, words):
        json = {"nodes": [], "links": []}
        if len(words) > 1:  # No other words or only one specified main kanji is
            for word in words:
                if len(word) > 1:
                    if SearchController._is_kanji(word):  # Okurigana word is skipped
                        json["nodes"] = json["nodes"] + GraphController.create_nodes(
                            kanji, word, json["nodes"]
                        )
                        json["links"] = json["links"] + GraphController.create_links(
                            kanji, word
                        )
                else:
                    # This should happen once when the main kanji is also word
                    json["nodes"].append({"id": kanji, "isMain": "true"})
        else:
            print("Can't find any word from the DB for specified kanji.")
        return json

    @staticmethod
    # TODO: It might happen to have same kanji with different reading, current
    # code will replace the old reading with new, have to change that logic
    # when implementing hover reading functionality (optional).
    # Handle no data else case and nodes json creation formats.
    def get_words_data(kanji, data):
        words = []  # Structure is: {"kanji": "reading"} -> {"山": "サン"}
        if "jishoData" in data:
            for wordo in data["jishoData"]["onyomiExamples"]:
                if len(wordo["example"]) and not words.count(wordo["example"]):
                    words.append(wordo["example"])

            for wordk in data["jishoData"]["kunyomiExamples"]:
                if len(wordk["example"]) and not words.count(wordk["example"]):
                    words.append(wordk["example"])

            if "kanjialiveData" in data and "examples" in data["kanjialiveData"]:
                for worda in data["kanjialiveData"]["examples"]:
                    if len(worda["japanese"]):
                        word = worda["japanese"].split("（")[0]
                        if not words.count(word):
                            words.append(word)

        return GraphController.construct_nodes_json(kanji, words)

    # TODO: Adding more static methods replace if necessary in #58
    @staticmethod
    def load_local_db(kanji):
        # TODO: Put try catch for unexpected DB file and json format
        f = open(config.KANJI_DATA_FILE)
        localDB = json.loads(f.read())
        data = {}
        for entity in localDB:
            if kanji == entity:
                data = GraphController.get_words_data(kanji, localDB[entity])
                break
        return data

    # TODO: As this method will open the data file each time make it one time
    @staticmethod
    def get_graph_matrix(kanji: str):
        try:
            graph_matrix = GraphController.load_local_db(kanji)
            return [True, None, graph_matrix]
        except ValueError as e:
            error_info = {"status_code": 400, "detail": e}
            return [False, error_info, None]
