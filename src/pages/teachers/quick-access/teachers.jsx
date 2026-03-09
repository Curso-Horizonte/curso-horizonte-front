import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../../components/header/header";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import "./teachers.css";
import API_BASE_URL from "../../../config";

function Teachers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState([]);
  const breadcrumbs = [
    { label: "Hub do Professor" },
  ];

  const getMaterias = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User do localStorage:", user);
    const professorId = user?.professorId;
    
    if (!professorId) {
      console.error("ID do professor não encontrado. Faça logout e login novamente.");
      setLoading(false);
      return;
    }
    
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
          <Breadcrumb items={breadcrumbs} />
          <h1>Hub do Professor</h1>
          <h3>Escolha a disciplina para listar os alunos</h3>
        </div>
        <div className="teachers-content">
          {loading ? (
            <p>Carregando disciplinas...</p>
          ) : (
            materias.map((materia) => {
              // Criar slug amigável a partir do nome da disciplina
              const slug = materia.disciplinaNome
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // remove acentos
                .replace(/\s+/g, "-"); // espaços para hífens
              
              return (
              <div
                className="teacher-card"
                key={materia.id}
                onClick={() => navigate(`/hub/${slug}`, {
                  state: { 
                    disciplinaNome: materia.disciplinaNome,
                    disciplinaId: materia.disciplinaId
                  }
                })}
                style={{ cursor: "pointer" }}
              >
                <h2>{materia.disciplinaNome}</h2>
              </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Teachers;
