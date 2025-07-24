import { useState } from "react";
import Login from "./Login";
import Home from "./Home";

const PageHandler = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    setIsLoggedIn(true);

  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {!isLoggedIn ? (
        <Login
          email={email}
          password={password}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
      ) : (
        <Home email={email} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default PageHandler;
