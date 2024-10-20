import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookies } from "../../utils/cookies";
import { getTokenFromCookie } from "../../utils/cookies";

function Login() {
  // Navigate hook
  const navigate = useNavigate();
  // Check if a valid token exists in cookies on component mount, and redirect to dashboard if it does
  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // States for usernameOrEmail and password input
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Function to change the password visibility state
  function changePasswordVisibility() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  // Function to handle form submission
  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    // Prevent default form submission
    event.preventDefault();

    // Validate inputs
    if (!usernameOrEmail.trim() || !password.trim()) {
      // Set error message and input empty state
      setErrorMessage("Please fill in all the fields.");
      setIsInputEmpty(true);

      // Clear the error message and input empty state after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
        setIsInputEmpty(false);
      }, 3000);
      return;
    }

    // Create the basic auth crendentials
    const credentials = `${usernameOrEmail}:${password}`;
    // Encode the crendentials
    const encodedCredentials = btoa(credentials);

    try {
      // Send the POST request with the encoded crendentials
      const response = await fetch(
        "https://learn.reboot01.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Get the token from the response
        const data = await response.json();
        // Set the cookie with the token
        setCookies(data);
        // Redirect to the dashboard
        navigate("/");
      } else {
        // Handle errors
        // Get the error message from the response
        const errMessage = await response.text();
        setErrorMessage(
          // Format the error message
          errMessage
            .replace(/"/g, "")
            .replace(/{/g, "")
            .replace(/}/g, "")
            .replace(/:/g, ": ")
        );

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#10151f]">
      <div className="bg-[#1c2533] p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-6xl font-extrabold text-center text-white mb-10">
          Graph
          <span className="text-[#ff0400]">QL</span>
        </h1>

        <form className="space-y-6" onSubmit={handleFormSubmission}>
          <input
            type="text"
            placeholder="01 Username/Email"
            className={`w-full p-3 rounded-lg bg-[#10151f] ${
              isInputEmpty ? "ring-2 ring-red-700" : null
            } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0401] transition duration-300`}
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className={`w-full p-3 rounded-lg bg-[#10151f] ${
                isInputEmpty ? "ring-2 ring-red-700" : null
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0401] transition duration-300`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              id="eye"
              className={`bx ${
                showPassword ? "bx-hide" : "bx-show-alt"
              } absolute right-4 top-3 text-2xl cursor-pointer text-gray-400 hover:text-white`}
              onClick={changePasswordVisibility}
            ></i>
          </div>

          {errorMessage && (
            <p className="text-red-700 text-center italic">{errorMessage}</p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-3 rounded-lg bg-[#ff0401] hover:bg-[#9e0300] active:bg-[#850200] text-white font-semibold shadow-lg transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
