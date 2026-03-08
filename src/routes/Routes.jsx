import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeachersHub from "../pages/teachers/hub/hub.jsx";
import Login from "../pages/login/login.jsx";
import ChangePassword from "../pages/change-password/change-password.jsx";
import Teachers from "../pages/teachers/quick-access/teachers.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/hub/:disciplinaNome" element={<TeachersHub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
