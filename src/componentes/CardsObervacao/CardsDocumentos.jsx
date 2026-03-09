import React from "react";
import styles from "./CardDocumento.module.css";

function CardDocumentos({ id, titulo, descricao, onClick }) {

    return (
        <div className={styles.card}>
            <h2>{titulo}</h2>
            <p>{descricao}</p>
        </div>
    );
}

export default CardDocumentos;