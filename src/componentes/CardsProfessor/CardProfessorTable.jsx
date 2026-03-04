function CardProfessorTable({ professor, onEdit, onDelete }) {
    return (
        <tr>
            <td>{professor.id}</td>
            <td>{professor.nomeCompleto}</td>
            <td>{professor.cpf}</td>
            <td>{professor.email}</td>
            <td>{professor.registroFuncional}</td>
            <td>
                <button onClick={onEdit}>✏</button>
                <button onClick={onDelete}>⛔</button>
            </td>
        </tr>
    );
}

export default CardProfessorTable;