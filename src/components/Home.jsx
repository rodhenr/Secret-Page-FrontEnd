import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/home.scss";
import { useState } from "react";

function Home() {
  const [auth, setAuth] = useState(true);

  const handleAuth = () => {
    setAuth(!auth);
  };

  return (
    <div className="home-container">
      <div className="title">
        <h2>Quer descobrir o segredo da página? Faça login :)</h2>
      </div>

      {auth ? (
        <LoginForm setAuth={handleAuth} />
      ) : (
        <RegisterForm setAuth={handleAuth} />
      )}
    </div>
  );
}

export default Home;
