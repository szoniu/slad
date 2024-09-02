import pandas as pd
import pdfkit
from flask import Flask, render_template, request, redirect, url_for, make_response
from sqlalchemy import text

from database import engine_company, engine_excel  # Import engine z pliku database.py

app = Flask(__name__, static_url_path='/static', static_folder='static')


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Odbierz dane z formularza
        company_name = request.form.get('company_name')
        company_nip = request.form.get('company_nip')
        business_type = request.form.get('business_type')
        # Pobrane dane możesz teraz przetworzyć lub zapisać do bazy danych
        # Zwróć użytkownikowi odpowiednią odpowiedź
        return redirect(url_for('index'))
    return render_template('index.html')


@app.route('/save_company_profile', methods=['POST'])
def save_company_profile():
    company_name = request.form.get('company_name')
    company_nip = request.form.get('company_nip')
    business_type = request.form.get('business_type')

    query = text("""
        INSERT INTO company_profiles (company_name, company_nip, business_type)
        VALUES (:company_name, :company_nip, :business_type)
    """)

    with engine_company.connect() as connection:
        connection.execute(query, {
            'company_name': company_name,
            'company_nip': company_nip,
            'business_type': business_type
        })

    return redirect(url_for('index'))


@app.route('/database')
def show_database():
    # Pobranie danych z bazy
    query = text("SELECT * FROM excel_data")
    with engine_excel.connect() as connection:
        result = connection.execute(query)
        columns = result.keys()
        data = [dict(zip(columns, row)) for row in result.fetchall()]

    # Tworzenie unikalnych wartości dla każdej kolumny
    unique_scopes = sorted(set(row['Scope'] for row in data))
    unique_level1 = sorted(set(row['Level 1'] for row in data))
    unique_level2 = sorted(set(row['Level 2'] for row in data))
    unique_level3 = sorted(set(row['Level 3'] for row in data))
    unique_level4 = sorted(set(row['Level 4'] for row in data))
    unique_column_text = sorted(set(row['Column Text'] for row in data))
    unique_uom = sorted(set(row['UOM'] for row in data))
    unique_ghg_unit = sorted(set(row['GHG/Unit'] for row in data))

    # Renderowanie szablonu HTML z przekazanymi danymi i unikalnymi wartościami
    return render_template('database.html',
                           data=data,
                           unique_scopes=unique_scopes,
                           unique_level1=unique_level1,
                           unique_level2=unique_level2,
                           unique_level3=unique_level3,
                           unique_level4=unique_level4,
                           unique_column_text=unique_column_text,
                           unique_uom=unique_uom,
                           unique_ghg_unit=unique_ghg_unit)


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
    df.to_sql(table_name, con=engine_excel, index=False, if_exists='replace')
    print(f"Table '{table_name}' created/replaced and data inserted.")

    # Sprawdzenie liczby zaimportowanych wierszy
    with engine_excel.connect() as connection:
        result = connection.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
        row_count = result.scalar()
        print(f"Liczba wierszy zaimportowanych do tabeli '{table_name}': {row_count}")


@app.route('/generate_pdf')
def generate_pdf():
    # Pobierz dane z formularza lub bazy danych
    # Tutaj przykładowe dane, które normalnie byś pobierał dynamicznie
    data = {
        'company_name': request.args.get('company_name', 'Firma XYZ'),
        'reporting_period': request.args.get('reporting_period', '2022'),
        'total_emissions': '127.72 t CO2e/rok',
        'emissions_per_m2': '2.55 t CO2e/rok',
        'emissions_per_employee': '127.72 t CO2e/rok na pracownika',
        'emissions_per_revenue': '1.28 t CO2e/rok na 1000 zł obrotu',
        'direct_emissions': [
            {'type': 'Olej opałowy', 'value': '0.01 t CO2e/rok', 'percentage': '0.01%'},
            {'type': 'Gaz ziemny', 'value': '0.01 t CO2e/rok', 'percentage': '0.01%'},
            {'type': 'Paliwo w samochodach', 'value': '2.96 t CO2e/rok', 'percentage': '2.31%'},
        ],
        'indirect_emissions': [
            {'type': 'Energia elektryczna', 'value': '80.81 t CO2e/rok', 'percentage': '63.27%'},
            {'type': 'Energia cieplna', 'value': '43.94 t CO2e/rok', 'percentage': '34.40%'},
        ],
    }

    # Renderowanie HTML do PDF
    html_content = render_template('report_template.html', data=data)
    pdf = pdfkit.from_string(html_content, False)

    # Przygotowanie odpowiedzi z plikiem PDF
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=raport_weglowy.pdf'

    return response


def create_tables():
    # Sprawdzenie, jako który użytkownik jesteśmy połączeni
    with engine_company.connect() as connection:
        result = connection.execute(text("SELECT current_user;"))
        current_user = result.scalar()
        print(f"Połączono jako: {current_user}")

    # SQL zapytanie tworzące tabelę
    create_table_query = text("""
        CREATE TABLE IF NOT EXISTS company_profiles (
            id SERIAL PRIMARY KEY,
            company_name VARCHAR(255) NOT NULL,
            company_nip VARCHAR(20) NOT NULL,
            business_type VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Wykonanie zapytania
    with engine_company.connect() as connection:
        connection.execute(create_table_query)

    print("Tabela 'company_profiles' została utworzona.")


if __name__ == '__main__':
    # create_tables()  # Tworzenie tabeli przed uruchomieniem aplikacji
    # load_excel_data()
    app.run(debug=True)
