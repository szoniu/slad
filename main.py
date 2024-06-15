import sqlite3
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html', title='My Page', heading='Hello, World!', items=['Item 1', 'Item 2', 'Item 3'])


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/init_db')
def init_db():
    conn = get_db_connection()
    conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)')
    conn.close()
    return "Database initialized!"


if __name__ == '__main__':
    app.run(host='0.0.0.0')
