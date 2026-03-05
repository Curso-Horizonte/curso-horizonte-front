import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from './pages/FluxoAdmin/AdminHome/adminHome';
import ProfList from './pages/FluxoAdmin/CrudProfessor/profList';
import AlunoList from './pages/FluxoAdmin/CrudAlunos/alunosList';
import ObservacoesList from './pages/FluxoAluno/ObservacoesHome/obervacoesList';
import DisciplinaList from './pages/FluxoAdmin/CrudDisciplina/disciplinaList';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/CrudProfessor/profList" element={<ProfList />} />
        <Route path="/CrudAluno/alunoList" element={<AlunoList />} />
        <Route path="/CrudDisciplina/disciplinaList" element={<DisciplinaList />} />
      </Routes>
    </Router>
  );
}

export default App;