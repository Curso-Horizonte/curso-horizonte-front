import React from 'react';

function CardAlunoTable({ aluno, onEdit, onDelete }) {

    return (
        <tr>
            <td>{aluno.id}</td>
            <td>{aluno.usuario.nome || "—"}</td>
            <td>{aluno.usuario.cpf || "—"}</td>
            <td>{aluno.usuario.email || "—"}</td>
            <td>
                <button className="btnEditar" onClick={onEdit}>
                    ✏
                </button>

                <button className="btnExcluir" onClick={onDelete}>
                    ⛔
                </button>
            </td>
        </tr> 
    );
}

export default CardAlunoTable;