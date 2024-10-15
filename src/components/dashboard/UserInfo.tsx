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
      // Setup the query to get the basic user info
      const query = `{
        user {
          id
          login
          campus
          attrs
        }
      }`;

      // Query to get the latest passed activity by the user
      const query2 = `{
        progress (where: {isDone: {_eq: true}, grade: {_gte: 1}} order_by: {id: desc}) {
          id
          object {
            type
            name
          }
        }
      }`;
      const data = await fetchGraphQL(query);
      const activityData = await fetchGraphQL(query2);

      // Check if data exists
      if (data && data.user && data.user.length > 0 && activityData) {
        // Destructure the user data
        const {
          id,
          login: username,
          campus,
          attrs: { firstName, lastName },
        } = data.user[0];

        // Destructure the activity data
        const progress = activityData.progress;
        // get the last passed activity and format it
        const lastActivity = `${
          progress[0].object.type.charAt(0).toUpperCase() +
          progress[0].object.type.slice(1)
        } - ${progress[0].object.name}`;
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
