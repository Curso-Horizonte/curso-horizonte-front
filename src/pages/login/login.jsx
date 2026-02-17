import "./login.css";
import { useState } from "react";
import loginImage from "../../assets/img-login.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await fetch("https://api.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Email ou senha inválidos.");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      console.log("Login realizado com sucesso:", data);

    } catch (error) {
      setErro(error.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrimeiroAcesso = () => {
    console.log("Primeiro acesso clicado");
  };

  return (
    <>
      <div className="login-container">
        <img src={loginImage} alt="Pessoa mexendo no computador" />
        <div className="input-container">
          <h1>Comece sua Jornada!</h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <span className="erro-message">{erro}</span>}

          <div className="access-container">
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </button>
            <span onClick={handlePrimeiroAcesso}>Primeiro Acesso</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;