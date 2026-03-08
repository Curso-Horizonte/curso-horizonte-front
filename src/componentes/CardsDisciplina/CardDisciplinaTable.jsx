import React from 'react';

function CardDisciplinaTable({ disciplina, onEdit, onDelete }) {
    return (
        <tr>
            <td>{disciplina.id}</td>
            <td>{disciplina.nome || "—"}</td>
            
            <td>
                <button className="btnEditar" onClick={onEdit} title="Editar">✏</button>
                <button className="btnExcluir" onClick={onDelete} title="Excluir">⛔</button>
            </td>
        </tr>
    );
}

export default CardDisciplinaTable;