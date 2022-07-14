import { TextField } from "@mui/material";
import "../styles/auth.scss";

function LoginForm({ setAuth }) {
  return (
    <div className="auth-container">
      <h2>LOGIN</h2>
      <form className="form">
        <TextField id="email" type="email" label="E-Mail" variant="filled" />
        <TextField
          id="password"
          type="password"
          label="Senha"
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
