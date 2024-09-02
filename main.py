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
    stationary_emissions = []

    # Iteracja przez wszystkie klucze w request.form
    for key in request.form.keys():
        if 'stacjonarne_emissions' in key:
            # Oczekiwany format klucza: stacjonarne_emissions[0][paliwo]
            # Rozbij klucz, aby uzyskać indeks i nazwę pola
            index = int(key.split('[')[1].split(']')[0])
            field = key.split('[')[2].split(']')[0]

            # Upewnij się, że lista ma wystarczający rozmiar
            if len(stationary_emissions) <= index:
                stationary_emissions.append({})

            # Przypisz wartość do odpowiedniego słownika
            stationary_emissions[index][field] = request.form[key]

    # Logowanie przetworzonych danych
    print(f"Stationary Emissions (parsed): {stationary_emissions}")

    # Zapis do bazy danych
    for emission in stationary_emissions:
        new_emission = StationaryEmission(
            company_id=company_id,
            fuel_type=emission['paliwo'],
            consumption=float(emission['zuzycie']),
            unit=emission['jednostka']
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 2 (Mobilne źródła emisji)
    mobile_emissions = []

    # Iteracja przez wszystkie klucze w request.form
    for key in request.form.keys():
        if 'mobilne_emissions' in key:
            # Oczekiwany format klucza: mobilne_emissions[0][liczba_pojazdow]
            # Rozbij klucz, aby uzyskać indeks i nazwę pola
            index = int(key.split('[')[1].split(']')[0])
            field = key.split('[')[2].split(']')[0]

            # Upewnij się, że lista ma wystarczający rozmiar
            if len(mobile_emissions) <= index:
                mobile_emissions.append({})

            # Przypisz wartość do odpowiedniego słownika
            mobile_emissions[index][field] = request.form[key]

    # Logowanie przetworzonych danych
    print(f"Mobile Emissions (parsed): {mobile_emissions}")

    # Zapis do bazy danych
    for emission in mobile_emissions:
        new_emission = MobileEmission(
            company_id=company_id,
            vehicle_type=emission['rodzaj_pojazdu'],
            fuel_type=emission['sposob_zasilania'],
            fuel_consumption=float(emission['zuzycie_paliwa']),
            unit=emission['jednostka'],
            vehicle_count=int(emission['liczba_pojazdow']),
            fuel_submission_method=emission['sposob_podania']
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 3 (Energia elektryczna)
    electricity_emissions = []

    # Pobieranie wartości pola ladowanie_samochodow
    ladowanie_samochodow = request.form.get('ladowanie_samochodow')

    # Iteracja przez wszystkie klucze w request.form
    for key in request.form.keys():
        if 'energia_elektryczna' in key:
            index = int(key.split('[')[1].split(']')[0])
            field = key.split('[')[2].split(']')[0]

            if len(electricity_emissions) <= index:
                electricity_emissions.append({})

            electricity_emissions[index][field] = request.form[key]

    # Logowanie przetworzonych danych
    print(f"Electricity Emissions (parsed): {electricity_emissions}")

    # Zapis do bazy danych
    for emission in electricity_emissions:
        new_emission = ElectricityEmission(
            company_id=company_id,
            energy_source=emission['pochodzenie_energii'],
            supplier=emission['dostawca_energii'],
            consumption=float(emission['zuzycie']),
            unit=emission['jednostka'],
            ladowanie_samochodow=ladowanie_samochodow  # Przypisanie wartości do każdego wpisu
        )
        session.add(new_emission)

    # Zbieranie danych z kroku 3 (Energia cieplna)
    heat_emissions = []

    # Iteracja przez wszystkie klucze w request.form
    for key in request.form.keys():
        if 'energia_cieplna' in key:
            index = int(key.split('[')[1].split(']')[0])
            field = key.split('[')[2].split(']')[0]

            if len(heat_emissions) <= index:
                heat_emissions.append({})

            heat_emissions[index][field] = request.form[key]

    # Logowanie przetworzonych danych
    print(f"Heat Emissions (parsed): {heat_emissions}")

    # Zapis do bazy danych
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


def calculate_emissions(data):
    # Przykładowe współczynniki emisji
    CO2_FACTORS = {
        'olej_opalowy': 2.52,  # kg CO2e/l
        'gaz_ziemny': 0.202,  # kg CO2e/kWh
        'benzyna': 2.31,  # kg CO2e/l
        'diesel': 2.68,  # kg CO2e/l
        'energia_elektryczna': 0.45,  # kg CO2e/kWh
        'energia_cieplna': 0.25  # kg CO2e/kWh
    }

    # Oblicz emisje dla każdej kategorii
    total_emissions = 0
    direct_emissions = []
    indirect_emissions = []

    # Obliczenia emisji dla stacjonarnych źródeł
    for emission in data['stationary_emissions']:
        fuel_type = emission['paliwo']
        consumption = float(emission['zuzycie'])
        unit = emission['jednostka']

        if fuel_type == 'węgiel':
            # Przykładowy przelicznik dla węgla
            CO2_value = consumption * CO2_FACTORS['gaz_ziemny']
            direct_emissions.append({'type': fuel_type, 'value': CO2_value})
            total_emissions += CO2_value

    # Obliczenia emisji dla mobilnych źródeł
    for emission in data['mobile_emissions']:
        fuel_type = emission['sposob_zasilania']
        consumption = float(emission['zuzycie_paliwa'])

        if fuel_type in CO2_FACTORS:
            CO2_value = consumption * CO2_FACTORS[fuel_type]
            direct_emissions.append({'type': f"Paliwo ({fuel_type})", 'value': CO2_value})
            total_emissions += CO2_value

    # Obliczenia emisji dla energii elektrycznej
    for emission in data['electricity_emissions']:
        consumption = float(emission['zuzycie'])
        CO2_value = consumption * CO2_FACTORS['energia_elektryczna']
        indirect_emissions.append({'type': 'Energia elektryczna', 'value': CO2_value})
        total_emissions += CO2_value

    # Obliczenia emisji dla energii cieplnej
    for emission in data['heat_emissions']:
        consumption = float(emission['zuzycie_cieplnej'])
        CO2_value = consumption * CO2_FACTORS['energia_cieplna']
        indirect_emissions.append({'type': 'Energia cieplna', 'value': CO2_value})
        total_emissions += CO2_value

    return {
        'total_emissions': total_emissions,
        'direct_emissions': direct_emissions,
        'indirect_emissions': indirect_emissions
    }


def calculate_emission_metrics(total_emissions, employee_count, usable_area, annual_revenue):
    emissions_per_m2 = total_emissions / usable_area
    emissions_per_employee = total_emissions / employee_count
    emissions_per_revenue = (total_emissions / annual_revenue) * 1000  # per 1000 zł obrotu

    return {
        'emissions_per_m2': emissions_per_m2,
        'emissions_per_employee': emissions_per_employee,
        'emissions_per_revenue': emissions_per_revenue
    }


@app.route('/generate_pdf')
def generate_pdf():
    # Pobranie danych z formularza
    form_data = ...  # zbierz dane z formularza

    # Obliczenia emisji
    emissions = calculate_emissions(form_data)
    metrics = calculate_emission_metrics(
        total_emissions=emissions['total_emissions'],
        employee_count=int(form_data['employee_count']),
        usable_area=float(form_data['usable_area']),
        annual_revenue=float(form_data['annual_revenue'])
    )

    data = {
        'company_name': form_data['company_name'],
        'reporting_period': form_data['reporting_period'],
        'total_emissions': f"{metrics['total_emissions']:.2f} t CO2e/rok",
        'emissions_per_m2': f"{metrics['emissions_per_m2']:.2f} t CO2e/rok",
        'emissions_per_employee': f"{metrics['emissions_per_employee']:.2f} t CO2e/rok na pracownika",
        'emissions_per_revenue': f"{metrics['emissions_per_revenue']:.2f} t CO2e/rok na 1000 zł obrotu",
        'direct_emissions': emissions['direct_emissions'],
        'indirect_emissions': emissions['indirect_emissions'],
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
