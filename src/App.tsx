import { Routes, Route } from "react-router-dom";
import PracticePage from "./pages/practice";
import HomePage from "./pages/home";
import ProblemsPage from "./pages/problems";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import UserProfilePage from "./components/home/UserProfile";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/practice/:problemId"
        element={
          <ProtectedRoute>
            <PracticePage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={<ProblemsPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
