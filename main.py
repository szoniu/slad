import pandas as pd
from flask import Flask, redirect, send_from_directory

from database import engine

app = Flask(__name__, static_url_path='/assets', static_folder='assets')


@app.route('/')
def index():
    return redirect('/utilities/wizards/horizontal.html')


@app.route('/index.html')
def index_html():
    return redirect('/utilities/wizards/horizontal.html')


@app.route('/landing.html')
def landing():
    return send_from_directory('templates', 'landing.html')


@app.route('/dashboards/<path:path>')
def send_dashboard(path):
    return send_from_directory('dashboards', path)


@app.route('/layouts/<path:path>')
def send_layout(path):
    return send_from_directory('layouts', path)


@app.route('/pages/<path:path>')
def send_page(path):
    return send_from_directory('pages', path)


@app.route('/utilities/<path:path>')
def send_utility(path):
    return send_from_directory('utilities', path)


@app.route('/assets/<path:path>')
def send_asset(path):
    return send_from_directory('assets', path)


def load_excel_data():
    excel_path = 'xls/ghg2023update.xlsx'

    # Wczytaj plik Excel z drugiego arkusza (indeks 1)
    df = pd.read_excel(excel_path, sheet_name=1)

    # Utworzenie dynamicznej tabeli w SQLAlchemy na podstawie kolumn z pliku Excel
    table_name = 'excel_data'

    # Jeśli tabela nie istnieje, utwórz ją
    if not engine.dialect.has_table(engine, table_name):
        df.to_sql(table_name, con=engine, index=False, if_exists='replace')
    else:
        with engine.begin() as connection:
            df.to_sql(table_name, con=connection, index=False, if_exists='append')


if __name__ == '__main__':
    # Odkomentuj poniższą linię, aby załadować dane z pliku Excel
    # load_excel_data()

    app.run(debug=True)
