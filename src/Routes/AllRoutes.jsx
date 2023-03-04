import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/Welcome";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import NotesPage from "../pages/Notes";
import NotFound from "../pages/NotFound";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
