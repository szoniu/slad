import pdfkit
from flask import Flask, render_template, request, redirect, url_for, make_response
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker

from database import engine_company, engine_excel, CompanyProfile, create_tables, StationaryEmission, MobileEmission, \
    ElectricityEmission, HeatEmission

app = Flask(__name__, static_url_path='/static', static_folder='static')


# Funkcja do zapisywania profilu firmy
@app.route('/save_company_profile', methods=['POST'])
def save_company_profile():
    session = sessionmaker(bind=engine_company)()

    # Zbieranie danych z kroku 1 (Profil firmy)
    company_name = request.form.get('company_name')
    company_nip = request.form.get('company_nip')
    business_type = request.form.get('business_type')
    reporting_period = request.form.get('reporting_period')
    employee_count = int(request.form.get('employee_count'))
    annual_revenue = float(request.form.get('annual_revenue'))
    usable_area = float(request.form.get('usable_area'))

    # Zbieranie danych z dodatkowych opcji
    additional_option = request.form.get('additional_select')

    # Debugging prints
    print("Company Name:", company_name)
    print("Company NIP:", company_nip)
    print("Business Type:", business_type)
    print("Additional Option:", additional_option)  # Debugging print
    print("Reporting Period:", reporting_period)
    print("Employee Count:", employee_count)
    print("Annual Revenue:", annual_revenue)
    print("Usable Area:", usable_area)

    # Tworzenie nowego wpisu do tabeli company_profiles
    new_company = CompanyProfile(
        company_name=company_name,
        company_nip=company_nip,
        business_type=business_type,
        additional_option=additional_option,  # Zapis dodatkowej opcji
        reporting_period=int(reporting_period),
        employee_count=employee_count,
        annual_revenue=annual_revenue,
        usable_area=usable_area
    )
    session.add(new_company)
    session.commit()

    # Zapisz ID nowo utworzonej firmy do zmiennej, aby użyć go w kolejnych krokach
    company_id = new_company.id

    # Zbieranie danych z kroku 2 (Stacjonarne źródła emisji)
    stationary_emissions = request.form.getlist('stacjonarne_emissions')
    print("Stationary Emissions:", stationary_emissions)  # Debugging print

    for emission in stationary_emissions:
        print("Emission Data:", emission)  # Additional Debugging print
        new_emission = StationaryEmission(
            company_id=company_id,
            fuel_type=emission['paliwo'],
            consumption=float(emission['zuzycie']),
            unit=emission['jednostka']
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 2 (Mobilne źródła emisji)
    mobile_emissions = request.form.getlist('mobilne_emissions')
    for emission in mobile_emissions:
        new_emission = MobileEmission(
            company_id=company_id,
            vehicle_type=emission['rodzaj_pojazdu'],
            fuel_type=emission['sposob_zasilania'],
            fuel_consumption=float(emission['zuzycie_paliwa']),
            unit=emission['jednostka']
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 3 (Energia elektryczna)
    electricity_emissions = request.form.getlist('energia_elektryczna')
    for emission in electricity_emissions:
        new_emission = ElectricityEmission(
            company_id=company_id,
            energy_source=emission['pochodzenie_energii'],
            supplier=emission['dostawca_energii'],
            consumption=float(emission['zuzycie']),
            unit=emission['jednostka']
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 3 (Energia cieplna)
    heat_emissions = request.form.getlist('energia_cieplna')
    for emission in heat_emissions:
        new_emission = HeatEmission(
            company_id=company_id,
            supplier=emission['dostawca_energii_cieplnej'],
            consumption=float(emission['zuzycie_cieplnej']),
            unit=emission['jednostka_cieplnej']
        )
        session.add(new_emission)

    # Zatwierdzenie wszystkich zmian w bazie danych
    session.commit()

    return redirect(url_for('index'))


# Funkcja do obsługi formularza i zapisu danych
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        return save_company_profile()
    return render_template('index.html')


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

    html_content = render_template('report_template.html', data=data)
    pdf = pdfkit.from_string(html_content, False)

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=raport_weglowy.pdf'

    return response


if __name__ == '__main__':
    create_tables()  # Tworzenie tabel przed uruchomieniem aplikacji
    # load_excel_data()  # Opcjonalne ładowanie danych
    app.run(debug=True)
