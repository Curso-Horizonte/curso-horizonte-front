import TopBar from "../../../componentes/elementos/topBar";
import styles from "./observacoesList.module.css";
import ObservacaoService from "../../../Service/Observacao";
import DocumentoService from "../../../Service/Documento";
import ProfessorDisciplina from "../../../Service/professorDisciplina";
import CardObservacao from "../../../componentes/CardsObervacao/CardObervacao";
import CardDocumentos from "../../../componentes/CardsObervacao/CardsDocumentos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ObservacoesList() {
    const { disciplinaId } = useParams();
    const [observacoes, setObservacoes] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [materiaNome, setMateriaNome] = useState("");
    const [professorNome, setProfessorNome] = useState("");

    useEffect(() => {
    async function fetchData() {
        try {
            const obsData = await ObservacaoService.getObservacao();
            const obsFiltradas = obsData.filter(o => Number(o.disciplinaId) === Number(disciplinaId));
            setObservacoes(obsFiltradas);

            const docData = await DocumentoService.getDocumento();
            const docFiltrados = docData.filter(d => Number(d.professorDisciplinaId) === Number(disciplinaId));
            setDocumentos(docFiltrados);

            // pegar nome da matéria e professor
            const vinculos = await ProfessorDisciplinaService.getAll();
            const vinculosDisc = vinculos.filter(v => Number(v.disciplinaId) === Number(disciplinaId));
            
            if (vinculosDisc.length > 0) {
                setMateriaNome(vinculosDisc[0].disciplinaNome);
                setProfessorNome(vinculosDisc.map(v => v.professorNome).join(", "));
            } else {
                setMateriaNome("Matéria não encontrada");
                setProfessorNome("Professor não atribuído");
            }

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
}, [disciplinaId]);

    if (loading) return <p>Carregando informações...</p>;

    return (
        <>
            <TopBar />
            <header className={styles.alunoHeader}>
                <div className={styles.tituloPage}>
                    <h1>Observações e Documentos</h1>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.observacoesContainer}>
                    <h2>Observações</h2>
                    {observacoes.length > 0 ? (
                        <div className={styles.containerTable}>
                            {observacoes.map(obs => (
                                <CardObservacao
                                    key={obs.id}
                                    titulo={`${obs.professorNome} - ${new Date(obs.data).toLocaleDateString()}`}
                                    descricao={obs.texto}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Nenhuma observação para esta disciplina.</p>
                    )}
                </div>

                <div className={styles.documentosContainer}>
                    <h2>Documentos</h2>
                    {documentos.length > 0 ? (
                        <div className={styles.containerTable}>
                            {documentos.map(doc => (
                                <CardDocumentos
                                    key={doc.id}
                                    titulo={doc.titulo}
                                    descricao={doc.conteudo}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Não há documento cadastrado para essa matéria.</p>
                    )}
                </div>
            </main>
        </>
    );
}

export default ObservacoesList;