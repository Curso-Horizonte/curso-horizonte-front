import React from "react";
import styles from "./alunoList.module.css";
import TopBar from "../../../componentes/elementos/topBar";


function AlunosList() {

     const navigate = useNavigate();
    const [alunos, setAlunos] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function fetchAlunos() {
            try {
                const data = await Alunos.getAlunos();
                setAlunos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
                setProfessores([]);
            }
        }

        fetchProfessores();
    }, []);

    const alunosFiltrados = useMemo(() => {
        let lista = Array.isArray(alunos) ? [...alunos] : [];

        if (searchText) {
            lista = lista.filter(aluno =>
                aluno.usuario?.nome?.toLowerCase().includes(searchText.toLowerCase()) ||
                aluno.usuario?.email?.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return lista;
    }, [alunos, searchText]);

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
        navigate("/aluno/create");
    };

    const handleEditAluno = (alunoId) => {
        navigate(`/aluno/edit/${alunoId}`);
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
                            onClick={handleAddProfessor}
                        >
                            + Adicionar Professor
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
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {alunosFiltrados.map(aluno => (
                                    <CardAlunoTable
                                        key={aluno.id}
                                        aluno={aluno}
                                        onEdit={() => handleEditAluno(aluno.id)}
                                        onDelete={() => handleDeleteAluno(aluno.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </>
    );
}