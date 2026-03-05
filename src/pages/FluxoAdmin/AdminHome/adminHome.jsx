import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./adminHome.module.css";
import TopBar from "../../../componentes/elementos/topBar";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AdminHome() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleProfList = () => {
      navigate('/CrudProfessor/profList');
    };

    const handleAlunoList = () => {
      navigate('/CrudAluno/alunoList');
    };

    return (
       <>
        <TopBar />

        <header className={styles.adminHome}>
            <div className={styles.tituloPage}>
                <h1>Hub - Administrador!</h1>
                <p>
                    Visualize, adicione e edite alunos, matérias e professores.
                </p>
            </div>
        </header>

        <main className={styles.main}>
            <div className={styles.btnAluno} onClick={handleAlunoList}>
                <h2>Alunos</h2>
                <p>Administre seus alunos</p>
            </div>

            <div className={styles.btnProfessor } onClick={handleProfList}>
                <h2>Professores</h2>
                <p>Administre seus professores</p>
            </div>

            <div className={styles.btnMateria}>
                <h2>Matérias</h2>
                <p>Administre suas matérias</p>
            </div>
        </main>
    </>
    );
}

export default AdminHome;