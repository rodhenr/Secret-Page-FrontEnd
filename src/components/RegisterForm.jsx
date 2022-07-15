import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "../styles/auth.scss";

function RegisterForm({ setAuth }) {
  const [msg, setMsg] = useState({ erro: "", sucesso: "" });
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const url = "http://localhost:8080/auth/register";

  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setMsg({ erro: "", sucesso: "" });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(url, data);
      setMsg({ erro: "", sucesso: "Usuário cadastrado com sucesso!" });
      setTimeout(setAuth, 2000);
    } catch (err) {
      const errCode = err.request.status;
      if (errCode === 400 || errCode === 409 || errCode === 500)
        return setMsg({ erro: err.response.data, sucesso: "" });
    }
  };

  return (
    <div className="auth-container">
      <h2>REGISTRE-SE</h2>
      <div className="registro-msg-erro">
        <span>{msg.erro}</span>
      </div>
      <div className="registro-msg-sucesso">
        <span>{msg.sucesso}</span>
      </div>

      <form className="form" onSubmit={registerUser}>
        <TextField
          id="username"
          label="Usuário"
          name="username"
          onChange={handleInput}
          required
          type="text"
          value={data.username}
          variant="filled"
        />
        <TextField
          id="email"
          label="E-Mail"
          name="email"
          onChange={handleInput}
          required
          type="email"
          value={data.email}
          variant="filled"
        />
        <TextField
          id="password"
          label="Senha"
          name="password"
          onChange={handleInput}
          required
          type="password"
          value={data.password}
          variant="filled"
        />
        <button>REGISTRAR</button>
      </form>

      <p>
        Já possui uma conta? <span onClick={setAuth}>Faça Login!</span>
      </p>
    </div>
  );
}

export default RegisterForm;
