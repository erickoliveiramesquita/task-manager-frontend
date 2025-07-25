import { useEffect, useState } from "react";
import Login from "./Login";
import Home from "./Home";

const PageHandler = () => {
  const [name, setName] = useState("");
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
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          handleLogin={handleLogin}
        />
      ) : (
        <Home 
          email={email}
          name={name}
          handleLogout={handleLogout} 
        />
      )}
    </div>
  );
};

export default PageHandler;
