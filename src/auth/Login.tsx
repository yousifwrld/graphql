function Login() {
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
          className=" p-2 rounded-md border-2 border-[#3a3a4e] bg-[#3a3a4e] text-[#e0e0e0] focus:outline-none focus:border-[#4e9bff] w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-2 rounded-md border-2 border-[#3a3a4e] bg-[#3a3a4e] text-[#e0e0e0] focus:outline-none focus:border-[#4e9bff] w-full"
        />

        <button
          type="submit"
          className="bg-[#8088b1] p-2 rounded-md hover:bg-[#6e72a2] active:bg-[#626493]"
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
