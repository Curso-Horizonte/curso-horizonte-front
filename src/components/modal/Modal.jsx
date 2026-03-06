import React, { useState, useEffect } from "react";
import "./modal.css";
import API_BASE_URL from "../../config";

function Modal({ type, student, document, onClose, onSave }) {
  const [docTitle, setDocTitle] = useState(document?.title || "");
  const [docContent, setDocContent] = useState(document?.content || "");
  const [gradeValue, setGradeValue] = useState(student?.grade || "");
  const [observationType, setObservationType] = useState("Elogio");
  const [observationText, setObservationText] = useState("");
  const [existingObservations, setExistingObservations] = useState([]);

  useEffect(() => {
    const getObservacoes = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/api/observacao`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar observações:", error);
        throw error;
      }
    };

    if (type === "addObservation" && student?.id) {
      getObservacoes(student.id)
        .then((data) => {
          setExistingObservations(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar observações:", error);
        });
    }
  }, [type, student?.id]);

  let title = "";
  let bodyContent = null;

  switch (type) {
    case "addDocument":
      title = "Adicionar Documento";
      bodyContent = (
        <>
          <div className="modal-field">
            <label htmlFor="doc-title">Título</label>
            <input
              id="doc-title"
              className="modal-input"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label htmlFor="doc-content">Conteúdo</label>
            <textarea
              id="doc-content"
              className="modal-textarea"
              value={docContent}
              onChange={(e) => setDocContent(e.target.value)}
            />
          </div>
        </>
      );
      break;
    case "editDocument":
      title = "Editar Documento";
      bodyContent = (
        <>
          <div className="modal-field">
            <label htmlFor="doc-title">Título</label>
            <input
              id="doc-title"
              className="modal-input"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label htmlFor="doc-content">Conteúdo</label>
            <textarea
              id="doc-content"
              className="modal-textarea"
              value={docContent}
              onChange={(e) => setDocContent(e.target.value)}
            />
          </div>
        </>
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
            value={gradeValue}
            onChange={(e) => setGradeValue(e.target.value)}
          />
        </div>
      );
      break;
    case "launchGrade":
      title = `Lançar Nota - ${student?.name || ""}`;
      bodyContent = (
        <div className="modal-field">
          <label>{student?.nextBim}</label>
          <input
            type="number"
            className="modal-input"
            value={gradeValue}
            onChange={(e) => setGradeValue(e.target.value)}
          />
        </div>
      );
      break;
    case "addObservation":
      title = `Adicionar Observação - ${student?.name || ""}`;
      bodyContent = (
        <>
          {existingObservations.length > 0 && (
            <div className="modal-field">
              <label>Observações Existentes</label>
              <ul>
                {existingObservations.map((obs, index) => (
                  <li key={index}>
                    <span>{obs.text}</span>
                    <small className="obs-date">
                      {new Date(obs.data).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="modal-field modal-select-wrapper">
            <label htmlFor="obs-type">Tipo</label>
            <select
              id="obs-type"
              className="modal-input modal-select"
              value={observationType}
              onChange={(e) => setObservationType(e.target.value)}
            >
              <option>Elogio</option>
              <option>Advertencia</option>
              <option>Orientação</option>
            </select>
          </div>
          <div className="modal-field">
            <label htmlFor="obs-text">Texto da Observação</label>
            <textarea
              id="obs-text"
              className="modal-textarea"
              value={observationText}
              onChange={(e) => setObservationText(e.target.value)}
            />
          </div>
        </>
      );
      break;
    default:
      title = "";
  }

  const handleSave = () => {
    let data = null;
    switch (type) {
      case "addDocument":
        data = { title: docTitle, content: docContent };
        break;
      case "editDocument":
        data = { ...document, title: docTitle, content: docContent };
        break;
      case "editGrade":
        data = { student, grade: gradeValue };
        break;
      case "launchGrade":
        data = { student, grade: gradeValue };
        break;
      case "addObservation":
        data = { student, type: observationType, text: observationText };
        break;
      default:
        break;
    }

    if (onSave) {
      onSave(data);
    }
  };

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
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn modal-btn-save" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
