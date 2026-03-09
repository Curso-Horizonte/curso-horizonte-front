import React, { useEffect, useState } from "react";
import TopBar from "../../../componentes/elementos/topBar";
import NotaService from "../../../Service/Nota";
import styles from "./boletimList.module.css";
import { useParams } from "react-router-dom";

function Boletim() {

  const alunoId = useParams().id;
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotas() {
      try {
        const data = await NotaService.getNotas();
        const alunoNotas = data.filter(n => n.alunoId === alunoId);

        const notasFormatadas = [];

        alunoNotas.forEach(n => {
          let notaDisc = notasFormatadas.find(nd => nd.alunoDisciplinaId === n.alunoDisciplinaId);
          if (!notaDisc) {
            notaDisc = {
              alunoDisciplinaId: n.alunoDisciplinaId,
              disciplinaNome: n.disciplinaNome,
              bimestre1: null,
              bimestre2: null,
              bimestre3: null,
              bimestre4: null,
            };
            notasFormatadas.push(notaDisc);
          }

          switch (n.bimestre) {
            case 1:
              notaDisc.bimestre1 = n.valor;
              break;
            case 2:
              notaDisc.bimestre2 = n.valor;
              break;
            case 3:
              notaDisc.bimestre3 = n.valor;
              break;
            case 4:
              notaDisc.bimestre4 = n.valor;
              break;
          }
        });

        notasFormatadas.forEach(n => {
          const valores = [n.bimestre1, n.bimestre2, n.bimestre3, n.bimestre4].filter(v => v !== null);
          n.media = valores.length > 0 ? (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2) : null;
        });

        setNotas(notasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotas();
  }, [alunoId]);

  if (loading) return <p>Carregando notas...</p>;
  if (notas.length === 0) return <p>Nenhuma nota cadastrada para este aluno.</p>;

  return (
    <>
      <TopBar />
      <header className={styles.header}>
        <h1>Boletim do Aluno</h1>
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