import { useState } from "react";

interface LoginProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  handleLogin: (value: string, value2: string) => void;
}

const Login = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  handleLogin,
}: LoginProps) => {
  /*const users = [
    { name: "Tester", email: "teste@exemplo.com", password: "123456" },
    { name: "Érick", email: "erick@exemplo.com", password: "senha123" },
  ];*/

  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLoginMode
      ? "https://task-manager-backend-flask-g2c9.onrender.com/login"
      : "https://task-manager-backend-flask-g2c9.onrender.com/signup";

    // Validação simples
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    /*const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      name = userFound.name;
      setName(name);
    } else {
      setError("Credenciais inválidas. Tente novamente.");
      return;
    }*/

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro desconhecido");
      } else {
        setError("");
        if (isLoginMode) {
          //localStorage.setItem("user", JSON.stringify({ email }));
          //onLogin();
          name = JSON.stringify({ name });
          email = JSON.stringify({ email });
          handleLogin(email, name);
        } else {
          alert("Usuário cadastrado com sucesso!");
          setIsLoginMode(true);
        }
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }

    // Limpa erro se tudo ok
    setError("");

    //handleLogin(email, name);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isLoginMode ? "Entrar" : "Cadastrar"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
        {!isLoginMode && (
          <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fulano de Tal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
        <p className="">
          {isLoginMode ? (
            <>
              Não possui cadastro? <a onClick={() => setIsLoginMode(false)}>Sign up</a>
            </>
          ) : (
            <>
              Já é cadastrado? <a onClick={() => setIsLoginMode(true)}>Sign in</a>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
