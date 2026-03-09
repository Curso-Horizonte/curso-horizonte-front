import Header from "../../../components/header/header";
import styles from "./alunomateriaList.module.css";
import Disciplina from "../../../Service/Disciplina";
import professorDisciplina from "../../../Service/professorDisciplina";
import AlunoDisciplina from "../../../Service/AlunoDisciplina";
import { useNavigate, useParams } from "react-router-dom";
import CardAlunoMateria from "../../../componentes/CardsAlunoMateria/CardAlunoMateria";
import { useEffect, useState } from "react";

function AlunoMateriaList() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [alunoDisciplinas, setAlunoDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { alunoId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataDisc = await Disciplina.getDisciplinas();
        const dataVinc = await professorDisciplina.getAll();
        const dataAlunoDisc = await AlunoDisciplina.getAll();

        console.log("Disciplinas:", dataDisc);
        console.log("Vinculos:", dataVinc);
        console.log("Aluno Disciplinas:", dataAlunoDisc);

        const vinculosDoAluno = dataAlunoDisc.filter(
          v => Number(v.alunoId) === Number(alunoId)
        );

        setDisciplinas(Array.isArray(dataDisc) ? dataDisc : []);
        setVinculos(Array.isArray(dataVinc) ? dataVinc : []);
        setAlunoDisciplinas(Array.isArray(vinculosDoAluno) ? vinculosDoAluno : []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [alunoId]);

  const listaFormatada = alunoDisciplinas.map(vinc => {
    const disciplina = disciplinas.find(d => Number(d.id) === Number(vinc.disciplinaId));
    const professores = vinculos
      .filter(v => Number(v.disciplinaId) === Number(vinc.disciplinaId))
      .map(v => v.professorNome)
      .join(", ");

    return {
      id: disciplina?.id,
      nome: disciplina?.nome || "Disciplina não encontrada",
      professor: professores || "Não atribuído"
    };
  });

  if (loading) return <p>Carregando disciplinas...</p>;

  return (
    <>
      <Header />
      <header className={styles.alunoHeader}>
        <div className={styles.tituloPage}>
          <h1>Matérias</h1>
          <button onClick={() => navigate(`/boletim/BoletimList/${alunoId}`)}>
            Visualizar Boletim
          </button>
        </div>
        <p>Visualize as disciplinas e seus professores</p>
      </header>

      <main className={styles.main}>
        <div className={styles.containerTable}>
          {listaFormatada.length > 0 ? (
            listaFormatada.map(d => (
              <CardAlunoMateria
                key={d.id}
                id={d.id}
                nome={d.nome}
                professor={d.professor}
                onClick={() => navigate(`/observacoes/${d.id}`)}
              />
            ))
          ) : (
            <p>Este aluno não possui disciplinas vinculadas.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default AlunoMateriaList;