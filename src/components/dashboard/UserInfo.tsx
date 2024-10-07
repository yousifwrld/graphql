import { useEffect, useState } from "react";
import { getUserIdFromCookie } from "../auth/cookies";

function UserInfo() {
  // Interface for user info "like a golang struct"
  interface userInfoInterface {
    id: string;
    username: string;
    campus: string;
  }

  // State for user info, initialized to null
  const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);

  // Get the user info on component mount "page load"
  useEffect(() => {
    // Function to fetch and set user info
    const fetchUser = async () => {
      const data = await fetchUserInfo();
      if (data) {
        setUserInfo(data); // Set the user info in state
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        <i className="bx bxs-user text-[#5ed9d1] mr-2"></i>
        User Info
      </h1>

      {
        // Display the user info
        userInfo ? (
          <>
            <p className="text-white">ID: {userInfo.id}</p>
            <p className="text-white">Username: {userInfo.username}</p>
            <p className="text-white">Campus: {userInfo.campus}</p>
          </>
        ) : (
          <p className="text-white">Loading...</p>
        )
      }
    </div>
  );
}

export default UserInfo;

async function fetchUserInfo() {
  // Get the user ID
  const userID = getUserIdFromCookie();

  // Prepare the GraphQL query
  const query = `query {
    user(where: {id: {_eq: "${userID}"}}) {
      id
      login
      campus
    }
  }`;

  // Send the GraphQL query
  try {
    const response = await fetch(
      "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();

    if (data.data && data.data.user && data.data.user.length > 0) {
      // Destructure the user data
      const { id, login: username, campus } = data.data.user[0];
      return { id, username, campus };
    } else {
      console.log(response);
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error(error);
  }
}
