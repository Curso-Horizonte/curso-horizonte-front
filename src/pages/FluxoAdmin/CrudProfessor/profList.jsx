import TopBar from "../../../componentes/elementos/topBar";
import styles from "./profList.module.css";
import Professores from "../../../Service/Professores";
import CardProfessorTable from "../../../componentes/CardsProfessor/CardProfessorTable";
import EditarProf from "../../../componentes/popupEditarCriar/editarProf";
import { useMemo, useEffect, useState } from "react";

function ProfList() {

    const [professores, setProfessores] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);

    async function fetchProfessores() {
        const data = await Professores.getProfessores();
        setProfessores(data);
    }

    useEffect(() => {
        fetchProfessores();
    }, []);

    const professoresFormatados = useMemo(() => {
        return professores.map(prof => ({
            ...prof,
            nomeCompleto: `${prof.usuario?.nome || ""} ${prof.usuario?.sobrenome || ""}`,
            cpf: prof.usuario?.cpf || "-",
            email: prof.usuario?.email || "-"
        }));
    }, [professores]);

    const professoresFiltrados = useMemo(() => {
        return professoresFormatados.filter(prof =>
            prof.nomeCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
            prof.email.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [professoresFormatados, searchText]);

    const handleDeleteProfessor = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;

        await Professores.deleteProfessor(id);
        setProfessores(prev => prev.filter(p => p.id !== id));
    };

    const handleOpenCreate = () => {
        setSelectedProfessorId(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (id) => {
        setSelectedProfessorId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProfessorId(null);
    };

    const handleAfterSave = async () => {
        await fetchProfessores();
        handleCloseModal();
    };

    return (
        <>
            <TopBar />

            <header className={styles.profList}>
                <div className={styles.tituloPage}>
                    <h1>Lista de Professores</h1>
                    <p>Visualize, adicione e edite seus professores.</p>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.containerTable}>

                    <div className={styles.tabelaActions}>
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className={styles.inputBuscar}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />

                        <button
                            className={styles.btnAdicionar}
                            onClick={handleOpenCreate}
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
                                    <th>Registro</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {professoresFiltrados.map(prof => (
                                    <CardProfessorTable
                                        key={prof.id}
                                        professor={prof}
                                        onEdit={() => handleOpenEdit(prof.id)}
                                        onDelete={() => handleDeleteProfessor(prof.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>

            {isModalOpen && (
                <EditarProf
                    profId={selectedProfessorId}
                    onClose={handleCloseModal}
                    onSaved={handleAfterSave}
                />
            )}
        </>
    );
}

export default ProfList;