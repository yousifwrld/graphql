import Audit from "../dashboard/Audit";
import Card from "../dashboard/Card";
import UserInfo from "../dashboard/UserInfo";
import XpOverMonths from "../dashboard/XpOverMonths";
import Logout from "../auth/Logout";
import { FaUser, FaHistory, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/cookies";
import { useEffect } from "react";
function Dashboard() {
  // if not logged in, redirect to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!getTokenFromCookie()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Logout */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Logout />
      </header>

      {/* Main content section */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Section */}
          <Card title="User Info" content={<UserInfo />} icon={<FaUser />} />
          {/* Audit Section */}
          <Card title="Audit Stats" content={<Audit />} icon={<FaHistory />} />
          {/* XP Over Months Section */}
          <Card
            title="XP Progress Over Months"
            content={<XpOverMonths />}
            icon={<FaTrophy />}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
