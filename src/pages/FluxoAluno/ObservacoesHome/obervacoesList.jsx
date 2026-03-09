    import TopBar from "../../../components/elementos/topBar";
    import styles from "./observacoesList.module.css";
    import Alunos from "../../../Service/Aluno";
    import { useMemo, useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";

    function ObservacoesList() {

        const navigate = useNavigate();
        const [alunos, setAlunos] = useState([]);

        return (
            <>
                <TopBar />
                <header className={styles.alunoHeader}>
                    <div className={styles.tituloPage}>
                        <h1>Observações</h1>
                        <button>
                            Visualizar Boletim
                        </button>
                    </div>
                    <p>Visualize suas observações e suas informações</p>
                </header>
                <main className={styles.main}>
                    <div className={styles.containerTable}>
                        <h1>Data</h1>
                        <p>Observação</p>
                    </div>
                </main>
            </>
        );
    }

    export default ObservacoesList;