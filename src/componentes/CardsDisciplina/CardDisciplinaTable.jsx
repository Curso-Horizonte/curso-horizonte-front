function CardDisciplinaTable({ disciplina, onEdit, onDelete }) {
    return (
        <tr>
            <td>{disciplina.id}</td>
            <td>{disciplina.nomeCompleto}</td>
            <td>{disciplina.cpf}</td>
            <td>{disciplina.email}</td>
            <td>{disciplina.registroFuncional}</td>
            <td>
                <button onClick={onEdit}>✏</button>
                <button onClick={onDelete}>⛔</button>
            </td>
        </tr>
    );
}

export default CardDisciplinaTable;