from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_url_path='/assets', static_folder='assets')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/index.html')
def index_html():
    return render_template('index.html')


@app.route('/landing.html')
def landing():
    return render_template('landing.html')


@app.route('/dashboards/<path:path>')
def send_dashboard(path):
    return send_from_directory('dashboards', path)


@app.route('/layouts/<path:path>')
def send_layout(path):
    return send_from_directory('layouts', path)


@app.route('/pages/<path:path>')
def send_page(path):
    return send_from_directory('pages', path)


# Trasa dla plików statycznych (jeśli chcesz mieć dodatkowe ścieżki)
@app.route('/assets/<path:path>')
def send_asset(path):
    return send_from_directory('assets', path)


if __name__ == '__main__':
    app.run(debug=True)
