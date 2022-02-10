# This is the Graph Controller class implementation.


class GraphController:
    def __init__(self):
        self.MainNode
        self.FriendNodes = []
        self.Edges = []

    def set_main_node(self):
        # TODO: Implement logic
        return True

    def get_friend_nodes(self):
        nodes = []
        # TODO: Implement logic
        return nodes

    def construct_nodes_matrix(self):
        matrix = []
        # TODO: Implement logic
        return matrix

    @staticmethod
    def get_graph_matrix(kanji: str):
        # TODO: return acutual value
        try:
            graph_matrix = {"mainNode": "山", "subNodes": ["登", "水", "脈"]}
            return [True, None, graph_matrix]
        except Exception:
            error_info = {"status_code": 400, "detail": "山 is not in data base"}
            return [False, error_info, None]
