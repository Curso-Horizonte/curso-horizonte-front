import react  from 'react';
import styles from "./CardAlunoMateria.module.css";

function CardAlunoMateria({ id, nome, professor, onClick }) {

    return (
        <div className={styles.card} onClick={onClick}>
            <h2>{nome}</h2>
            <p>Professor: {professor}</p>
        </div>
    );
}

export default CardAlunoMateria;