import json

import pdfkit
from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker

from database import engine_company, engine_excel, CompanyProfile, StationaryEmission, MobileEmission, \
    ElectricityEmission, HeatEmission, get_emission_factors, get_emission_factors_mobilne

app = Flask(__name__, static_url_path='/static', static_folder='static')


# Funkcja do zapisywania profilu firmy
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

    # Iteracja przez wszystkie klucze w request.form
    stationary_emissions = []

    for key in request.form.keys():
        if 'stacjonarne_emissions' in key:
            # Oczekiwany format klucza: stacjonarne_emissions[0][paliwo]
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
        fuel_type = emission['paliwo']
        unit = emission['jednostka']
        consumption = float(emission['zuzycie'])

        # Pobieranie współczynnika emisji CO2 z bazy danych
        conversion_factor = session.execute(text('''
            SELECT "GHG Conversion Factor 2023"
            FROM excel_data
            WHERE "Level 3" = :fuel_type
            AND "UOM" = :unit
        '''), {'fuel_type': fuel_type, 'unit': unit}).fetchone()

        if conversion_factor:
            co2_emission = consumption * conversion_factor[0] / 1000  # konwersja na tony CO2e
        else:
            co2_emission = 0  # default value if no conversion factor found

        new_emission = StationaryEmission(
            company_id=company_id,
            fuel_type=fuel_type,
            consumption=consumption,
            unit=unit,
            co2_emission=co2_emission
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
@app.route('/')
def index():
    session = sessionmaker(bind=engine_excel)()

    # Pobieranie danych do pierwszego formularza (tak jak było)
    fuels_units = session.execute(text('''
SELECT "Level 3" AS fuel, array_agg(DISTINCT "UOM") AS units
FROM excel_data
WHERE "Level 1" = 'Paliwa'
GROUP BY "Level 3"
ORDER BY "Level 3";
    ''')).fetchall()

    fuels_units_dict = {row.fuel: row.units for row in fuels_units}
    fuel_types = list(fuels_units_dict.keys())

    # Pobieranie danych do drugiego formularza (mobilne źródła emisji)
    vehicles_data = session.execute(text('''
        SELECT "Level 1" AS level1, 
               "Level 2" AS level2,          -- Dodaj kolumnę Level 2
               "Level 3" AS level3,          -- Dodaj kolumnę Level 3
               "Column Text" AS column_text, 
               "UOM" AS uom, 
               "GHG/Unit" AS ghg_unit, 
               "GHG Conversion Factor 2023" AS conversion_factor
        FROM excel_data
        WHERE "Level 1" LIKE '%Pojazdy%'
        AND "UOM" <> 'mile'
        ORDER BY "Level 1";
    ''')).fetchall()

    # Zmiana struktury na listę słowników
    vehicles_list = [{'level1': row.level1,
                      'level2': row.level2,  # Dodaj Level 2 do słownika
                      'level3': row.level3,  # Dodaj Level 3 do słownika
                      'column_text': row.column_text,
                      'uom': row.uom,
                      'ghg_unit': row.ghg_unit,
                      'conversion_factor': row.conversion_factor}
                     for row in vehicles_data]

    # Debugowanie JSON-a w backendzie
    # print(vehicles_data)
    # Przekazanie JSON-ów do szablonu
    return render_template('index.html',
                           fuels_units=json.dumps(fuels_units_dict, ensure_ascii=False),
                           fuel_types=fuel_types,
                           vehicles_data=json.dumps(vehicles_list, ensure_ascii=False))


@app.route('/get_options')
def get_options():
    level = request.args.get('level')
    selected_value = request.args.get('selectedValue')

    session = sessionmaker(bind=engine_excel)()

    if level == '2':
        # Pobieranie opcji z Level 2 na podstawie wybranego Level 1
        result = session.execute(text('''
            SELECT DISTINCT "Level 2"
            FROM excel_data
            WHERE "Level 1" = :selected_value
        '''), {'selected_value': selected_value}).fetchall()
    elif level == '3':
        # Pobieranie opcji z Level 3 na podstawie wybranego Level 2
        result = session.execute(text('''
            SELECT DISTINCT "Level 3"
            FROM excel_data
            WHERE "Level 2" = :selected_value
        '''), {'selected_value': selected_value}).fetchall()

    options = [row[0] for row in result]
    return jsonify({'options': options})


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
    total_emissions = 0
    direct_emissions = []
    indirect_emissions = []

    # Obliczenia emisji dla stacjonarnych źródeł
    for emission in data['stationary_emissions']:
        fuel_type = emission['paliwo']
        consumption = float(emission['zuzycie'])
        unit = emission['jednostka']

        # Pobieranie wskaźników emisji z bazy danych
        factors = get_emission_factors(fuel_type, unit)
        print(f"Pobrane wskaźniki emisji dla {fuel_type} ({unit}): {factors}")

        # Obliczenie emisji na podstawie pobranych wskaźników
        for factor in factors:
            if factor['GHG_Unit'] == 'kg CO2e':
                CO2_value = consumption * factor['Conversion_Factor']
                direct_emissions.append({'type': fuel_type, 'value': CO2_value, 'unit': unit})
                total_emissions += CO2_value
                print(f"Obliczona emisja dla {fuel_type} ({unit}): {CO2_value} kg CO2e")

    # Możesz rozszerzyć tę logikę na inne źródła emisji w ten sam sposób
    # Dodaj sekcje dla mobilnych, elektrycznych i cieplnych emisji

    return {
        'total_emissions': total_emissions,
        'direct_emissions': direct_emissions,
        'indirect_emissions': indirect_emissions
    }


def calculate_emission_metrics(total_emissions, employee_count, usable_area, annual_revenue):
    # Obliczanie wskaźników emisji
    emissions_per_m2 = total_emissions / usable_area if usable_area else 0
    emissions_per_employee = total_emissions / employee_count if employee_count else 0
    emissions_per_revenue = (total_emissions / annual_revenue) * 1000 if annual_revenue else 0  # per 1000 zł obrotu

    # Debugowanie obliczeń wskaźników
    print(f"Emisje na m2: {emissions_per_m2}")
    print(f"Emisje na pracownika: {emissions_per_employee}")
    print(f"Emisje na 1000 zł obrotu: {emissions_per_revenue}")

    return {
        'emissions_per_m2': emissions_per_m2,
        'emissions_per_employee': emissions_per_employee,
        'emissions_per_revenue': emissions_per_revenue
    }


@app.route('/generate_pdf')
def generate_pdf():
    # Pobranie danych z formularza - zakładam, że dane są przekazywane przez formularz lub inny sposób
    form_data = request.get_json()  # Zbieramy dane w formacie JSON

    # Debugowanie danych z formularza
    print(f"Pobrane dane z formularza: {form_data}")

    # Obliczenia emisji na podstawie dynamicznych wskaźników
    emissions = calculate_emissions(form_data)

    # Obliczenia metryk na podstawie łącznych emisji i dodatkowych danych z formularza
    metrics = calculate_emission_metrics(
        total_emissions=emissions['total_emissions'],
        employee_count=int(form_data['employee_count']),
        usable_area=float(form_data['usable_area']),
        annual_revenue=float(form_data['annual_revenue'])
    )

    # Przygotowanie danych do raportu
    data = {
        'company_name': form_data['company_name'],
        'reporting_period': form_data['reporting_period'],
        'total_emissions': f"{emissions['total_emissions']:.2f} t CO2e/rok",  # Poprawka tutaj, aby używać emisji
        'emissions_per_m2': f"{metrics['emissions_per_m2']:.2f} t CO2e/rok",
        'emissions_per_employee': f"{metrics['emissions_per_employee']:.2f} t CO2e/rok na pracownika",
        'emissions_per_revenue': f"{metrics['emissions_per_revenue']:.2f} t CO2e/rok na 1000 zł obrotu",
        'direct_emissions': emissions['direct_emissions'],
        'indirect_emissions': emissions['indirect_emissions'],
    }

    # Debugowanie danych do raportu
    print(f"Dane do raportu: {data}")

    # Renderowanie treści HTML raportu
    html_content = render_template('report_template.html', data=data)

    # Generowanie PDF z treści HTML
    pdf = pdfkit.from_string(html_content, False)

    # Przygotowanie odpowiedzi z PDF
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=raport_weglowy.pdf'

    return response


@app.route('/fetch_emission_factors', methods=['POST'])
def fetch_emission_factors():
    # Pobranie danych z żądania
    data = request.json
    level3 = data['level3']
    jednostka = data['jednostka']

    # Pobranie wskaźników z bazy
    factors = get_emission_factors(level3, jednostka)

    # Zwracanie wskaźników emisji bez mnożenia przez `ilosc`
    results = {
        'CO2e': factors[0][2],
        'CO2': factors[1][2],
        'CH4': factors[2][2],
        'N2O': factors[3][2]
    }

    print(f"Wskaźniki emisji: {results}")

    return jsonify(results)


@app.route('/fetch_emission_factors_mobilne', methods=['POST'])
def fetch_emission_factors_mobilne():
    # Pobranie danych z żądania
    data = request.json

    # Poprawne przypisanie zmiennych z obiektu `data`
    level1 = data.get('level1')
    level2 = data.get('level2')
    level3 = data.get('level3')
    jednostka = data.get('jednostka')
    fuel_type = data.get('fuel_type')

    # Logowanie przypisanych wartości do debugowania
    print(
        f"Parametry zapytania: level1={level1}, level2={level2}, level3={level3}, jednostka={jednostka}, fuel_type={fuel_type}")

    # Pobranie wskaźników z bazy danych
    factors = get_emission_factors_mobilne(level3, jednostka, level2, level1, fuel_type)

    if not factors:
        return jsonify({"error": "Brak danych wskaźników emisji dla podanych parametrów."}), 400

    # Tworzenie wyników emisji
    results = {
        'CO2e': factors[0][2] if len(factors) > 0 else None,
        'CO2': factors[1][2] if len(factors) > 1 else None,
        'CH4': factors[2][2] if len(factors) > 2 else None,
        'N2O': factors[3][2] if len(factors) > 3 else None
    }

    print(f"Otrzymane wskaźniki emisji: {results}")

    return jsonify(results)


if __name__ == '__main__':
    # create_tables()  # Tworzenie tabel przed uruchomieniem aplikacji
    # load_excel_data()  # Opcjonalne ładowanie danych
    app.run(debug=True)
