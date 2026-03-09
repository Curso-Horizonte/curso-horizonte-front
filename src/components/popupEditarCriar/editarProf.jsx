import React, { useEffect, useState } from "react";
import Professores from "../../Service/Professores";
import Disciplinas from "../../Service/Disciplina";
import ProfessorDisciplina from "../../Service/ProfessorDisciplina";
import styles from "./editarProf.module.css";

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

    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);
    const [vinculosExistentes, setVinculosExistentes] = useState([]);

    useEffect(() => {

        async function carregarDados() {

            const listaDisciplinas = await Disciplinas.getDisciplinas();
            setDisciplinas(listaDisciplinas);

            if (isEditing) {

                const prof = await Professores.getProfessorById(profId);
                setProfessorData(prof);

                const vinculos = await ProfessorDisciplina.getProfessorbydisciplina(profId);

                setVinculosExistentes(vinculos);

                setDisciplinasSelecionadas(
                    vinculos.map(v => v.disciplinaId)
                );
            }
        }

        carregarDados();

    }, [profId]);

    function toggleDisciplina(id) {

        if (disciplinasSelecionadas.includes(id)) {

            setDisciplinasSelecionadas(
                disciplinasSelecionadas.filter(d => d !== id)
            );

        } else {

            setDisciplinasSelecionadas(
                [...disciplinasSelecionadas, id]
            );
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let professorId = profId;

        if (isEditing) {

            await Professores.updateProfessor(profId, professorData);

        } else {

            const novo = await Professores.addProfessor(professorData);
            professorId = novo.id;
        }

        const disciplinasAntigas = vinculosExistentes.map(v => v.disciplinaId);

        const paraAdicionar = disciplinasSelecionadas.filter(
            id => !disciplinasAntigas.includes(id)
        );

        const paraRemover = vinculosExistentes.filter(
            v => !disciplinasSelecionadas.includes(v.disciplinaId)
        );

        for (const id of paraAdicionar) {

            await ProfessorDisciplina.vincular(professorId, id);
        }

        for (const v of paraRemover) {

            await ProfessorDisciplina.remover(v.id);
        }

        onSaved();
    };

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>{isEditing ? "Editar Professor" : "Criar Professor"}</h2>

                <form onSubmit={handleSubmit}>

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

                    <h3>Disciplinas</h3>

                    <div className={styles.disciplinasBox}>

                        {disciplinas.map(d => (

                            <label key={d.id}>

                                <input
                                    type="checkbox"
                                    checked={disciplinasSelecionadas.includes(d.id)}
                                    onChange={() => toggleDisciplina(d.id)}
                                />

                                {d.nome}

                            </label>

                        ))}

                    </div>

                    <div className={styles.modalButtons}>

                        <button type="submit">
                            Salvar
                        </button>

                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditarProf;