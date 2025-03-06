import axios from "axios";
const urlBase = "http://localhost:3000";

export const signIn = async (username, email) => {
  try {
    const response = await axios.post(`${urlBase}/auth/login`, {
      username,
      email,
    });
    return response;
  } catch (error) {
    alert("error");
  }
};

export const signUp = async (cred) => {
  try {
    const response = await axios.post(`${urlBase}/user/create-user`, cred);
    return response;
  } catch (error) {
    alert("error");
  }
};
