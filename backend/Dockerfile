FROM nikolaik/python-nodejs:python3.10-nodejs16

COPY . /app

WORKDIR /app/backend
RUN pip install -r requirements.txt

RUN pre-commit install
RUN git config --global gpg.program /usr/bin/gpg

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
