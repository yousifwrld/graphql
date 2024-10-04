import { useState } from "react";

function Login() {
  // States for usernameOrEmail and password input
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    // Prevent default form submission
    event.preventDefault();

    // Validate inputs
    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage("Please enter a username or email and password.");
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
        const data = await response.json();
        console.log(data);
        // Handle errors
      } else {
        setErrorMessage("User does not exist or password incorrect");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-7xl font-bold text-center p-10 text-[#cccccc] hover:animate-pulse">
        Graph
        <span className="text-[#5ed9d1]">QL</span>
      </h1>

      <form
        className="flex flex-col gap-4 p-10 bg-[#1b1b26] rounded-md w-1/2 mx-auto shadow-lg"
        onSubmit={handleFormSubmission}
      >
        <input
          type="text"
          placeholder="Username or Email"
          className="p-2 rounded-md border-2 border-transparent bg-[#2e2e38] text-[#e0e0e0] outline-none focus:outline-none focus:border-[#5ed9d1] transition duration-300 ease-in-out w-full"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-md border-2 border-transparent bg-[#2e2e38] text-[#e0e0e0] outline-none focus:outline-none focus:border-[#5ed9d1] transition duration-300 ease-in-out w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <p className="text-red-500 italic text-center">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="bg-[#5ed9d1] text-lg p-2 rounded-md hover:bg-[#4bbab3] active:bg-[#43a19a] transition-all duration-300 ease-in-out text-[#1b1b26]"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
