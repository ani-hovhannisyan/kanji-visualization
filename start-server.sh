#!/bin/bash

uvicorn main:app --reload --app-dir ./backend --host 0.0.0.0 --port 8000
