# kanji-visualization
Kanji words visualization graph

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

docker-compose builds `frontend/Dockerfile` and `backend/Dockerfile`, and run them.


## Setup to develop inside Docker

1. Install Docker Desktop on your PC.

2. Start Docker Desktop.

3. Clone the repository.
   ```sh
   git clone https://github.com/ani-hovhannisyan/kanji-visualization.git
   cd kanji-visualization
   ```

4. Execute Docker Compose.
   ```sh
   docker compose up
   ```

   This will start the frontend and backend server automatically.
   Now, you can start to develop inside Docker.
   
   The Web app can be viewed at http://localhost:3000.


## Setup to develop on your local PC

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

   for Python dependencies:
   ```sh
   pip install -r ./backend/requirements.txt
   ```

   for Node.js dependencies:
   ```sh
   cd frontend
   yarn install
   ```

5. Start servers.

   for FastAPI server:
   ```sh
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   for React server:
   ```sh
   cd frontend
   yarn start
   ```

   These will start the frontend and backend server respectively.
   Now, you can start to develop on your local PC without Docker.
   
   The Web app can be viewed at http://localhost:3000.
