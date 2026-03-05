import React, { useEffect, useState } from "react";
import styles from "./editarAluno.module.css";
import Alunos from "../../Service/Aluno";

function EditarAluno({ alunoId, onClose, onSaved }) {

    const isEditing = Boolean(alunoId);

    const [alunoData, setAlunoData] = useState({
        id: 0,
        usuario: {
            nome: "",
            sobrenome: "",
            cpf: "",
            email: "",
            roleId: 2,
            statusId: 1,
            criadoEm: new Date().toISOString()
        },
        matricula: ""
    });

    useEffect(() => {
        if (isEditing) {
            async function fetchAluno() {
                const data = await Alunos.getAlunoById(alunoId);
                if (data) {
                    setAlunoData(data);
                }
            }
            fetchAluno();
        }
    }, [alunoId, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await Alunos.updateAluno(alunoId, alunoData);
            } else {
                await Alunos.addAluno(alunoData);
            }

            if (onSaved) {
                await onSaved();
            }

        } catch (error) {
            alert("Erro ao salvar: " + error.message);
            console.error(error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2>{isEditing ? "Editar Aluno" : "Criar Aluno"}</h2>

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
                        value={alunoData.usuario.nome}
                        onChange={(e) =>
                            setAlunoData({
                                ...alunoData,
                                usuario: {
                                    ...alunoData.usuario,
                                    nome: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Sobrenome"
                        value={alunoData.usuario.sobrenome}
                        onChange={(e) =>
                            setAlunoData({
                                ...alunoData,
                                usuario: {
                                    ...alunoData.usuario,
                                    sobrenome: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="CPF"
                        value={alunoData.usuario.cpf}
                        onChange={(e) =>
                            setAlunoData({
                                ...alunoData,
                                usuario: {
                                    ...alunoData.usuario,
                                    cpf: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={alunoData.usuario.email}
                        onChange={(e) =>
                            setAlunoData({
                                ...alunoData,
                                usuario: {
                                    ...alunoData.usuario,
                                    email: e.target.value
                                }
                            })
                        }
                    />

                    <input
                        placeholder="Matrícula"
                        value={alunoData.matricula}
                        onChange={(e) =>
                            setAlunoData({
                                ...alunoData,
                                matricula: e.target.value
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

export default EditarAluno;