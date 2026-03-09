import LogoImage from "../../assets/logo_horizonte.png";
import "./header.css";

function HeaderComponent() {
  return (
    <header className="header-container">
      <img src={LogoImage} alt="Logo do Curso Horizonte" className="logo" />
    </header>
  );
}

export default HeaderComponent;