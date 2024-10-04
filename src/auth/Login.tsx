import { useState } from "react";

function Login() {
  // States for username and password input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1
        className="text-7xl font-bold text-center p-10 
        text-[#3a3a4e]"
      >
        Graph
        <span className="text-[#8088b1]">QL</span>
      </h1>

      <form
        className="flex flex-col gap-4 p-10 bg-[#1e1e2f] rounded-md w-1/2 mx-auto"
        onSubmit={handleFormSubmission}
      >
        <input
          type="text"
          placeholder="Username"
          className=" p-2 rounded-md border-2 border-[#3a3a4e] bg-[#3a3a4e] text-[#e0e0e0] outline-none focus:outline-none focus:border-[#4e9bff] w-full transition- duration-300 ease-in-out "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-2 rounded-md border-2 border-[#3a3a4e] bg-[#3a3a4e] text-[#e0e0e0] outline-none focus:outline-none focus:border-[#4e9bff] w-full transition- duration-300 ease-in-out"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#8088b1] p-2 rounded-md hover:bg-[#6e72a2] active:bg-[#626493] transition-all duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </>
  );
}

function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export default Login;
