import axios from 'axios';

export const login = async (email, password) => {
   const {data} = await axios.post("/api/users/login", {email, password});
   localStorage.setItem("token", data.token);
   return data.user;
};

export const register = async (name, email, password) => {
    const {data} = await axios.post("/api/users/register", {name, email, password});
    localStorage.setItem("token", data.token); // Uncommented to store token
    return data;
};
