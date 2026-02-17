import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login.jsx";
import FirstAccess from "../pages/first-access/first-access.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/first-access" element={<FirstAccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
