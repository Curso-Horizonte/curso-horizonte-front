import React from "react";
import styles from "./CardDocumento.module.css";

function CardDocumentos({ id, titulo, descricao, onClick }) {

    return (
        <div className={styles.card} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
            <h2>{titulo}</h2>
            <p className={styles.descricaoPreview}>{descricao?.length > 100 ? descricao.substring(0, 100) + "..." : descricao}</p>
            {onClick && <span className={styles.verMais}>Clique para ver mais</span>}
        </div>
    );
}

export default CardDocumentos;