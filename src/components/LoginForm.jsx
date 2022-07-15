import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToken } from "../store/slices/tokenSlice";
import { useNavigate } from "react-router-dom";
import "../styles/auth.scss";

function LoginForm({ setAuth }) {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:8080/auth/login";

  const handleInput = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post(url, data, { withCredentials: true });
      dispatch(addToken(request.data.accessToken));
      setData({ email: "", password: "" });
      navigate("/secret");
    } catch (err) {
      setMsg(err.request.response);
    }
  };

  return (
    <div className="auth-container" onSubmit={handleLogin}>
      <h2>LOGIN</h2>
      {msg}
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
