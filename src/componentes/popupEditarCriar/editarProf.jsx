import React, { useEffect, useState } from "react";
import styles from "./editarProf.module.css";
import Professores from "../../Service/Professores";

function EditarProf({ profId, onClose, onSaved }) {

    const isEditing = Boolean(profId);

    const [professorData, setProfessorData] = useState({
        usuario: {
            nome: "",
            sobrenome: "",
            cpf: "",
            email: ""
        },
        registroFuncional: ""
    });

    useEffect(() => {
        if (isEditing) {
            async function fetchProfessor() {
                const data = await Professores.getProfessorById(profId);
                if (data) setProfessorData(data);
            }
            fetchProfessor();
        }
    }, [profId, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await Professores.updateProfessor(profId, professorData);
            } else {
                await Professores.addProfessor(professorData);
            }

            // 🔥 Atualiza lista e fecha modal
            if (onSaved) {
                await onSaved();
            }

        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2>
                        {isEditing ? "Editar Professor" : "Criar Professor"}
                    </h2>

                    {/* Botão X */}
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
                        placeholder="Nome"
                        value={professorData.usuario.nome}
                        onChange={(e) =>
                            setProfessorData({
                                ...professorData,
                                usuario: {
                                    ...professorData.usuario,
                                    nome: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Sobrenome"
                        value={professorData.usuario.sobrenome}
                        onChange={(e) =>
                            setProfessorData({
                                ...professorData,
                                usuario: {
                                    ...professorData.usuario,
                                    sobrenome: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="CPF"
                        value={professorData.usuario.cpf}
                        onChange={(e) =>
                            setProfessorData({
                                ...professorData,
                                usuario: {
                                    ...professorData.usuario,
                                    cpf: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={professorData.usuario.email}
                        onChange={(e) =>
                            setProfessorData({
                                ...professorData,
                                usuario: {
                                    ...professorData.usuario,
                                    email: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Registro Funcional"
                        value={professorData.registroFuncional}
                        onChange={(e) =>
                            setProfessorData({
                                ...professorData,
                                registroFuncional: e.target.value
                            })
                        }
                    />

                    <div className={styles.buttons}>
                        <button
                            type="button"
                            onClick={onClose}
                        >
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

export default EditarProf;