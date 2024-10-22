import Audit from "../dashboard/Audit";
import Card from "../dashboard/Card";
import UserInfo from "../dashboard/UserInfo";
import XpOverMonths from "../dashboard/XpOverMonths";
import Logout from "../auth/Logout";
import { FaUser, FaHistory, FaTrophy, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../utils/cookies";
import { useEffect } from "react";
import Skills from "../dashboard/Skills";
function Dashboard() {
  // if not logged in, redirect to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (!getTokenFromCookie()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#10151f] text-white">
      {/* Header with Logout */}
      <header className="flex justify-between items-center p-4 bg-[#1c2533]">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Logout />
      </header>

      {/* Main content section */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          {/* User Info Section */}
          <Card title="User Info" content={<UserInfo />} icon={<FaUser />} />
          {/* Audit Section */}
          <Card
            title="Audit History"
            content={<Audit />}
            icon={<FaHistory />}
          />
          {/* XP Over Months Section */}
          <Card
            title="XP Gained Per Month"
            content={<XpOverMonths />}
            icon={<FaTrophy />}
          />
          <Card title="Skills Gained" content={<Skills />} icon={<FaCode />} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
