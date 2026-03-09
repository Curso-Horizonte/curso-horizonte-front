import React, { useEffect, useState } from "react";
import Header from "../../../components/header/header";
import AlunoDisciplinaService from "../../../Service/AlunoDisciplina";
import DisciplinaService from "../../../Service/Disciplina";
import styles from "./BoletimList.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://api-horizonte.onrender.com";

function Boletim() {
  const { alunoId } = useParams();
  const [alunoNome, setAlunoNome] = useState("");
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoletim() {
      try {
        // Busca todos os vínculos aluno-disciplina
        const alunoDisciplinas = await AlunoDisciplinaService.getAll();
        
        console.log("alunoId da URL:", alunoId, "tipo:", typeof alunoId);
        console.log("Todos os vínculos:", alunoDisciplinas);
        
        const vinculosAluno = alunoDisciplinas.filter(ad => {
          console.log(`Comparando: ad.alunoId=${ad.alunoId} (${typeof ad.alunoId}) com alunoId=${alunoId} (${typeof alunoId})`);
          return Number(ad.alunoId) === Number(alunoId);
        });
        
        console.log("Vínculos filtrados:", vinculosAluno);
        
        if (vinculosAluno.length === 0) {
          setNotas([]);
          setLoading(false);
          return;
        }

        setAlunoNome(vinculosAluno[0].alunoNome);

        // Busca todas as disciplinas
        const todasDisciplinas = await DisciplinaService.getDisciplinas();

        // Para cada vínculo, busca as notas usando a API correta
        const boletimPromises = vinculosAluno.map(async (vinc) => {
          const disciplina = todasDisciplinas.find(d => Number(d.id) === Number(vinc.disciplinaId));
          
          let notasDisc = [];
          try {
            const response = await axios.get(
              `${API_BASE_URL}/api/nota/aluno/${vinc.alunoId}/disciplina/${vinc.disciplinaId}`
            );
            notasDisc = response.data || [];
          } catch (err) {
            console.log(`Sem notas para disciplina ${vinc.disciplinaId}`);
          }

          const notaObj = {
            alunoDisciplinaId: vinc.id,
            disciplinaNome: disciplina?.nome || `Disciplina ${vinc.disciplinaId}`,
            bimestre1: null,
            bimestre2: null,
            bimestre3: null,
            bimestre4: null,
            media: null,
            situacao: null,
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

          // Calcula média
          const valores = [notaObj.bimestre1, notaObj.bimestre2, notaObj.bimestre3, notaObj.bimestre4].filter(v => v !== null);
          if (valores.length > 0) {
            const media = valores.reduce((a, b) => a + b, 0) / valores.length;
            notaObj.media = media.toFixed(2);
            
            // Determina situação (média >= 6 = Aprovado)
            if (valores.length === 4) {
              notaObj.situacao = media >= 6 ? "Aprovado" : "Reprovado";
            } else {
              notaObj.situacao = "Cursando";
            }
          } else {
            notaObj.situacao = "Sem notas";
          }

          return notaObj;
        });

        const boletim = await Promise.all(boletimPromises);
        setNotas(boletim);
      } catch (error) {
        console.error("Erro ao buscar boletim:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBoletim();
  }, [alunoId]);

  // Calcula situação geral do aluno
  const getSituacaoGeral = () => {
    if (notas.length === 0) return null;
    
    const notasComSituacao = notas.filter(n => n.situacao === "Aprovado" || n.situacao === "Reprovado");
    if (notasComSituacao.length === 0) return "Cursando";
    
    const temReprovacao = notasComSituacao.some(n => n.situacao === "Reprovado");
    if (temReprovacao) return "Reprovado";
    
    const todasAprovadas = notasComSituacao.length === notas.length && notasComSituacao.every(n => n.situacao === "Aprovado");
    return todasAprovadas ? "Aprovado" : "Cursando";
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <p>Carregando boletim...</p>
        </main>
      </>
    );
  }

  if (notas.length === 0) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <p>O aluno não possui disciplinas cadastradas.</p>
        </main>
      </>
    );
  }

  const situacaoGeral = getSituacaoGeral();

  return (
    <>
      <Header />
      <header className={styles.header}>
        <h1>Boletim do Aluno: {alunoNome}</h1>
        <div className={styles.situacaoGeral}>
          <span>Situação Geral: </span>
          <span className={
            situacaoGeral === "Aprovado" ? styles.aprovado : 
            situacaoGeral === "Reprovado" ? styles.reprovado : 
            styles.cursando
          }>
            {situacaoGeral}
          </span>
        </div>
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
              <th>Situação</th>
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
                <td className={n.media && Number(n.media) < 7 ? styles.notaBaixa : ""}>
                  {n.media ?? "-"}
                </td>
                <td className={
                  n.situacao === "Aprovado" ? styles.aprovado : 
                  n.situacao === "Reprovado" ? styles.reprovado : 
                  styles.cursando
                }>
                  {n.situacao}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Boletim;