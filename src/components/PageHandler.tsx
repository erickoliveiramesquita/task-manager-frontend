import { useEffect, useState } from "react";
import Login from "./Login";
import Home from "./Home";

const PageHandler = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("loggedInEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string) => {
    setEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInEmail", email);
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInEmail");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {!isLoggedIn ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          handleLogin={handleLogin}
        />
        /*<Login onLogin={handleLogin} />*/
      ) : (
        <Home email={email} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default PageHandler;
