import React from "react";

function CardDocumentos({ id, titulo, descricao, onClick }) {

    return (
        <div className={styles.card}>
            <h2>{titulo}</h2>
            <button onClick={onClick}>Abrir documento</button>
        </div>
    );
}

export default CardDocumentos;