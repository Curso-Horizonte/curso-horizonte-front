import "./login.css";
import { useState } from "react";
import loginImage from "../../assets/img-login.jpg";

function Login() {
  return (
    <>
      <div className="login-container">
        <img src={loginImage} alt="Pessoa mexendo no computador" />
        <div className="input-container">
          <h1>Comece sua Jornada!</h1>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <div className="access-container">
            <button>Login</button>
            <span>Primeiro Acesso</span>
          </div>  
        </div>
      </div>
    </>
  );
}

export default Login;
