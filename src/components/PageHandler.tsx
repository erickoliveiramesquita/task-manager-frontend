import { useEffect, useState } from "react";
import Login from "./Login";
import Home from "./Home";

const PageHandler = () => {
  const [name, setName] = useState(""); // name of the user
  const [email, setEmail] = useState(""); // email of the user
  const [password, setPassword] = useState(""); // password of the user in the form only
  const [error, setError] = useState(""); // error/message shown above login form
  const [isLoggedIn, setIsLoggedIn] = useState(false); // checks if its logged in or not

  // checks once the page has loaded if there's email and name in local storage (needs to change to check the token only)
  useEffect(() => {
    const savedEmail = localStorage.getItem("loggedInEmail");
    const savedName = localStorage.getItem("loggedInName");
    if (savedEmail && savedName) {
      setEmail(savedEmail);
      setName(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  // function to handle login setting local storage (needs to change for token)
  const handleLogin = (email: string, name: string) => {
    setEmail(email);
    setName(name);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("loggedInName", name);
  };

  // handles logout removing items in local storage (needs to change for token)
  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setName("");
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedInName");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/*if it's not in login, go to login page. Otherwise goes to homepage*/}
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
