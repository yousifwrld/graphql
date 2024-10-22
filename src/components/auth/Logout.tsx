import { IoMdLogOut } from "react-icons/io";
import { deleteCookies } from "../../utils/cookies";
import { NavigateFunction, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  return (
    <button
      className="rounded-lg  bg-[#ff0401] hover:bg-[#a70300] active:bg-[#850200] text-white font-bold py-2 px-2 shadow-lg transform transition-all duration-300"
      onClick={() => handleLogout(navigate)}
    >
      Logout
      <IoMdLogOut className="inline ml-2" />
    </button>
  );
}

export default Logout;

// passing the navigate function to the handleLogout function for cleaner code
function handleLogout(navigate: NavigateFunction) {
  // Delete the cookies then navigate to login page
  deleteCookies();
  navigate("/login");
}
