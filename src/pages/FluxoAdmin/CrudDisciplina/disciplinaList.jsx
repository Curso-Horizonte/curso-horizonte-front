import TopBar from "../../../componentes/elementos/topBar";
import styles from "./disciplina.module.css";
import Disciplina from "../../../Service/Disciplina";
import CardDisciplinaTable from "../../../componentes/CardsDisciplina/CardDisciplinaTable";
import EditarDisciplina from "../../../componentes/popupEditarCriar/editarDisciplina";
import { useMemo, useEffect, useState } from "react";

function DisciplinaList() {

    const [disciplinas, setDisciplinas] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(null);

    async function fetchDisciplinas() {
        try {
            const data = await Disciplina.getDisciplinas();
            setDisciplinas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setDisciplinas([]);
        }
    }

    useEffect(() => {
        fetchDisciplinas();
    }, []);

    const disciplinasFiltradas = useMemo(() => {
        return disciplinas.filter(disc =>
            disc.nome?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [disciplinas, searchText]);

    const handleDeleteDisciplina = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;

        try {
            await Disciplina.deleteDisciplina(id);
            setDisciplinas(prev => prev.filter(d => d.id !== id));
        } catch (error) {
            alert("Erro ao excluir: " + error.message);
        }
    };

    const handleOpenCreate = () => {
        setSelectedDisciplinaId(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (id) => {
        setSelectedDisciplinaId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDisciplinaId(null);
    };

    const handleAfterSave = async () => {
        await fetchDisciplinas();
        handleCloseModal();
    };

    return (
        <>
            <TopBar />

            <header className={styles.profList}>
                <div className={styles.tituloPage}>
                    <h1>Lista de Disciplinas</h1>
                    <p>Visualize, adicione e edite suas disciplinas.</p>
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
                            + Adicionar Disciplina
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {disciplinasFiltradas.map(disc => (
                                    <CardDisciplinaTable
                                        key={disc.id}
                                        disciplina={disc}
                                        onEdit={() => handleOpenEdit(disc.id)}
                                        onDelete={() => handleDeleteDisciplina(disc.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>

            {isModalOpen && (
                <EditarDisciplina
                    disciplinaId={selectedDisciplinaId}
                    onClose={handleCloseModal}
                    onSaved={handleAfterSave}
                />
            )}
        </>
    );
}

export default DisciplinaList;