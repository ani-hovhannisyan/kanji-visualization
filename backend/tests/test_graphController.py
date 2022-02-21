import os
import sys
from controller.GraphController import GraphController

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))


def test_normal():
    yama = "山"
    result = GraphController.get_graph_matrix(yama)
    expected_result = [
        True,
        None,
        {
            "nodes": [
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
                {"id": "事"},
            ],
            "links": [
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
                {"source": "火", "target": "事"},
            ],
        },
    ]

    assert result == expected_result


# The okurigana word 川きゅう must not be shown in the nodes list
def test_okurigana():
    yama = "川"
    result = GraphController.get_graph_matrix(yama)
    expected_result = [
        True,
        None,
        {
            "nodes": [
                {"id": "柳"},
                {"id": "山"},
                {"id": "四"},
                {"id": "川", "isMain": "true"},
                {"id": "上"},
                {"id": "堀"},
                {"id": "河"},
                {"id": "下"},
                {"id": "江"},
                {"id": "戸"},
                {"id": "小"},
            ],
            "links": [
                {"source": "川", "target": "柳"},
                {"source": "山", "target": "川"},
                {"source": "四", "target": "川"},
                {"source": "川", "target": "上"},
                {"source": "堀", "target": "川"},
                {"source": "河", "target": "川"},
                {"source": "川", "target": "下"},
                {"source": "江", "target": "戸"},
                {"source": "戸", "target": "川"},
                {"source": "小", "target": "川"},
            ],
        },
    ]

    assert result == expected_result


def test_mainkanji_asword():
    # The main kanji has no word if its only put alone
    yama = "耶"
    result = GraphController.get_graph_matrix(yama)
    expected_result = [
        True,
        None,
        {
            "nodes": [{"id": "嬢"}, {"id": "蘇"}, {"id": "三"}, {"id": "昧"}],
            "links": [
                {"source": "耶", "target": "嬢"},
                {"source": "耶", "target": "蘇"},
                {"source": "三", "target": "昧"},
                {"source": "昧", "target": "耶"},
            ],
        },
    ]

    assert result == expected_result
