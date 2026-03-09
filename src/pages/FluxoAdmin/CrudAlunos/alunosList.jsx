import { useEffect, useState, useMemo } from "react";
import Header from "../../../components/header/header";
import Alunos from "../../../Service/Aluno";
import AlunoDisciplina from "../../../Service/AlunoDisciplina";
import CardAlunoTable from "../../../components/CardsAlunos/CardAlunoTable";
import EditarAluno from "../../../components/popupEditarCriar/editarAluno";
import styles from "./alunoList.module.css";
import lupa from "../../../images/lupa.svg";
import adicionar from "../../../images/adicionar.svg";

const ROWS_OPTIONS = [5, 10, 25, 50];

function AlunosList() {
  const [alunos, setAlunos] = useState([]);
  const [vinculos, setVinculos] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1);

    let lista = [...alunos];

    if (searchText) {
      lista = lista.filter(
        (aluno) =>
          aluno.usuario?.nome
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          aluno.usuario?.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return lista;
  }, [alunos, searchText]);

  const totalItems = alunosFiltrados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const alunosPagina = alunosFiltrados.slice(startIndex, endIndex);

  function disciplinasDoAluno(alunoId) {
    const disciplinas = vinculos
      .filter((v) => v.alunoId === alunoId)
      .map((v) => v.disciplinaNome);

    return disciplinas.join(", ");
  }

  const handleDeleteAluno = async (alunoId) => {
    try {
      await Alunos.deleteAluno(alunoId);
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== alunoId));
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
      <Header />

      <header className={styles.profList}>
        <div className={styles.tituloPage}>
          <h1>Administrador - Aluno</h1>
          <h2>Adicione novos alunos e edite como quiser.</h2>
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
            <button className={styles.btnAdicionar} onClick={handleAddAluno}>
              <img src={adicionar}></img>
              Adicionar Aluno
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
                {alunosPagina.map((aluno) => (
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
