//import { useEffect, useState } from "react";

interface LoginProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  handleLogin: (value: string) => void;
  /*onSubmit: (e: React.FormEvent) => void;*/
  /*onLogin: (email: String) => void;*/
}

const Login = ({ 
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  handleLogin,
  /*onSubmit,*/
 }: LoginProps) => {

  const users = [
    { email: "teste@exemplo.com", password: "123456" },
    { email: "erick@exemplo.com", password: "senha123" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!userFound) {
      setError("Credenciais inválidas. Tente novamente.");
      return;
    }

    // Limpa erro se tudo ok
    setError("");

    handleLogin(email);
    //setIsLoggedIn(true);

  };

  return (
    
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
      </form>
    </div>
  );
};

export default Login;
