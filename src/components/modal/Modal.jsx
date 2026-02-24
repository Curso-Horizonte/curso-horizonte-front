import React from "react";
import "./modal.css";

function Modal({ type, student, document, onClose, onSave }) {
  let title = "";
  let bodyContent = null;

  switch (type) {
    case "addDocument":
      title = "Adicionar Documento";
      bodyContent = (
        <div className="modal-field">
          <label htmlFor="doc-title">Título</label>
          <input id="doc-title" className="modal-input" />
        </div>
      );
      break;
    case "editDocument":
      title = "Editar Documento";
      bodyContent = (
        <div className="modal-field">
          <label htmlFor="doc-title">Título</label>
          <input
            id="doc-title"
            className="modal-input"
            defaultValue={document?.title}
          />
        </div>
      );
      break;
    case "editGrade":
      title = `Editar Nota - ${student?.name || ""}`;
      bodyContent = (
        <div className="modal-field">
          <label>{student?.bimestre}</label>
          <input
            type="number"
            className="modal-input"
            defaultValue={student?.grade}
          />
        </div>
      );
      break;
    case "launchGrade":
      title = `Lançar Nota - ${student?.name || ""}`;
      bodyContent = (
        <div className="modal-field">
          <label>{student?.nextBim}</label>
          <input type="number" className="modal-input" />
        </div>
      );
      break;
    case "addObservation":
      title = `Adicionar Observação - ${student?.name || ""}`;
      bodyContent = (
        <div className="modal-field">
          <textarea className="modal-textarea" />
        </div>
      );
      break;
    default:
      title = "";
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">{bodyContent}</div>

        <div className="modal-footer">
          <button
            className="modal-btn modal-btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="modal-btn modal-btn-save"
            onClick={onSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
