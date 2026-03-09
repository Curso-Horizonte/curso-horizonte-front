import React from "react";
import editar from "../../images/editar.png";
import remover from "../../images/remover.svg";
import styles from "./CardAlunoTable.module.css"

function CardAlunoTable({ aluno, disciplinas, onEdit, onDelete }) {
  return (
    <tr>
      <td>{aluno.id}</td>

      <td>{aluno.usuario?.nome || "—"}</td>

      <td>{aluno.usuario?.cpf || "—"}</td>

      <td>{aluno.usuario?.email || "—"}</td>

      <td>{disciplinas || "—"}</td>

      <td>
        <button className={styles.btn} onClick={onEdit}>
          <img src={editar}></img>
        </button>

        <button className={styles.btn} onClick={onDelete}>
          <img src={remover}></img>
        </button>
      </td>
    </tr>
  );
}

export default CardAlunoTable;
