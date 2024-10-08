import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import Dashboard from "./components/pages/Dashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
