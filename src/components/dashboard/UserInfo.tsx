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
    lastActivity: string;
  }

  // State for user info, initialized to null
  const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);

  // Get the user info on component mount "page load"
  useEffect(() => {
    // Function to fetch and set user info
    const fetchUser = async () => {
      // Setup the query to get the basic user info and the latest activity
      const query = `{
        user {
          id
          login
          campus
          attrs
          progresses (where: {isDone: {_eq: true}, grade: {_gte: 1}} order_by: {id: desc}) {
            id
            object {
              type
              name
            }
          }
        }
      }`;
      const data = await fetchGraphQL(query);

      // Check if data exists
      if (data && data.user && data.user.length > 0) {
        // Destructure the user data
        const {
          id,
          login: username,
          campus,
          attrs: { firstName, lastName },
          progresses,
        } = data.user[0];

        // get the last passed activity and format it
        const lastActivity = `${
          progresses[0].object.type.charAt(0).toUpperCase() +
          progresses[0].object.type.slice(1)
        } - ${progresses[0].object.name}`;
        // Set the user info in state
        setUserInfo({
          id,
          username,
          campus,
          firstName,
          lastName,
          lastActivity,
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {
        // Display the user info
        userInfo ? (
          <>
            <p className="text-white text-lg text-bold mb-2">
              ID: {userInfo.id}
            </p>
            <p className="text-white text-lg text-bold mb-2">
              Full Name: {userInfo.firstName} {userInfo.lastName}
            </p>
            <p className="text-white text-lg text-bold mb-2">
              Username: {userInfo.username}
            </p>
            <p className="text-white text-lg text-bold mb-2">
              Campus: {userInfo.campus}
            </p>
            <p className="text-white text-lg text-bold mb-2">
              Last Activity: {userInfo.lastActivity}
            </p>
          </>
        ) : (
          <p className="text-white text-lg text-bold mb-2">Loading...</p>
        )
      }
    </>
  );
}

export default UserInfo;
