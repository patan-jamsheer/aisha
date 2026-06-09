from flask import Flask, render_template, request, jsonify
import mysql.connector
from config import DB_CONFIG

app = Flask(__name__)

def get_response(user_message):
    user_message = user_message.lower().strip()
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute("SELECT keyword, response FROM responses")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    for keyword, response in rows:
        if keyword.lower() in user_message:
            return response

    return "Sorry, I didn't understand that. Can you rephrase?"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    response = get_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)