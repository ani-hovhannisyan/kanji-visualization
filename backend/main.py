from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.SearchController import SearchController
from controller.GraphController import GraphController
from controller.InfoController import InfoController

app = FastAPI()

# to avoid CORS error
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Hi, Kanji-Visualization Server FAST API works fine!"}


@app.get("/kanjidata")
async def read_kanji_visualize(kanji: str):
    """
    Search kanji by character.
    Args:
        kanji (str): The Japanese language single character.
    Returns:
        json: A json containing character details.
    """

    # print("Got request to search kanji:", kanji)

    is_success, error_info = SearchController.check_input(kanji)
    if error_info:
        print("API /kanjidata got error:", error_info)

    if not is_success:
        raise HTTPException(**error_info)

    is_db_success, data = GraphController.load_local_db(kanji)
    if not is_db_success:
        raise HTTPException(**data)

    is_success, error_info, graph_json = GraphController.get_graph_matrix(kanji, data)
    if not is_success:
        raise HTTPException(**error_info)

    is_success, error_info, kanji_info = InfoController.get_kanji_info(kanji)
    if not is_success:
        raise HTTPException(**error_info)

    result = {**graph_json, **kanji_info}

    return result
