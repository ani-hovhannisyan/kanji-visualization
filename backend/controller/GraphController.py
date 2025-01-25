# This is the Graph Controller class implementation.
# TODO: Remove the json if
import os
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
        words_list = list(dict.fromkeys(words))
        djson = {"nodes": [], "links": [], "words": words_list}
        if len(words) > 1:  # No other words or one specified main kanji is
            for word in words:
                if len(word) > 1:
                    if SearchController._is_kanji(word):  # Skip okurigana
                        djson["nodes"] = djson["nodes"] + GraphController.create_nodes(
                            kanji, word, djson["nodes"])
                        djson["links"] = djson["links"] + GraphController.create_links(
                            kanji, word)
            djson["nodes"].append({"id": kanji, "isMain": "true"})
        else:
            print("Can't find any word from the DB for specified kanji.")
        return djson

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
                        # TODO: Keep occurences of same word

        return GraphController.construct_nodes_json(kanji, words)

    # TODO: Adding more static methods replace if necessary in #58
    @staticmethod
    def load_local_db(kanji):
        try:
            data = {}
            if not os.path.exists(config.KANJI_DATA_FILE):
                print("Can not read config file:", config.KANJI_DATA_FILE)
                return data
            f = open(config.KANJI_DATA_FILE)
            localDB = json.loads(f.read())
            return [True, localDB]
        except ValueError as e:
            return [False, error_info]

    @staticmethod
    def get_graph_matrix(kanji, db):
        graph_matrix = {}
        for entity in db:
            if kanji == entity:
                graph_matrix = GraphController.get_words_data(kanji, db[entity])
        return [True, None, graph_matrix]
