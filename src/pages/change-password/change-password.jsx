import "../login/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/img-login.jpg";
import infoIcon from "../../assets/info-icon.png";
import axios from "axios";
import API_BASE_URL from "../../config";

function ChangePassword() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      const response = await axios.put(`${API_BASE_URL}/api/usuario/${user.id}/update/senha`, {
        novaSenha: senha,
      });

      if (response.status === 200) {
        user.primeiroLogin = false;
        localStorage.setItem("user", JSON.stringify(user));
        
        alert("Senha alterada com sucesso!");
        
        if (user.roleId === 2) {
          navigate("/teachers");
        } else if (user.roleId === 3) {
          navigate("/");
        } else if (user.roleId === 1) {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setErro(error.response?.data?.message || error.message || "Erro ao alterar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <img src={loginImage} alt="Pessoa mexendo no computador" />
        <div className="input-container">
          <h1>Alterar Senha</h1>

          <input
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />

          {erro && <span className="erro-message">{erro}</span>}

          <div className="access-container">
            <button onClick={handleChangePassword} disabled={loading}>
              {loading ? "Alterando..." : "Alterar Senha"}
            </button>
          </div>

          <div className="info-container">
            <img src={infoIcon} alt="Informação" />
            <p>Por ser seu primeiro acesso, você precisa criar uma nova senha para garantir a segurança da sua conta.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;