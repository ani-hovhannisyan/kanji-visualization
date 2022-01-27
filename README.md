# kanji-visualization
Kanji words visualization graph
For more information about structure and functionality, see the docs directory.

## Directory Structure

- `docs`
  - Documents and diagrams for software design
- `frontend`
  - Source files for frontend
  - `Dockerfile`
- `backend`
  - Source files for backend
  - `Dockerfile`
- `docker-compose.yml`

docker-compose builds `frontend/Dockerfile` and `backend/Dockerfile`, and runs them.


## Setup for development with Docker

### Mac, Windows
1. [Install Docker Desktop](https://docs.docker.com/desktop/).

2. Start Docker Desktop.

3. Clone the repository.
   ```sh
   git clone https://github.com/ani-hovhannisyan/kanji-visualization.git
   cd kanji-visualization
   ```

4. Run Docker Compose.
   ```sh
   docker-compose up
   ```

   This will start the frontend and backend server automatically.
   Now, you can start developing with Docker.

### Linux
1. [Install Docker Engine](https://docs.docker.com/engine/install/).

2. [Install Docker Compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems).

3. Clone the repository.
   ```sh
   git clone https://github.com/ani-hovhannisyan/kanji-visualization.git
   cd kanji-visualization
   ```

4. Run Docker Compose.
   ```sh
   docker-compose up
   ```

   This will start the frontend and backend server automatically.
   Now, you can start developing with Docker.

The app can be viewed at http://localhost:3000.

While the server is running, any changes you make to the source code will be reflected on the screen in real time.

## Setup for development without Docker
### Requirements
- Node.js >= 14.0.0
- Python >= 3.6

### Steps
1. Install Python and Node.js.

2. Install yarn.
   ```sh
   npm install -g yarn
   ```

3. Clone the repository.
   ```sh
   git clone https://github.com/ani-hovhannisyan/kanji-visualization.git
   cd kanji-visualization
   ```

4. Install dependencies.

   Python dependencies:
   ```sh
   pip install -r ./backend/requirements.txt
   ```

   Node.js dependencies:
   ```sh
   cd frontend
   yarn install
   ```

5. Setup [pre-commit hooks](https://pre-commit.com/index.html).
   ```
   pre-commit install
   ```

6. Start servers.

   FastAPI server:
   ```sh
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   React server:
   ```sh
   cd frontend
   yarn start
   ```

   These will start the frontend and backend server respectively.
   Now, you can start developing on your local PC without Docker.

7. For testing, run:

   ```sh
   $ pytest
   ```

The app can be viewed at http://localhost:3000.

While the server is running, any changes you make to the source code will be reflected on the screen in real time.
