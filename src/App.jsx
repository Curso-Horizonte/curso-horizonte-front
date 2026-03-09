import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from './pages/FluxoAdmin/AdminHome/adminHome';
import ProfList from './pages/FluxoAdmin/CrudProfessor/profList';
import AlunoList from './pages/FluxoAdmin/CrudAlunos/alunosList';
import ObservacoesList from './pages/FluxoAluno/ObservacoesHome/obervacoesList';
import AlunoMateriaList from './pages/FluxoAluno/AlunoHome/alunoMateriaList';
import DisciplinaList from './pages/FluxoAdmin/CrudDisciplina/disciplinaList';
import Boletim from "./pages/FluxoAluno/Boletim/boletimList";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlunoMateriaList />} />
        <Route path="/CrudProfessor/profList" element={<ProfList />} />
        <Route path="/CrudAluno/alunoList" element={<AlunoList />} />
        <Route path="/CrudDisciplina/disciplinaList" element={<DisciplinaList />} />
        <Route path="/observacoes/:disciplinaId" element={<ObservacoesList />} />
        <Route path="/boletim/BoletimList" element={<Boletim />} />
      </Routes>
    </Router>
  );
}

export default App;