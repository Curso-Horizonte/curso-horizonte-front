import HeaderComponent from "../../../components/header/header";
import "./teachers.css";

function Teachers() {
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
          <div className="teacher-card">
            <h2>Matemática</h2>
            <h5>Matematica é uma materia muito interessante e intuitiva e sla cabeca grande</h5>
          </div>
          <div className="teacher-card">
            <h2>Matemática</h2>
            <h5>Matematica é uma materia muito interessante e intuitiva e sla cabeca grande</h5>
          </div>
          <div className="teacher-card">
            <h2>Matemática</h2>
            <h5>Matematica é uma materia muito interessante e intuitiva e sla cabeca grande</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
