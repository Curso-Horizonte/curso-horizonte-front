import React from "react";
import styles from "./CardObervacao.module.css";

function CardObservacao({ id, titulo, descricao, onClick }) {

    return (
        <div className={styles.card} onClick={onClick}>
            <h2>{titulo}</h2>
            <p>{descricao}</p>
        </div>
    );
}

export default CardObservacao;