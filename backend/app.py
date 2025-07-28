from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os
import mysql.connector
from flask_cors import CORS

load_dotenv("/home/erickoliveiramesquita/myapp/.env")


app = Flask(__name__)
CORS(app)

def connectDB():
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    return db

# Modelo de usuário
'''class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }'''

@app.route('/check')
def check():
    try:
        db= mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users")
        dados = cursor.fetchall()
        cursor.close()
        return "it's working!"
    except mysql.connector.Error as err:
        return err

    return "it's working!3"

@app.route('/')
def home():
    db = connectDB()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    dados = cursor.fetchall()
    cursor.close()
    db.close()
    for x in dados:
        print(dados)
    return render_template("index.html", usuarios=dados)

@app.route('/listUsers', methods=['GET'])
def listUsers():
    db = connectDB()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    data = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(data)

@app.route('/login', methods=['POST', 'GET'])
def login():
    db = connectDB()
    try:
        if request.method == 'POST':
            dados = request.get_json()
            email = dados.get('email')
            senha = dados.get('password')
        else:  # Método GET
            email = request.args.get('email')
            senha = request.args.get('senha')


        # Validação básica de campos
        if not email or not senha:
            db.close()
            return jsonify({"erro": "Email e senha são obrigatórios"}), 400

        cursor = db.cursor(dictionary=True)  # dictionary=True retorna colunas com nome
        cursor.execute("SELECT * FROM users WHERE email = \""+email+"\" AND senha = \""+senha+"\"")
        usuario = cursor.fetchone()
        cursor.close()
        db.close()

        if usuario:
            return jsonify({
                "id": usuario["id"],
                "nome": usuario["nome"],
                "email": usuario["email"]
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

@app.route('/signup', methods=['POST'])
def signup():
    db = connectDB()
    try:
        dados = request.get_json()
        nome = dados.get('name')
        email = dados.get('email')
        senha = dados.get('password')

        cursor = db.cursor()
        cursor.execute("INSERT INTO users (nome, email, senha) VALUES (\""+nome+"\", \""+email+"\", \""+senha+"\");")
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"erro": "Usuário cadastrado com sucesso"}), 201

    except mysql.connector.Error as err:
        db.close()
        print("Erro no banco:", err)
        return jsonify({"erro": "Erro interno do servidor"}), 500

    except Exception as e:
        db.close()
        print("Erro inesperado:", e)
        return jsonify({"erro": "Erro inesperado"}), 500


@app.route('/addUser/<nome>/<email>/<password>')
def addUser(nome, email, password):
    db = connectDB()
    cursor = db.cursor()
    cursor.execute("INSERT INTO users (nome, email, senha) VALUES (%s, %s, %s)", (nome, email, password))
    db.commit()
    cursor.close()
    db.close()

    return "_"

'''cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    usuario = cursor.fetchone()
    cursor.close()

    if usuario:
        return f"Usuário: {usuario[1]} - Email: {usuario[2]}"
    else:
        return "Usuário não encontrado", 404'''
