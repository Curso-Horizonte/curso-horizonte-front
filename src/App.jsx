import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from './pages/FluxoAdmin/AdminHome/adminHome';
import ProfList from './pages/FluxoAdmin/CrudProfessor/profList';
import AlunoList from './pages/FluxoAdmin/CrudAlunos/alunosList';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/CrudProfessor/profList" element={<ProfList />} />
        <Route path="/CrudAluno/alunoList" element={<AlunoList />} />
      </Routes>
    </Router>
  );
}

export default App;