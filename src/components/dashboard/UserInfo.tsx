import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../utils/query";

function UserInfo() {
  // Interface for user info "like a golang struct"
  interface userInfoInterface {
    id: string;
    username: string;
    campus: string;
    firstName: string;
    lastName: string;
  }

  // State for user info, initialized to null
  const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);

  // Get the user info on component mount "page load"
  useEffect(() => {
    // Function to fetch and set user info
    const fetchUser = async () => {
      // Setup the query
      const query = `{
        user {
          id
          login
          campus
          attrs
        }
      }`;
      const data = await fetchGraphQL(query);

      if (data && data.data && data.data.user && data.data.user.length > 0) {
        // Destructure the user data
        const {
          id,
          login: username,
          campus,
          attrs: { firstName, lastName },
        } = data.data.user[0];

        // Set the user info in state
        setUserInfo({ id, username, campus, firstName, lastName });
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
            <p className="text-white">
              Full Name: {userInfo.firstName} {userInfo.lastName}
            </p>
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
