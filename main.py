from flask import Flask, redirect, send_from_directory

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


# Trasa dla plików statycznych (jeśli chcesz mieć dodatkowe ścieżki)
@app.route('/assets/<path:path>')
def send_asset(path):
    return send_from_directory('assets', path)


if __name__ == '__main__':
    app.run(debug=True)
