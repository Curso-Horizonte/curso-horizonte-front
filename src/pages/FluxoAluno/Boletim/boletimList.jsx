import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import NotaService from "../../../Service/Nota";
import AlunoDisciplinaService from "../../../Service/AlunoDisciplina";
import DisciplinaService from "../../../Service/Disciplina";
import styles from "./boletimList.module.css";
import { useParams } from "react-router-dom";

function Boletim() {
  const { id: alunoId } = useParams();
  const [alunoNome, setAlunoNome] = useState("");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoletim() {
      try {
        const alunoDisciplinas = await AlunoDisciplinaService.getAll();
        const vinculosAluno = alunoDisciplinas.filter(ad => Number(ad.alunoId) === Number(alunoId));
        if (vinculosAluno.length === 0) {
          setNotas([]);
          setLoading(false);
          return;
        }

        setAlunoNome(vinculosAluno[0].alunoNome);

        const todasDisciplinas = await DisciplinaService.getDisciplinas();
        const todasNotas = await NotaService.getNotas();

        const boletim = vinculosAluno.map(vinc => {
          const disciplina = todasDisciplinas.find(d => Number(d.id) === Number(vinc.disciplinaId));
          // filtra notas pelo alunoDisciplinaId ou pelo nome do aluno
          const notasDisc = todasNotas.filter(
            n => n.alunoDisciplinaId === vinc.id || n.alunoNome === vinc.alunoNome
          );

          const notaObj = {
            alunoDisciplinaId: vinc.id,
            disciplinaNome: disciplina?.nome || `Disciplina ${vinc.id}`,
            bimestre1: null,
            bimestre2: null,
            bimestre3: null,
            bimestre4: null,
            media: null,
          };

          notasDisc.forEach(n => {
            switch (n.bimestre) {
              case 1: notaObj.bimestre1 = n.valor; break;
              case 2: notaObj.bimestre2 = n.valor; break;
              case 3: notaObj.bimestre3 = n.valor; break;
              case 4: notaObj.bimestre4 = n.valor; break;
              default: break;
            }
          });

          const valores = [notaObj.bimestre1, notaObj.bimestre2, notaObj.bimestre3, notaObj.bimestre4].filter(v => v !== null);
          notaObj.media = valores.length > 0 ? (valores.reduce((a,b) => a+b, 0) / valores.length).toFixed(2) : null;

          return notaObj;
        });

        setNotas(boletim);
      } catch (error) {
        console.error("Erro ao buscar boletim:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBoletim();
  }, [alunoId]);

  if (loading) return <p>Carregando boletim...</p>;
  if (notas.length === 0) return <p>O aluno não possui disciplinas cadastradas ou notas lançadas.</p>;

  return (
    <>
      <Header />
      <header className={styles.header}>
        <h1>Boletim do Aluno {alunoNome}</h1>
      </header>
      <main className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Bim. 1</th>
              <th>Bim. 2</th>
              <th>Bim. 3</th>
              <th>Bim. 4</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            {notas.map(n => (
              <tr key={n.alunoDisciplinaId}>
                <td>{n.disciplinaNome}</td>
                <td>{n.bimestre1 ?? "-"}</td>
                <td>{n.bimestre2 ?? "-"}</td>
                <td>{n.bimestre3 ?? "-"}</td>
                <td>{n.bimestre4 ?? "-"}</td>
                <td>{n.media ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Boletim;