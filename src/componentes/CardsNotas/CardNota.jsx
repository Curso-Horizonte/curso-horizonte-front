import React from 'react';

function CardNota({ nota, onEdit, onDelete }) {
    return (
        <tr>
            <td>{nota.disciplinaNome}</td>
            <td>{nota.bimestre1}</td>
            <td>{nota.bimestre2}</td>
            <td>{nota.bimestre3}</td>
            <td>{nota.bimestre4}</td>
            <td>{nota.media}</td>
        </tr>
    );
}