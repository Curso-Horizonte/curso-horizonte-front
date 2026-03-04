import styles from "./topBar.module.css";
import logo from "../../images/logoEscola.svg";
function TopBar() {
    return (
        <div className={styles.topBar}>
            <img src={logo} alt="Logo da Escola" className={styles.logo} />
        </div>
    );
}

export default TopBar;