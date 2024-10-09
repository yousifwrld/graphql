import Cookies from "js-cookie";

function setCookies(value: string) {
  Cookies.set("token", value, { expires: 1 / 24, path: "/" });
}

function getUserIdFromCookie() {
  // Get the token from the cookie
  const token = Cookies.get("token");
  // Decode the token to get the userId

  if (token) {
    // Decode then parse the payload part of the token
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    // Extract the userId from the token
    const userId =
      decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"];
    return userId;
  }
}

function getTokenFromCookie() {
  return Cookies.get("token");
}

export { setCookies, getUserIdFromCookie, getTokenFromCookie };
