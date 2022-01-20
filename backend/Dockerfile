FROM python:3.9.10

COPY . /app

WORKDIR /app/backend
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
