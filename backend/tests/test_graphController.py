import pathmagic
from controller.GraphController import GraphController


def test_normal():
    yama = "山"
    result = GraphController.get_graph_matrix(yama)
    print("my graph result is:", result)
    expected_result = [ True, None,
        { "nodes":
          [
            {"id": "山", "isMain": "true"},
            {"id": "陰"},
            {"id": "治"},
            {"id": "開"},
            {"id": "道"},
            {"id": "須"},
            {"id": "弥"},
            {"id": "奥"},
            {"id": "青"},
            {"id": "富"},
            {"id": "士"},
            {"id": "脈"},
            {"id": "火"},
            {"id": "登"},
            {"id": "岩"},
            {"id": "事"}
          ], "links": [
            {"source": "山", "target": "陰"},
            {"source": "治", "target": "山"},
            {"source": "開", "target": "山"},
            {"source": "山", "target": "道"},
            {"source": "須", "target": "弥"},
            {"source": "弥", "target": "山"},
            {"source": "奥", "target": "山"},
            {"source": "青", "target": "山"},
            {"source": "富", "target": "士"},
            {"source": "士", "target": "山"},
            {"source": "山", "target": "脈"},
            {"source": "火", "target": "山"},
            {"source": "登", "target": "山"},
            {"source": "岩", "target": "山"},
            {"source": "山", "target": "火"},
            {"source": "火", "target": "事"}
        ]
      }
    ]
    print("my graph result is:", expected_result)

    assert result == expected_result
