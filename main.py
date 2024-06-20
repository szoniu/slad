import pandas as pd
from flask import Flask, redirect, send_from_directory, request, jsonify
from sqlalchemy.orm import Session

from database import engine, ExampleTable

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


@app.route('/upload-excel', methods=['POST'])
def upload_excel():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Wczytaj plik Excel
    df = pd.read_excel(file)

    # Filtrowanie kolumn po wczytaniu danych
    if 'name' not in df.columns or 'value' not in df.columns:
        return jsonify({"error": "Invalid file format"}), 400

    df_filtered = df[['name', 'value']]

    with Session(engine) as session:
        for index, row in df_filtered.iterrows():
            new_entry = ExampleTable(name=row['name'], value=row['value'])
            session.add(new_entry)
        session.commit()

    return jsonify({"success": "Data uploaded successfully"}), 200


@app.route('/upload')
def upload():
    return send_from_directory('templates', 'upload.html')


if __name__ == '__main__':
    app.run(debug=True)
