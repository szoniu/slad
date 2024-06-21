import os

from sqlalchemy import create_engine

# Pobierz wartość zmiennej środowiskowej
DATABASE_URI = os.getenv('DATABASE_URI')

if not DATABASE_URI:
    raise ValueError("No DATABASE_URI set for Flask application. Did you forget to set the environment variable?")

# Utwórz silnik bazy danych
engine = create_engine(DATABASE_URI)
