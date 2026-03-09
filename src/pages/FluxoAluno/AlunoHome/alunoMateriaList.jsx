import TopBar from "../../../componentes/elementos/topBar";
import styles from "./alunoMateriaList.module.css";
import Disciplina from "../../../Service/Disciplina";
import ProfessorDisciplina from "../../../Service/professorDisciplina";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import CardAlunoMateria from "../../../componentes/CardsAlunoMateria/cardAlunoMateria";

function AlunoMateriaList() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [vinculos, setVinculos] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData() {
            try {
                const dataDisc = await Disciplina.getDisciplinas();
                const dataVinc = await ProfessorDisciplina.getAll();

                setDisciplinas(Array.isArray(dataDisc) ? dataDisc : []);
                setVinculos(Array.isArray(dataVinc) ? dataVinc : []);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const listaFormatada = disciplinas.map(disc => {
        const professores = vinculos
            .filter(v => Number(v.disciplinaId) === Number(disc.id))
            .map(v => v.professorNome)
            .join(", ");

        return {
            id: disc.id,
            nome: disc.nome,
            professor: professores || "Não atribuído"
        };
    });

    if (loading) return <p>Carregando disciplinas...</p>;

    return (
        <>
            <TopBar />
            <header className={styles.alunoHeader}>
                <div className={styles.tituloPage}>
                    <h1>Matérias</h1>
                    <button onClick={() => navigate("/boletim/BoletimList")}>Visualizar Boletim</button>
                </div>
                <p>Visualize as disciplinas e seus professores</p>
            </header>

            <main className={styles.main}>
                <div className={styles.containerTable}>
                    {listaFormatada.map(d => (
                        <CardAlunoMateria
                            key={d.id}
                            id={d.id}
                            nome={d.nome}
                            professor={d.professor}
                            onClick={() => navigate(`/observacoes/${d.id}`)} 
                        />
                    ))}
                </div>
            </main>
        </>
    );
}

export default AlunoMateriaList;