# 📝 Gerenciador de Tarefas com React e Flask

Este é um projeto completo de Gerenciador de Tarefas, com frontend em React e backend em Flask, ideal para praticar integração entre tecnologias modernas de desenvolvimento web. O foco está no cadastro, visualização e gerenciamento de tarefas, com um sistema de autenticação simples para usuários.
## 🚀 Funcionalidades

    ✅ Cadastro e login de usuários

    📋 Criação de tarefas

    🔄 Edição e exclusão de tarefas

    📂 Organização por usuário

    🌐 Integração frontend/backend via API REST

## 🧪 Tecnologias Utilizadas
### Frontend (React)

    React com hooks (useState, useEffect)

    Fetch API para comunicação com o backend

    Armazenamento local com localStorage()

    Tailwind CSS para estilização

### Backend (Flask)

    Flask + Flask-CORS

    MySQL

    Hash de senha com werkzeug.security

## 📦 Como Executar localmente
### Backend

Clone o repositório e entre na pasta do backend:

```shell
cd backend
```

Crie e ative um ambiente virtual (opcional, mas recomendado):

python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

Instale as dependências:

```shell
pip install -r requirements.txt
```

Inicie o servidor Flask:

```shell
flask run
```

O backend será executado por padrão em http://localhost:5000.


### Frontend

Vá para a pasta do frontend:

```shell
cd frontend
```

Instale as dependências:

```shell
npm install
```

Inicie o app React:

```shell
npm start
```

O frontend abrirá em http://localhost:3000.

📌 Estrutura do Projeto

```bash
project-root/
├── frontend/
│   ├── backend/
│   │   ├── app.py
│   │   ├── models.py
│   │   ├── requirements.txt
│   │   └── ...
│   │
│   ├── src/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   └── ...
│   └── package.json
└── README.md
```

🔐 Autenticação

O sistema de login é simples, baseado em sessões locais (localStorage) e validações básicas de e-mail e senha. Não é o foco do projeto, mas serve como base para projetos mais robustos.
📖 Próximos Passos (Ideias)

    ✅ Marcar tarefas como concluídas

    📅 Adicionar prazos e categorias

    🔔 Notificações por vencimento

    🧠 Autenticação com JWT (em vez de localStorage)

    🖼️ Upload de arquivos (anexos nas tarefas)

📚 Aprendizados

Esse projeto é ideal para quem está aprendendo sobre:

    Integração de frontend e backend

    Manipulação de estados em React

    Criação de APIs REST com Flask

    Organização de aplicações fullstack