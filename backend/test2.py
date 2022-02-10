# This is the Graph Controller class implementation.


class GraphController:
    def __init__(self):
        self.MainNode =[]
        self.FriendNodes = []
        self.Edges = []

    def set_main_node(self):
        # TODO: Implement logic
        #print("moving")
        return True

    def get_friend_nodes(self):
        nodes = ["足"]
        # TODO: Implement logic
        return nodes

    def construct_nodes_matrix(self):
        matrix = []
        # TODO: Implement logic
        return matrix

#以下加えたコード
from jamdict import Jamdict

jam = Jamdict()

#print("query: ", end="")
f = GraphController()

query = f.get_friend_nodes

result = jam.lookup(query)

index = -1

for i, c in enumerate(result.chars):
  if str(c) == query:
    index = i

if index == -1:
  print(f"No result found for query: {query}")
  exit()


print("\n===== Meanings =====")

# https://jamdict.readthedocs.io/en/latest/api.html#jamdict.kanjidic2.Character.meanings
for meaning in result.chars[index].meanings(english_only=True):  # return only English meaning
    print(meaning)


print("\n===== Onyomi/Kunyomi =====")

for entry in result.entries:
  for kana in entry.to_dict()["kana"]:
    yomi = kana["text"]
    print(yomi)

