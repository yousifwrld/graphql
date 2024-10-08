import { useEffect } from "react";
import UserInfo from "../dashboard/UserInfo";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../auth/cookies";
function Dashboard() {
  const navigate = useNavigate();
  // Check if a valid token exists in cookies on component mount, and redirect to login page if not authenticated
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <UserInfo />
    </div>
  );
}

export default Dashboard;
