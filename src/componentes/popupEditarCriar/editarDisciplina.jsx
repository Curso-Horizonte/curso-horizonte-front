import React, { useEffect, useState } from "react";
import styles from "./editarAluno.module.css";
import Disciplina from "../../Service/Disciplina";

function EditarDisciplina({ disciplinaId, onClose, onSaved }) {

    const isEditing = Boolean(disciplinaId);

    const [disciplinaData, setDisciplinaData] = useState({
        id: 0,
        nome: ""
    });

    useEffect(() => {
        if (isEditing) {
            async function fetchDisciplina() {
                const data = await Disciplina.getDisciplinaById(disciplinaId);
                if (data) {
                    setDisciplinaData(data);
                }
            }
            fetchDisciplina();
        }
    }, [disciplinaId, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await Disciplina.updateDisciplina(disciplinaId, disciplinaData);
            } else {
                await Disciplina.addDisciplina(disciplinaData);
            }

            if (onSaved) {
                await onSaved();
            }

        } catch (error) {
            alert("Erro ao salvar: " + error.message);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2>{isEditing ? "Editar Disciplina" : "Criar Disciplina"}</h2>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>

                    <input
                        placeholder="Nome da Disciplina"
                        value={disciplinaData.nome}
                        onChange={(e) =>
                            setDisciplinaData({
                                ...disciplinaData,
                                nome: e.target.value
                            })
                        }
                    />

                    <div className={styles.buttons}>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit">
                            Salvar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditarDisciplina;