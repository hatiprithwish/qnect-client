import { Routes, Route } from "react-router-dom";
import PracticePage from "./pages/Practice";
import HomePage from "./pages/Home";
import ProblemsPage from "./pages/Problems";

function App() {
  return (
    <Routes>
      <Route path="/practice/:problemId" element={<PracticePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={<ProblemsPage />} />
    </Routes>
  );
}

export default App;
