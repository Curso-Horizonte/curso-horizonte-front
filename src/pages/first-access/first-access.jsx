import "./first-access.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/img-login.jpg";
import infoIcon from "../../assets/info-icon.png";

function FirstAccess() {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="login-container">
        <img src={loginImage} alt="Pessoa mexendo no computador" />
        <div className="input-container">
          <h1>Primeiro Acesso</h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha enviada no email"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="access-container">
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </button>
            <span onClick={() => navigate("/")}>Voltar para login</span>
          </div>

          <div className="info-container">
            <img src={infoIcon} alt="Pessoa mexendo no computador" />
            <p>Essa é uma tela de primeiro acesso. Ao realizar o login, você deverá alterar sua senha inicial por uma nova de sua preferência para garantir a segurança da sua conta.</p>

          </div>
          {erro && <span className="erro-message">{erro}</span>}
        </div>
      </div>
    </>
  );
}

export default FirstAccess;