import { TextField } from "@mui/material";
import "../styles/auth.scss";

function RegisterForm({ setAuth }) {
  return (
    <div className="auth-container">
      <h2>REGISTRE-SE</h2>
      <form className="form">
        <TextField id="username" type="text" label="Usuário" variant="filled" />
        <TextField id="email" type="email" label="E-Mail" variant="filled" />
        <TextField
          id="password"
          type="password"
          label="Senha"
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
