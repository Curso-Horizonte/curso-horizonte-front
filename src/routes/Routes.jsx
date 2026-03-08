import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstAccess from "../pages/first-access/first-access.jsx";
import TeachersHub from "../pages/teachers/hub/hub.jsx";
import Teachers from "../pages/teachers/quick-access/teachers.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teachers />} />
        <Route path="/hub/:disciplinaNome" element={<TeachersHub />} />
        <Route path="/first-access" element={<FirstAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
