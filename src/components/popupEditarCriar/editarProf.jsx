import React, { useEffect, useState } from "react";
import "../../components/modal/modal.css";
import Professores from "../../Service/Professores";
import Disciplinas from "../../Service/Disciplina";
import ProfessorDisciplina from "../../Service/ProfessorDisciplina";

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

        <div className="modal-overlay">

            <div className="modal-container">

                <div className="modal-header">
                    <h2 className="modal-title">{isEditing ? "Editar Professor" : "Criar Professor"}</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">

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

                    <div className="modal-field disciplinas-container">

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

                    <div className="modal-footer">

                        <button type="button" className="modal-btn modal-btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="modal-btn modal-btn-primary">
                            Salvar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditarProf;