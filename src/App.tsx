import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";
import NotFound from "./components/pages/NotFound.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
