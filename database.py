import os

from sqlalchemy import create_engine

# Pobranie URI dla obu baz danych ze zmiennych środowiskowych
DATABASE_URI_COMPANY = os.getenv('DATABASE_URI_COMPANY')
DATABASE_URI_EXCEL = os.getenv('DATABASE_URI_EXCEL')

# Sprawdzenie, czy zmienne środowiskowe są ustawione
if not DATABASE_URI_COMPANY:
    raise ValueError(
        "No DATABASE_URI_COMPANY set for Flask application. Did you forget to set the environment variable?")

if not DATABASE_URI_EXCEL:
    raise ValueError("No DATABASE_URI_EXCEL set for Flask application. Did you forget to set the environment variable?")

# Utworzenie silników bazy danych
engine_company = create_engine(DATABASE_URI_COMPANY)
engine_excel = create_engine(DATABASE_URI_EXCEL)
