export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);
   console.log(user)
  if (user && user.token) {
    console.log(user.token)
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': user.token };       // for Node.js Express back-end
  } else {
    console.log("no token")
    return {};
  }
}