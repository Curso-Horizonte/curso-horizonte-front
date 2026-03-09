import React, { useEffect, useState } from "react";
import "../../components/modal/modal.css"; // shared modal styles
import Alunos from "../../Service/Aluno";
import Disciplina from "../../Service/Disciplina";
import AlunoDisciplina from "../../Service/AlunoDisciplina";

function EditarAluno({ alunoId, onClose, onSaved }) {
    const isEditing = Boolean(alunoId);
    const [disciplinas, setDisciplinas] = useState([]);
    const [vinculosOriginais, setVinculosOriginais] = useState([]);
    const [disciplinasSelecionadas, setDisciplinasSelecionadas] = useState([]);

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
        fetchDisciplinas();
        if (isEditing) {
            fetchAluno();
            fetchVinculos();
        }
    }, [alunoId]); // Adicionado alunoId como dependência por boa prática

    async function fetchDisciplinas() {
        try {
            const data = await Disciplina.getDisciplinas();
            setDisciplinas(data || []);
        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);
        }
    }

    async function fetchAluno() {
        try {
            const data = await Alunos.getAlunoById(alunoId);
            if (data) setAlunoData(data);
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
        }
    }

    async function fetchVinculos() {
        try {
            const data = await AlunoDisciplina.getAll();
            const doAluno = data.filter(v => v.alunoId === alunoId);
            setVinculosOriginais(doAluno);
            setDisciplinasSelecionadas(doAluno.map(v => v.disciplinaId));
        } catch (error) {
            console.error("Erro ao buscar vínculos:", error);
        }
    }

    function toggleDisciplina(disciplinaId) {
        setDisciplinasSelecionadas(prev =>
            prev.includes(disciplinaId)
                ? prev.filter(id => id !== disciplinaId)
                : [...prev, disciplinaId]
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let alunoFinalId;

            if (isEditing) {
                await Alunos.updateAluno(alunoId, alunoData);
                alunoFinalId = alunoId;
            } else {
                const alunoSalvo = await Alunos.addAluno(alunoData);
                
                // AJUSTE CRUCIAL: Verifica se o ID veio da API
                if (!alunoSalvo || !alunoSalvo.id) {
                    throw new Error("O servidor criou o aluno, mas não retornou o ID para vinculação de disciplinas.");
                }
                alunoFinalId = alunoSalvo.id;
            }

            // Lógica de Vínculos
            const disciplinasOriginaisIds = vinculosOriginais.map(v => v.disciplinaId);
            
            const paraAdicionar = disciplinasSelecionadas.filter(
                id => !disciplinasOriginaisIds.includes(id)
            );

            const paraRemover = vinculosOriginais.filter(
                v => !disciplinasSelecionadas.includes(v.disciplinaId)
            );

            // Processa adições
            for (const discId of paraAdicionar) {
                await AlunoDisciplina.vincular(alunoFinalId, discId);
            }

            // Processa remoções
            for (const vinculo of paraRemover) {
                await AlunoDisciplina.remover(vinculo.id);
            }

            if (onSaved) await onSaved();
            onClose();

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar: " + error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{isEditing ? "Editar Aluno" : "Criar Aluno"}</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <input 
                        placeholder="Nome" 
                        value={alunoData.usuario.nome} 
                        onChange={(e) => setAlunoData({...alunoData, usuario: {...alunoData.usuario, nome: e.target.value}})}
                        required 
                    />
                    <input 
                        placeholder="Sobrenome" 
                        value={alunoData.usuario.sobrenome} 
                        onChange={(e) => setAlunoData({...alunoData, usuario: {...alunoData.usuario, sobrenome: e.target.value}})}
                    />
                    <input 
                        placeholder="CPF" 
                        value={alunoData.usuario.cpf} 
                        onChange={(e) => setAlunoData({...alunoData, usuario: {...alunoData.usuario, cpf: e.target.value}})}
                    />
                    <input 
                        placeholder="Email" 
                        type="email"
                        value={alunoData.usuario.email} 
                        onChange={(e) => setAlunoData({...alunoData, usuario: {...alunoData.usuario, email: e.target.value}})}
                    />
                    <input 
                        placeholder="Matrícula" 
                        value={alunoData.matricula} 
                        onChange={(e) => setAlunoData({...alunoData, matricula: e.target.value})}
                    />

                    <div className={styles.disciplinasContainer}>
                        <label><strong>Disciplinas</strong></label>
                        {disciplinas.map(d => (
                            <label key={d.id} className={styles.checkboxLabel}>
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
                        <button type="button" className="modal-btn modal-btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="modal-btn modal-btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarAluno;