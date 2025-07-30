from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os
import mysql.connector
from flask_cors import CORS
import jwt
import datetime

#pythonanywhere needs fixed path to read files
load_dotenv("/home/erickoliveiramesquita/myapp/.env")


app = Flask(__name__)
CORS(app)


# my password for token creation
SECRET_KEY = os.getenv("SECRET_KEY")


# token generation
def genToken(id):
    payload = {
        "id": id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30)  # expires in 30 days
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token


# token validation
def decodeToken(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload  # returns { id: ..., exp: ... }
    except jwt.ExpiredSignatureError:
        return None  # expired Token
    except jwt.InvalidTokenError:
        return None  # invalid Token


# function to connect to the users database
def connectUsersDB():
    db = mysql.connector.connect(
        host = os.getenv("DB_HOST"),
        user = os.getenv("DB_USER"),
        password = os.getenv("DB_PASSWORD"),
        database = os.getenv("DB_NAME")
    )
    return db


# route for checking all the users in a plain HTML page (debugging)
@app.route('/')
def home():
    db = connectUsersDB()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    dados = cursor.fetchall()
    cursor.close()
    db.close()
    for x in dados:
        print(dados)
    return render_template("index.html", usuarios=dados)


# route for list all users in a json file (debugging)
@app.route('/listUsers', methods=['GET'])
def listUsers():
    db = connectUsersDB()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    data = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(data)


# route for login attempt and return of user data (needs improvement to send only JWT token)
@app.route('/login', methods=['POST'])
def login():
    db = connectUsersDB()
    try:
        dados = request.get_json() #get the json data
        email = dados.get('email')
        senha = dados.get('password')

        # field validation
        if not email or not senha:
            db.close() #always ensure to close db
            return jsonify({"erro": "Email e senha são obrigatórios"}), 400

        cursor = db.cursor(dictionary=True)  # dictionary=True return cols with names
        cursor.execute("SELECT * FROM users WHERE email = %s AND senha = %s", (email, senha)) # mysql command to check if email and password matches
        usuario = cursor.fetchone()
        cursor.close()
        db.close()

        if usuario:
            return jsonify({ # return id, name and email if user was found
                "token": genToken(usuario["id"])
            }), 200
        else:
            return jsonify({"erro": "Email ou senha incorretos"}), 401

    except mysql.connector.Error as err:
        db.close()
        print("Erro no banco:", err)
        return jsonify({"erro": "Erro interno do servidor"}), 500

    except Exception as e:
        db.close()
        print("Erro inesperado:", e)
        return jsonify({"erro": "Erro inesperado"}), 500


# get info about name, email, last task list and config prefs
@app.route('/getInfo', methods=['POST'])
def getInfo():
    db = connectUsersDB()
    dados = request.get_json() #get the json data
    token = decodeToken(dados.get('token'))

    if(not token):
        return jsonify({"erro": "Expired Token"}) # return this error if the token is expired

    id = token["id"]
    if(id):
        cursor = db.cursor(dictionary=True)  # dictionary=True return cols with names
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,)) # mysql command to check if id matches
        usuario = cursor.fetchone()
        cursor.close()
        db.close()
        if usuario:
            return jsonify({ # return name and email if user was found. Later returns configs and prefs, but I need to add this to the 'users' table
                "nome": usuario["nome"],
                "email": usuario["email"],
            }), 200
        else:
            return jsonify({"erro": "Favor logar novamente"}), 401
    else:
        db.close()
        return jsonify({"erro": "Favor logar novamente"}), 401


#route for signup and return a message if user is created
@app.route('/signup', methods=['POST'])
def signup():
    db = connectUsersDB()
    try:
        dados = request.get_json() #get the json data
        nome = dados.get('name')
        email = dados.get('email')
        senha = dados.get('password')

        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,)) # checks if the email was already taken
        usuario = cursor.fetchone()
        cursor.close()

        if usuario:
            db.close()
            return jsonify({"erro":"Usuário já cadastrado"}), 405
        else:
            cursor = db.cursor()
            cursor.execute("INSERT INTO users (nome, email, senha) VALUES (%s, %s, %s)", (nome, email, senha)) # inserts new user
            db.commit()
            cursor.close()
            db.close()
            return jsonify({"erro": "Usuário cadastrado com sucesso"}), 201

    except mysql.connector.Error as err:
        db.close()
        print("Erro no banco:", err)
        return jsonify({"erro": "Erro interno do servidor"+err}), 500

    except Exception as e:
        db.close()
        print("Erro inesperado:", e)
        return jsonify({"erro": "Erro inesperado"}), 500

