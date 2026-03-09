    import TopBar from "../../../components/elementos/topBar";
    import styles from "./alunoMateriaList.module.css";
    import Alunos from "../../../Service/Aluno";
    import { useMemo, useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";

    function AlunoMateriaList() {

        const navigate = useNavigate();
        const [alunos, setAlunos] = useState([]);

        return (
            <>
                <TopBar />
                <header className={styles.alunoHeader}>
                    <div className={styles.tituloPage}>
                        <h1>Alunos</h1>
                        <button>
                            Visualizar Boletim
                        </button>
                    </div>
                    <p>Visualize seus alunos e suas informações</p>
                </header>
                <main className={styles.main}>
                    <div className={styles.containerTable}>
                        <h1>Nome Matéria</h1>
                        <p>Professor</p>
                    </div>
                </main>
            </>
        );
    }

    export default AlunoMateriaList;