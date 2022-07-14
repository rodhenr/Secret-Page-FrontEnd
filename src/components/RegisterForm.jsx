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
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const request = await axios.post(url, data);

    if (request.status === 500)
      return setMsg({ erro: request.data.mensagem, sucesso: "" });

    if (request.data.mensagem === "Usuário já cadastrado")
      return setMsg({ erro: request.data.mensagem, sucesso: "" });

    setMsg({ erro: "", sucesso: "Usuário cadastrado com sucesso!" });
    setTimeout(setAuth, 3000);
  };

  return (
    <div className="auth-container">
      <h2>REGISTRE-SE</h2>
      {msg.erro}
      {msg.sucesso}
      <form className="form" onSubmit={registerUser}>
        <TextField
          id="username"
          label="Usuário"
          name="username"
          onChange={handleInput}
          type="text"
          value={data.username}
          variant="filled"
        />
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
        <button>REGISTRAR</button>
      </form>

      <p>
        Já possui uma conta? <span onClick={setAuth}>Faça Login!</span>
      </p>
    </div>
  );
}

export default RegisterForm;
