function CardProfessorTable({ professor, onEdit, onDelete }) {

    const disciplinas = professor.disciplinas
        ?.map(d => d.disciplinaNome)
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

                <button onClick={onEdit}>
                    ✏
                </button>

                <button onClick={onDelete}>
                    ⛔
                </button>

            </td>

        </tr>

    );
}

export default CardProfessorTable;