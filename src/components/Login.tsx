import { useState } from "react";

interface LoginProps {
  token: string;
  setToken: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  handleLogin: (value: string) => void;
}

const Login = ({
  token,
  setToken,
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
  const [isLoginMode, setIsLoginMode] = useState(true); // toogles between login and signup states
  const [loading, setLoading] = useState(false); // used in async to handle loading states

  // handles the submit action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents the action of submitting the form
    setLoading(true); // set loading true by default, until the funcion returns
    setError(""); // erases the error message while loading

    // changes the backend service depending of the login/signup state
    const url = isLoginMode
      ? "https://erickoliveiramesquita.pythonanywhere.com/login"
      : "https://erickoliveiramesquita.pythonanywhere.com/signup";

    // checks if all fields are filled
    if (!email || !password || (!isLoginMode && !name)) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      // fetches the backend service by POST method
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json(); // get data
      console.log(data); //debug

      if (!response.ok) {
        setError(data.erro || "Erro desconhecido"); // get error from data if the response is not ok
      } else {
        setError(""); // erases error message
        if (isLoginMode) {
          // check if it's in login or signup mode
          handleLogin(data.token);
          /*name = data.nome;
          email = data.email;
          handleLogin(token);*/ // login the user if everything is ok
        } else {
          setError(data.erro); // this is the "error" message coming from backend where it says if the user is created
          setIsLoginMode(true);
        }
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
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

        {loading ? (
          <button className="w-full bg-gray-400 text-white py-2 rounded-lg transition-colors">
            Carregando
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoginMode ? <>Entrar</> : <>Cadastrar</>}
          </button>
        )}

        <div>
          <span className="mr-6">
            {isLoginMode ? "Não possui cadastro?" : "Já é cadastrado?"}
          </span>
          {isLoginMode ? (
            <>
              <button
                type="button"
                className="bg-transparent text-blue-600 border border-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => {
                  setIsLoginMode(false);
                  setError("");
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="bg-transparent text-blue-600 border border-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                onClick={() => {
                  setIsLoginMode(true);
                  setError("");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
