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

## Draft of Class Diagram

![alt text](https://github.com/ani-hovhannisyan/kanji-visualization/blob/fdeff89db81c15989dbae1f515187c167fcf3384/docs/Class%20Diagram.png)

Where Controllers are considered to be in backend, and Views are in frontend.

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

   The app can be viewed at http://localhost:3000.

   While the server is running, any changes you make to the source code will be reflected on the screen in real time.

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

5. Setup [pre-commit](https://pre-commit.com/index.html).
   ```sh
   pre-commit install
   ```

6. Start servers.

   FastAPI server:
   ```sh
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   or just
   ```sh
   cd backend
   ./start-server.sh
   ```

   React server:
   ```sh
   cd frontend
   yarn start
   ```

   These will start the frontend and backend server respectively.
   Now, you can start developing on your local PC without Docker.

   The app can be viewed at http://localhost:3000.

   While the server is running, any changes you make to the source code will be reflected on the screen in real time.

## Development
### Commit changes
When you make changes to the source files and run `git commit`, pre-commit hooks will automatically run the following tools.

<table align='center'>
<tr>
<th></th><th align='center'>Linter</th><th align='center'>Formatter</th><th align='center'>Static Type Checker</th>
</tr>
<tr>
<th>Backend</th><td align='center'>flake8</td><td align='center'>black</td><td align='center'>mypy</td>
</tr>
<tr>
<th>Frontend</th><td align='center'>ESLint</td><td align='center'>Prettier</td><td align='center'>(ESLint)</td>
</tr>
</table>

Here is an example of the result.

<p align="center">
<img width="586" alt="pre-commit hooks" src="https://user-images.githubusercontent.com/35371161/150695876-3383ca2c-0d0e-4424-8f61-40c28fd95900.png">
</p>

If all processes are passed or skipped, then `commit` will be executed as usual.
However, if any errors occur, `commit` will be terminated. In that case, you have to fix the error, then `git add` the change, and `git commit` it again.

For more information on the pre-commit, please see [here](https://pre-commit.com/index.html).

The above pre-commit hooks are automatically executed on each commit, but you can also execute them manually by the following commands.

- Run flake8
  ```sh
  cd backend
  flake8 .
  ```

- Run black
  ```sh
  cd backend
  black .
  ```

- Run mypy
  ```sh
  cd backend
  mypy .
  ```

- Run ESLint
  ```sh
  cd frontend
  yarn lint
  ```

- Run Prettier
  ```sh
  cd frontend
  yarn format
  ```

### Test and push changes
Before you run `git push`, please make sure your changes pass the tests.

If you have updated the **backend** source code, please run
```sh
cd backend
pytest
```

Or if you have updated the **frontend** source code, please run
```sh
cd frontend
yarn test --watchAll=false
```
or just
```sh
cd frontend
./test.sh
```

If all tests are passed, you can run `git push`.

After pushing the changes, CI/CD will automatically be executed on [GitHub Actions](https://github.com/ani-hovhannisyan/kanji-visualization/actions).
