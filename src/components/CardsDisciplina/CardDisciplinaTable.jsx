import React from 'react';
import editar from "../../images/editar.png";
import remover from "../../images/remover.svg";
import styles from "./CardDisciplinaTable.module.css"

function CardDisciplinaTable({ disciplina, onEdit, onDelete }) {
    return (
        <tr>
            <td>{disciplina.id}</td>
            <td>{disciplina.nome || "—"}</td>
            
            <td>
                <button className={styles.btn} onClick={onEdit} title="Editar">
                    <img src={editar}></img>
                </button>
                <button className={styles.btn} onClick={onDelete} title="Excluir">
                    <img src={remover}></img>
                </button>
            </td>
        </tr>
    );
}

export default CardDisciplinaTable;