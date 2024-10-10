import { getTokenFromCookie } from "./cookies";

// Define the function to perform the GraphQL query
export async function fetchGraphQL(query: string, variables?: object) {
  // Get the token from the cookie
  const token = getTokenFromCookie();

  try {
    // Send the GraphQL query
    const response = await fetch(
      "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response and return the data
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
}
