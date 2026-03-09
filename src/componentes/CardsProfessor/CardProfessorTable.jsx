import editar from "../../images/editar.png";
import remover from "../../images/remover.svg";
import styles from "./CardProfessorTable.module.css"

function CardProfessorTable({ professor, onEdit, onDelete }) {
  const disciplinas = professor.disciplinas
    ?.map((d) => d.disciplinaNome)
    .join(", ");

  return (
    <tr>
      <td>{professor.id}</td>

      <td>{professor.nomeCompleto}</td>

      <td>{professor.cpf}</td>

      <td>{professor.email}</td>

      <td>{professor.registroFuncional}</td>

      <td>{disciplinas || "-"}</td>

      <td>
        <button onClick={onEdit} className={styles.btn}>
          <img src={editar}></img>
        </button>

        <button onClick={onDelete} className={styles.btn}>
          <img src={remover}></img>
        </button>
      </td>
    </tr>
  );
}

export default CardProfessorTable;
