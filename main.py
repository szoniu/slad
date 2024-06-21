import pandas as pd
from flask import Flask, render_template
from sqlalchemy import text

from database import engine  # Import engine z pliku database.py

app = Flask(__name__, static_url_path='/assets', static_folder='assets')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/database')
def show_database():
    # Pobierz dane z bazy danych
    query = text("SELECT * FROM excel_data")
    with engine.connect() as connection:
        result = connection.execute(query)
        columns = result.keys()
        data = [dict(zip(columns, row)) for row in result.fetchall()]

    # Renderuj stronę HTML z danymi
    return render_template('sales.html', data=data)


def load_excel_data():
    excel_path = 'xls/ghg2023update.en.pl.xlsx'

    # Wczytaj plik Excel z drugiego arkusza (indeks 1)
    df = pd.read_excel(excel_path, sheet_name=1)

    # Debug: Sprawdź, czy dane zostały wczytane poprawnie
    print("DataFrame loaded from Excel:")
    print(df.head())

    # Utworzenie dynamicznej tabeli w SQLAlchemy na podstawie kolumn z pliku Excel
    table_name = 'excel_data'

    # Zastąpienie istniejącej tabeli nowymi danymi
    df.to_sql(table_name, con=engine, index=False, if_exists='replace')
    print(f"Table '{table_name}' created/replaced and data inserted.")

    # Sprawdzenie liczby zaimportowanych wierszy
    with engine.connect() as connection:
        result = connection.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
        row_count = result.scalar()
        print(f"Liczba wierszy zaimportowanych do tabeli '{table_name}': {row_count}")


if __name__ == '__main__':
    # load_excel_data()
    app.run(debug=True)
