import React, { useEffect, useState } from "react";
import Disciplina from "../../Service/Disciplina";
import styles from "./editarDisciplina.module.css";

function EditarDisciplina({ disciplinaId, onClose, onSaved }) {
    const isEditing = Boolean(disciplinaId);

    const [disciplinaData, setDisciplinaData] = useState({
        nome: ""
    });

    // Carrega dados da disciplina se for edição
    useEffect(() => {
        if (!isEditing) {
            setDisciplinaData({ nome: "" });
            return;
        }

        async function fetchDisciplina() {
            try {
                const data = await Disciplina.getDisciplinas();
                const atual = data.find(d => Number(d.id) === Number(disciplinaId));
                if (atual) {
                    setDisciplinaData({ nome: atual.nome });
                }
            } catch (error) {
                console.error("Erro ao buscar disciplina:", error);
            }
        }

        fetchDisciplina();
    }, [disciplinaId, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { nome: disciplinaData.nome.trim() };

            if (!payload.nome) {
                alert("O nome da disciplina é obrigatório.");
                return;
            }

            if (isEditing) {
                await Disciplina.updateDisciplina(disciplinaId, payload);
            } else {
                await Disciplina.addDisciplina(payload);
            }

            if (onSaved) await onSaved();
            onClose();

        } catch (error) {
            alert("Erro ao salvar disciplina: " + error.message);
            console.error(error);
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
                        type="text"
                        placeholder="Nome da Disciplina"
                        value={disciplinaData.nome}
                        onChange={(e) => setDisciplinaData({ ...disciplinaData, nome: e.target.value })}
                        required
                    />

                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={styles.btnCancelar}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSalvar}
                        >
                            {isEditing ? "Salvar Alterações" : "Criar Disciplina"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarDisciplina;