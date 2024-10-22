import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../utils/query";

function UserInfo() {
  // Interface for user info "like a Go struct"
  interface userInfoInterface {
    id: string;
    username: string;
    campus: string;
    firstName: string;
    lastName: string;
    lastActivity: string;
  }

  // State for user info, initialized to an empty object
  const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null);
  // Error and loading state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const userQuery = `{
        user {
          id
          login
          campus
          attrs
        }
      }`;

      const activityQuery = `{
        progress (where: {isDone: {_eq: true}, grade: {_gte: 1}} order_by: {id: desc}) {
          id
          object {
            type
            name
          }
        }
      }`;

      try {
        const userData = await fetchGraphQL(userQuery);
        const activityData = await fetchGraphQL(activityQuery);

        // Check if data exists
        if (
          userData &&
          userData.user &&
          userData.user.length > 0 &&
          activityData
        ) {
          // Destructure the user data
          const {
            id,
            login: username,
            campus,
            attrs: { firstName, lastName },
          } = userData.user[0];

          // Format the activity data
          const progress = activityData.progress;
          const lastActivity = `${
            progress[0].object.type.charAt(0).toUpperCase() +
            progress[0].object.type.slice(1)
          } - ${progress[0].object.name}`;

          setUserInfo({
            id,
            username,
            campus,
            firstName,
            lastName,
            lastActivity,
          });
        } else {
          setError("Could not fetch user data");
        }
      } catch (error: any) {
        setError(
          error.message ||
            "An unexpected error occurred while fetching user data"
        );
      } finally {
        // Set loading to false after fetching data, regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {isLoading && (
        <p className="text-white text-center text-lg text-bold mb-2">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-white text-center text-lg text-bold mb-2">{error}</p>
      )}
      {userInfo ? (
        <>
          <p className="text-white text-2xl text-bold mb-2">
            <strong>ID:</strong> {userInfo.id}
          </p>
          <p className="text-white text-2xl text-bold mb-2">
            <strong>Full Name:</strong> {userInfo.firstName} {userInfo.lastName}
          </p>
          <p className="text-white text-2xl text-bold mb-2">
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p className="text-white text-2xl text-bold mb-2">
            <strong>Campus:</strong> {userInfo.campus}
          </p>
          <p className="text-white text-2xl text-bold mb-2">
            <strong>Last Activity:</strong> {userInfo.lastActivity}
          </p>
        </>
      ) : null}
    </>
  );
}

export default UserInfo;
