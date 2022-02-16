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
    return {"message": "Hello from FastAPI!"}


@app.get("/kanji-visualize")
def read_kanji_visualize(kanji: str):
    print("Got request to search kanji:", kanji)
    is_success, error_info = SearchController.check_input(kanji)
    print(error_info)
    if not is_success:
        raise HTTPException(**error_info)

    # TODO: Think of moving local DB loading to the top of server run
    is_success, error_info, graph_json = GraphController.get_graph_matrix(kanji)
    if not is_success:
        raise HTTPException(**error_info)

    is_success, error_info, kanji_info = InfoController.get_kanji_info(kanji)
    if not is_success:
        raise HTTPException(**error_info)

    return {**graph_json, **kanji_info}
