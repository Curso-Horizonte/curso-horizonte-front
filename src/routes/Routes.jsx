import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeachersHub from "../pages/teachers/hub/hub.jsx";
import Login from "../pages/login/login.jsx";
import ChangePassword from "../pages/change-password/change-password.jsx";
import Teachers from "../pages/teachers/quick-access/teachers.jsx";
import ProtectedRoute from "../components/protected-route/ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
