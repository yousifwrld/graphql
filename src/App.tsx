import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import UserInfo from "./components/dashboard/UserInfo.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
