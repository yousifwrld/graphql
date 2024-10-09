import { useNavigate } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-center p-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-9xl font-extrabold text-[#5ed9d1] mr-2">404</h1>
        <FaExclamation className="text-[#5ed9d1] text-8xl animate-bounce" />
      </div>
      <h2 className="text-5xl font-bold text-white mb-6 text-pretty">
        Oops! The page you're looking for
        <br /> doesn't seem to exist!
      </h2>

      <p className="text-lg text-gray-300 mb-10">
        It might have been removed, or the URL might be incorrect.
      </p>

      <button
        className="bg-[#5ed9d1] text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-[#4bc6b8]"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
