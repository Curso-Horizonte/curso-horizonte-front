import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeachersHub from "../pages/teachers/hub/hub.jsx";
import Teachers from "../pages/teachers/quick-access/teachers.jsx";
import Login from "../pages/login/login.jsx";
import ChangePassword from "../pages/change-password/change-password.jsx";
import AdminHome from "../pages/FluxoAdmin/AdminHome/adminHome.jsx";
import AlunosList from "../pages/FluxoAdmin/CrudAlunos/alunosList.jsx";
import DisciplinaList from "../pages/FluxoAdmin/CrudDisciplina/disciplinaList.jsx";
import ProfList from "../pages/FluxoAdmin/CrudProfessor/profList.jsx";
import AlunoHome from "../pages/FluxoAluno/AlunoHome/alunoMateriaList.jsx";
import ObservacoesList from "../pages/FluxoAluno/ObservacoesHome/obervacoesList.jsx";
import ProtectedRoute from "../components/protected-route/ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        {/* Rotas do Professor */}
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hub/:disciplinaNome"
          element={
            <ProtectedRoute>
              <TeachersHub />
            </ProtectedRoute>
          }
        />
        
        {/* Rotas do Admin (sem proteção para facilitar debug) */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/alunos" element={<AlunosList />} />
        <Route path="/admin/disciplinas" element={<DisciplinaList />} />
        <Route path="/admin/professores" element={<ProfList />} />
        
        {/* Rotas do Aluno */}
        <Route
          path="/aluno"
          element={
            <ProtectedRoute>
              <AlunoHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aluno/observacoes"
          element={
            <ProtectedRoute>
              <ObservacoesList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
