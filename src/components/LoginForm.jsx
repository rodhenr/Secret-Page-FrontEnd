import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "../styles/auth.scss";

function LoginForm({ setAuth }) {
  const [data, setData] = useState({ email: "", password: "" });
  const url = "http://localhost:8080/auth/login";

  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const request = await axios.post(url, data);

    console.log(request);
  };

  return (
    <div className="auth-container" onSubmit={handleLogin}>
      <h2>LOGIN</h2>
      <form className="form">
        <TextField
          id="email"
          label="E-Mail"
          name="email"
          onChange={handleInput}
          type="email"
          value={data.email}
          variant="filled"
        />
        <TextField
          id="password"
          label="Senha"
          name="password"
          onChange={handleInput}
          type="password"
          value={data.password}
          variant="filled"
        />
        <button>ENTRAR</button>
      </form>

      <p>
        Não possui uma conta? <span onClick={setAuth}>Registre-se!</span>
      </p>
    </div>
  );
}

export default LoginForm;
