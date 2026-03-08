import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/img-login.jpg";
import infoIcon from "../../assets/info-icon.png";
import axios from "axios";
import API_BASE_URL from "../../config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      redirectByRole(userData.roleId);
    }
  }, []);

  const redirectByRole = (roleId) => {
    if (roleId === 2) {
      navigate("/teachers");
    } else if (roleId === 3) {
      console.log("Tela do aluno ainda não implementada");
    } else if (roleId === 1) {
      console.log("Tela do admin ainda não implementada");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/usuario/login`, {
        email,
        senha,
      });
      if (response.status === 200) {
        const { usuario, primeiroLogin } = response.data;
        
        const userData = {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
          cpf: usuario.cpf,
          roleId: usuario.roleId,
          statusId: usuario.statusId,
          criadoEm: usuario.criadoEm,
          primeiroLogin: primeiroLogin,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        if (primeiroLogin === true) {
          navigate("/change-password");
        } else {
          redirectByRole(usuario.roleId);
        }
      }
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
          </div>

          <div className="info-container">
            <img src={infoIcon} alt="Informação" />
            <p>Se este é seu primeiro acesso, utilize a senha enviada no seu email para entrar.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;