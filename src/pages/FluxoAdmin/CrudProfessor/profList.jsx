import TopBar from "../../../componentes/elementos/topBar";
import styles from "./profList.module.css";
import Professores from "../../../Service/Professores";
import ProfessorDisciplina from "../../../Service/ProfessorDisciplina";
import CardProfessorTable from "../../../componentes/CardsProfessor/CardProfessorTable";
import EditarProf from "../../../componentes/popupEditarCriar/editarProf";
import { useMemo, useEffect, useState } from "react";
import lupa from "../../../images/lupa.svg";
import adicionar from "../../../images/adicionar.svg";

const ROWS_OPTIONS = [5, 10, 25, 50];

function ProfList() {
  const [professores, setProfessores] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessorId, setSelectedProfessorId] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchProfessores() {
    const data = await Professores.getProfessores();
    const professoresComDisciplinas = await Promise.all(
      data.map(async (prof) => {
        const disciplinas = await ProfessorDisciplina.getProfessorbydisciplina(
          prof.id
        );
        return { ...prof, disciplinas };
      })
    );
    setProfessores(professoresComDisciplinas);
  }

  useEffect(() => {
    fetchProfessores();
  }, []);

  const professoresFormatados = useMemo(() => {
    return professores.map((prof) => ({
      ...prof,
      nomeCompleto: `${prof.usuario?.nome || ""} ${
        prof.usuario?.sobrenome || ""
      }`,
      cpf: prof.usuario?.cpf || "-",
      email: prof.usuario?.email || "-",
    }));
  }, [professores]);

  const professoresFiltrados = useMemo(() => {
    setCurrentPage(1);
    return professoresFormatados.filter(
      (prof) =>
        prof.nomeCompleto.toLowerCase().includes(searchText.toLowerCase()) ||
        prof.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [professoresFormatados, searchText]);

  const totalItems = professoresFiltrados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const professoresPagina = professoresFiltrados.slice(startIndex, endIndex);

  const handleDeleteProfessor = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    await Professores.deleteProfessor(id);
    setProfessores((prev) => prev.filter((p) => p.id !== id));
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
          <h1>Administrador - Professor</h1>
          <h2>Adicione novos professores e edite como quiser.</h2>
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
              Adicionar Professor
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
                  <th>Disciplinas</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {professoresPagina.map((prof) => (
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
              {startIndex + 1} – {endIndex} of {totalItems}
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
