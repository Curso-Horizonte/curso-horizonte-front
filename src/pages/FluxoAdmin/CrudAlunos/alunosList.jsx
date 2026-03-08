import { useEffect, useState, useMemo } from "react";
import TopBar from "../../../componentes/elementos/topBar";
import Alunos from "../../../Service/Aluno";
import AlunoDisciplina from "../../../Service/AlunoDisciplina";
import CardAlunoTable from "../../../componentes/CardsAlunos/CardAlunoTable";
import EditarAluno from "../../../componentes/popupEditarCriar/editarAluno";
import styles from "./alunoList.module.css";

function AlunosList() {

    const [alunos, setAlunos] = useState([]);
    const [vinculos, setVinculos] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

    async function fetchData() {

        try {

            const alunosData = await Alunos.getAlunos();
            const vinculosData = await AlunoDisciplina.getAll();

            setAlunos(Array.isArray(alunosData) ? alunosData : []);
            setVinculos(Array.isArray(vinculosData) ? vinculosData : []);

        } catch (error) {

            console.error("Erro ao carregar dados:", error);

        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const alunosFiltrados = useMemo(() => {

        let lista = [...alunos];

        if (searchText) {

            lista = lista.filter(aluno =>
                aluno.usuario?.nome?.toLowerCase().includes(searchText.toLowerCase()) ||
                aluno.usuario?.email?.toLowerCase().includes(searchText.toLowerCase())
            );

        }

        return lista;

    }, [alunos, searchText]);

    function disciplinasDoAluno(alunoId) {

        const disciplinas = vinculos
            .filter(v => v.alunoId === alunoId)
            .map(v => v.disciplinaNome);

        return disciplinas.join(", ");

    }

    const handleDeleteAluno = async (alunoId) => {

        try {

            await Alunos.deleteAluno(alunoId);

            setAlunos(prev =>
                prev.filter(aluno => aluno.id !== alunoId)
            );

        } catch (error) {

            console.error("Erro ao excluir aluno:", error);

        }

    };

    const handleAddAluno = () => {

        setAlunoSelecionado(null);
        setModalOpen(true);

    };

    const handleEditAluno = (alunoId) => {

        setAlunoSelecionado(alunoId);
        setModalOpen(true);

    };

    const handleCloseModal = () => {

        setModalOpen(false);
        setAlunoSelecionado(null);

    };

    const handleSaved = async () => {

        await fetchData();
        handleCloseModal();

    };

    return (
        <>
            <TopBar />

            <header className={styles.profList}>
                <div className={styles.tituloPage}>
                    <h1>Lista de Alunos</h1>
                    <p>Visualize, adicione e edite seus alunos.</p>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.containerTable}>

                    <div className={styles.tabelaActions}>

                        <div className={styles.buscarAluno}>
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                className={styles.inputBuscar}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        <button
                            className={styles.btnAdicionar}
                            onClick={handleAddAluno}
                        >
                            + Adicionar Aluno
                        </button>

                    </div>

                    <div className={styles.tableWrapper}>

                        <table className={styles.table}>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Email</th>
                                    <th>Disciplinas</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {alunosFiltrados.map(aluno => (

                                    <CardAlunoTable
                                        key={aluno.id}
                                        aluno={aluno}
                                        disciplinas={disciplinasDoAluno(aluno.id)}
                                        onEdit={() => handleEditAluno(aluno.id)}
                                        onDelete={() => handleDeleteAluno(aluno.id)}
                                    />

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            </main>

            {modalOpen && (

                <EditarAluno
                    alunoId={alunoSelecionado}
                    onClose={handleCloseModal}
                    onSaved={handleSaved}
                />

            )}
        </>
    );
}

export default AlunosList;