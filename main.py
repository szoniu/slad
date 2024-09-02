from datetime import datetime

import pandas as pd
import pdfkit
from flask import Flask, render_template, request, redirect, url_for, make_response
from sqlalchemy import text, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from database import engine_company, engine_excel  # Import engine z pliku database.py

app = Flask(__name__, static_url_path='/static', static_folder='static')

Base = declarative_base()


# Definicja tabeli dla danych profilu firmy
class CompanyProfile(Base):
    __tablename__ = 'company_profiles'

    id = Column(Integer, primary_key=True)
    company_name = Column(String, nullable=False)
    company_nip = Column(String, nullable=False)
    business_type = Column(String, nullable=False)
    reporting_period = Column(Integer, nullable=False)
    employee_count = Column(Integer, nullable=False)
    annual_revenue = Column(Float, nullable=False)
    usable_area = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Definicja tabeli dla stacjonarnych źródeł emisji
class StationaryEmission(Base):
    __tablename__ = 'stationary_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    fuel_type = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Definicja tabeli dla mobilnych źródeł emisji
class MobileEmission(Base):
    __tablename__ = 'mobile_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    vehicle_type = Column(String, nullable=False)
    fuel_type = Column(String, nullable=False)
    fuel_consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Definicja tabeli dla emisji z energii elektrycznej
class ElectricityEmission(Base):
    __tablename__ = 'electricity_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    energy_source = Column(String, nullable=False)
    supplier = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Definicja tabeli dla emisji z energii cieplnej
class HeatEmission(Base):
    __tablename__ = 'heat_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    supplier = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


# Utworzenie tabel w bazie danych
Base.metadata.create_all(engine_company)


# Funkcja do zapisywania profilu firmy
@app.route('/save_company_profile', methods=['POST'])
def save_company_profile():
    company_name = request.form.get('company_name')
    company_nip = request.form.get('company_nip')
    business_type = request.form.get('business_type')
    reporting_period = request.form.get('reporting_period')
    employee_count = int(request.form.get('employee_count'))
    annual_revenue = float(request.form.get('annual_revenue'))
    usable_area = float(request.form.get('usable_area'))

    # Zapis danych do tabeli company_profiles
    new_company = CompanyProfile(
        company_name=company_name,
        company_nip=company_nip,
        business_type=business_type,
        reporting_period=int(reporting_period),
        employee_count=employee_count,
        annual_revenue=annual_revenue,
        usable_area=usable_area
    )

    session = sessionmaker(bind=engine_company)()
    session.add(new_company)
    session.commit()

    return redirect(url_for('index'))


# Funkcja do obsługi formularza i zapisu danych
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Obsługa formularza z kroku 1
        company_name = request.form.get('company_name')
        company_nip = request.form.get('company_nip')
        business_type = request.form.get('business_type')
        reporting_period = request.form.get('reporting_period')
        employee_count = request.form.get('employee_count')
        annual_revenue = request.form.get('annual_revenue')
        usable_area = request.form.get('usable_area')

        # Obsługa zapisu do bazy danych
        save_company_profile()

        return redirect(url_for('index'))

    return render_template('index.html')


# Funkcja do załadowania danych z Excela
def load_excel_data():
    excel_path = 'xls/ghg2023update.en.pl.xlsx'
    df = pd.read_excel(excel_path, sheet_name=1)
    print("DataFrame loaded from Excel:")
    print(df.head())

    table_name = 'excel_data'
    df.to_sql(table_name, con=engine_excel, index=False, if_exists='replace')
    print(f"Table '{table_name}' created/replaced and data inserted.")

    with engine_excel.connect() as connection:
        result = connection.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
        row_count = result.scalar()
        print(f"Liczba wierszy zaimportowanych do tabeli '{table_name}': {row_count}")


@app.route('/database')
def show_database():
    query = text("SELECT * FROM excel_data")
    with engine_excel.connect() as connection:
        result = connection.execute(query)
        columns = result.keys()
        data = [dict(zip(columns, row)) for row in result.fetchall()]

    unique_scopes = sorted(set(row['Scope'] for row in data if row['Scope'] is not None))
    unique_level1 = sorted(set(row['Level 1'] for row in data if row['Level 1'] is not None))
    unique_level2 = sorted(set(row['Level 2'] for row in data if row['Level 2'] is not None))
    unique_level3 = sorted(set(row['Level 3'] for row in data if row['Level 3'] is not None))
    unique_level4 = sorted(set(row['Level 4'] for row in data if row['Level 4'] is not None))
    unique_column_text = sorted(set(row['Column Text'] for row in data if row['Column Text'] is not None))
    unique_uom = sorted(set(row['UOM'] for row in data if row['UOM'] is not None))
    unique_ghg_unit = sorted(set(row['GHG/Unit'] for row in data if row['GHG/Unit'] is not None))

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


if __name__ == '__main__':
    # create_tables()  # Tworzenie tabel przed uruchomieniem aplikacji
    # load_excel_data()
    app.run(debug=True)
