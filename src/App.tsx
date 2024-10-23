import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";

function App() {
  const basename = process.env.PUBLIC_URL || "";
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
