import TopBar from "../../../components/elementos/topBar";
import styles from "./disciplina.module.css";
import Disciplina from "../../../Service/Disciplina";
import CardDisciplinaTable from "../../../components/CardsDisciplina/CardDisciplinaTable";
import EditarDisciplina from "../../../components/popupEditarCriar/editarDisciplina";
import { useMemo, useEffect, useState } from "react";
import lupa from "../../../images/lupa.svg";
import adicionar from "../../../images/adicionar.svg";

const ROWS_OPTIONS = [5, 10, 25, 50];

function DisciplinaList() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);
    return disciplinas.filter((disc) =>
      disc.nome?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [disciplinas, searchText]);

  const totalItems = disciplinasFiltradas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const disciplinasPagina = disciplinasFiltradas.slice(startIndex, endIndex);

  const handleDeleteDisciplina = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await Disciplina.deleteDisciplina(id);
      setDisciplinas((prev) => prev.filter((d) => d.id !== id));
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
          <h1>Administrador - Disciplinas</h1>
          <h2>Adicione novas disciplinas e edite como quiser.</h2>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.containerTable}>
          <div className={styles.tabelaActions}>
            <div className={styles.buscarWrapper}>
              <input
                type="text"
                placeholder="Pesquisar"
                className={styles.inputBuscar}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className={styles.btnBuscar}>
                <img src={lupa} alt="Botão de Pesquisa"></img>
              </button>
            </div>

            <button className={styles.btnAdicionar} onClick={handleOpenCreate}>
                <img src={adicionar}></img>
                Adicionar Disciplina
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
                {disciplinasPagina.map((disc) => (
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

          <div className={styles.pagination}>
            <div className={styles.rowsPerPage}>
              <span>Linhas por página:</span>
              <select
                className={styles.rowsSelect}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {ROWS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <span className={styles.pageInfo}>
              {totalItems === 0 ? "0" : startIndex + 1} – {endIndex} of{" "}
              {totalItems}
            </span>

            <button
              className={styles.btnPaginacao}
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            <button
              className={styles.btnPaginacao}
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
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
