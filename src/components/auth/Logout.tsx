import { IoMdLogOut } from "react-icons/io";
import { deleteCookies } from "../../utils/cookies";

function Logout() {
  return (
    <button
      className="rounded-lg bg-[#5ed9d1] hover:bg-[#47b3ab] active:bg-[#3b9690] text-white font-bold py-2 px-2 shadow-lg transform transition-all duration-300"
      onClick={handleLogout}
    >
      Logout
      <IoMdLogOut className="inline ml-2" />
    </button>
  );
}

export default Logout;

function handleLogout() {
  // Delete the cookies then reload the page which will trigger navigating to login page
  deleteCookies();
  window.location.reload();
}