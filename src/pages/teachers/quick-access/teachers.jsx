import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "../../../components/header/header";
import "./teachers.css";
import API_BASE_URL from "../../../config";

function Teachers() {
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState([]);

  const getMaterias = async () => {
    const professorId = 11;
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/professor_disciplina/professor/${professorId}`
      );
      setMaterias(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMaterias();
  }, []);

  return (
    <div className="teachers">
      <HeaderComponent />
      <div className="teachers-container">
        <div className="teachers-header">
          <h6>Hub do Professor</h6>
          <h1>Hub do Professor</h1>
          <h3>Escolha a disciplina para listar os alunos</h3>
        </div>
        <div className="teachers-content">
          {loading ? (
            <p>Carregando disciplinas...</p>
          ) : (
            materias.map((materia) => (
              <div className="teacher-card" key={materia.id}>
                <h2>{materia.disciplinaNome}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Teachers;
