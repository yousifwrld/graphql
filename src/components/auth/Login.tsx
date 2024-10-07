import { useState } from "react";
import { setCookies } from "./cookies";

function Login() {
  // States for usernameOrEmail and password input
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("error: No input fields can be empty.");
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
        window.location.href = "/dashboard";
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
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-6xl font-extrabold text-center text-white mb-10">
          Graph
          <span className="text-[#5ed9d1]">QL</span>
        </h1>

        <form className="space-y-6" onSubmit={handleFormSubmission}>
          <input
            type="text"
            placeholder="01 Username/Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5ed9d1] transition duration-300"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5ed9d1] transition duration-300"
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
            <p className="text-red-500 text-center italic">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#5ed9d1] hover:bg-[#47b3ab] active:bg-[#3b9690] text-white font-semibold shadow-lg transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
