import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/api/auth/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "signin/" + username + "/" + password , {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name: string, email: string, password: string , age :string, location : string, sex :string, sexPreference:string) {
    console.log(name);
    return axios.post(API_URL + "signup",null, { params :  {
      name,
      email,
      password,
      age,
      location,
      sex, 
      sexPreference}
    });
  }

  getCurrentUser() {
    console.log("current user");
    
    const userStr = localStorage.getItem("user");
    console.log(userStr)
    if (userStr) return JSON.parse(userStr);

    return null;
  }



updateUser (name: string, email: string, password: string , age :string, location : string, sex :string, sexPreference:string , description: string ) {
  console.log(name);
  return axios.put("http://localhost:5000/api/users/update"  ,null, { params :  {
    name,
    email,
    password,
    age,
    location,
    sex, 
    sexPreference,
    description}
   , headers: authHeader() }) .then(response => {
   
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(JSON.stringify(response.data));
  

    return response.data;
  });
}

}

export default new AuthService();

