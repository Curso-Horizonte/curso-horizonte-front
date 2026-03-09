import React, { useState, useEffect } from "react";
import "./modal.css";
import API_BASE_URL from "../../config";
import axios from "axios";

function Modal({ type, student, teacher, document, onClose, onSave, onSuccess }) {
  const [docTitle, setDocTitle] = useState(document?.titulo || document?.title || "");
  const [docContent, setDocContent] = useState(document?.conteudo || document?.content || "");
  const [gradeValue, setGradeValue] = useState(student?.grade || "");
  const [gradeDescription, setGradeDescription] = useState(student?.descricao || "");
  const [observationText, setObservationText] = useState("");
  const [existingObservations, setExistingObservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const addNota = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        alunoDisciplinaId: student?.alunoDisciplinaId,
        professorId: user?.professorId,
        valor: Number(gradeValue),
        descricao: gradeDescription,
        bimestre: student?.bimestre,
      };

      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/nota`, payload);
      if (response.status === 200 || response.status === 201) {
        alert("Nota lançada com sucesso!");
        return true;
      } else {
        alert("Erro ao lançar nota. Tente novamente.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao lançar nota:", error);
      alert("Erro ao lançar nota. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editNota = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        alunoDisciplinaId: student?.alunoDisciplinaId,
        professorId: user?.professorId,
        valor: Number(gradeValue),
        descricao: gradeDescription,
        bimestre: student?.bimestre,
      };

      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/api/nota/${student?.notaId}`,
        payload
      );
      if (response.status === 201) {
        alert("Nota atualizada com sucesso!");
        return true;
      } else {
        alert("Erro ao atualizar nota. Tente novamente.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      alert("Erro ao atualizar nota. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addObservacao = async (body) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        alunoId: student?.id,
        disciplinaId: student?.disciplinaId,
        professorId: user?.professorId,
        texto: body.texto,
      };

      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/observacao`,
        payload,
      );
      if (response.status === 200) {
        alert("Observação adicionada com sucesso!");
        return true;
      } else {
        alert("Erro ao adicionar observação. Tente novamente.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao adicionar observação:", error);
      alert("Erro ao adicionar observação. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addDocumentos = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/documento/add`, {
        titulo: docTitle,
        conteudo: docContent,
        professorDisciplinaId: teacher?.professorDisciplinaId,
      });
      if (response.status === 200) {
        alert("Documento adicionado com sucesso!");
        return true;
      } else {
        alert("Erro ao adicionar documento. Tente novamente.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
      alert("Erro ao adicionar documento. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editDocumentos = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`${API_BASE_URL}/api/documento/update/${document?.id}`, {
        id: document?.id,
        titulo: docTitle,
        conteudo: docContent,
        professorDisciplinaId: teacher?.professorDisciplinaId,
      });
      if (response.status === 200) {
        alert("Documento atualizado com sucesso!");
        return true;
      }
    } catch (error) {
      console.error("Erro ao editar documento:", error);
      alert("Erro ao editar documento. Tente novamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getObservacoes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/observacao`);

        const filtered = response.data.filter((obs) => {
          return (
            obs.alunoId === student.id &&
            obs.disciplinaId === student.disciplinaId
          );
        });

        return filtered;
      } catch (error) {
        console.error("Erro ao buscar observações:", error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    if (type === "addObservation" && student?.id) {
      getObservacoes().then((data) => {
        setExistingObservations(data);
      });
    }
  }, [type, student?.id, student?.disciplinaId]);

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
        <>
          <div className="modal-field">
            <label>{student?.bimestreLabel}</label>
            <input
              type="number"
              className="modal-input"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
          <div className="modal-field">
            <label htmlFor="grade-desc">Descrição</label>
            <textarea
              id="grade-desc"
              className="modal-textarea"
              value={gradeDescription}
              onChange={(e) => setGradeDescription(e.target.value)}
              placeholder="Ex: Prova, Trabalho, Participação..."
            />
          </div>
        </>
      );
      break;
    case "launchGrade":
      title = `Lançar Nota - ${student?.name || ""}`;
      bodyContent = (
        <>
          <div className="modal-field">
            <label>{student?.bimestreLabel}</label>
            <input
              type="number"
              className="modal-input"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
          <div className="modal-field">
            <label htmlFor="grade-desc">Descrição</label>
            <textarea
              id="grade-desc"
              className="modal-textarea"
              value={gradeDescription}
              onChange={(e) => setGradeDescription(e.target.value)}
              placeholder="Ex: Prova, Trabalho, Participação..."
            />
          </div>
        </>
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
                    <span>{obs.texto}</span>
                    <div style={{ padding: "4px" }}></div>
                    <small className="obs-date">
                      {new Date(obs.data).toLocaleString()}
                    </small>
                    <div style={{ padding: "4px" }}></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

  const handleSave = async () => {
    let data = null;
    switch (type) {
      case "addDocument":
        if (docTitle.trim() && docContent.trim()) {
          const success = await addDocumentos();
          if (success) {
            if (onSuccess) onSuccess();
            onClose();
          }
        } else {
          alert("Por favor, preencha o título e o conteúdo do documento.");
        }
        return;
      case "editDocument":
        if (docTitle.trim() && docContent.trim()) {
          const success = await editDocumentos();
          if (success) {
            if (onSuccess) onSuccess();
            onClose();
          }
        } else {
          alert("Por favor, preencha o título e o conteúdo do documento.");
        }
        return;
      case "editGrade":
        if (gradeValue !== "" && gradeValue !== null) {
          const success = await editNota();
          if (success) {
            if (onSuccess) onSuccess();
            onClose();
          }
        } else {
          alert("Por favor, insira o valor da nota.");
        }
        return;
      case "launchGrade":
        if (gradeValue !== "" && gradeValue !== null) {
          const success = await addNota();
          if (success) {
            if (onSuccess) onSuccess();
            onClose();
          }
        } else {
          alert("Por favor, insira o valor da nota.");
        }
        return;
      case "addObservation":
        if (observationText.trim()) {
          const success = await addObservacao({ texto: observationText });
          if (success) {
            onClose();
          }
        } else {
          alert("Por favor, insira o texto da observação.");
        }
        return;
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
          <button className="modal-btn modal-btn-cancel" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button className="modal-btn modal-btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
