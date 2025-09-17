import axios from "axios";

const API = axios.create({
  // baseURL: "https://organizer-server-uek2.onrender.com/api",
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("JWT Error -> Going to Login Page")
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

class APIRequests {
  static async signIn(data) {
    return await API.post("/auth/login", data);
  }
  static async verifyOTP(data) {
    return await API.post("/auth/otp", data);
  }
  static async signUp(data) {
    return await API.post("/auth/register", data);
  }
  static async getHospitals() {
    return await API.get("/hospital");
  }
  static async getUser(data) {
    return await API.post("/auth/getdata", data);
  }
  static async getDonors() {
    return await API.get("/donor");
  }
  static async getRecipients() {
    return await API.get("/receiver");
  }
  static async getMatches(data) {
    // data: {
      // organ: "Heart",
      // expiry_hours: 24,
    // }
    return await API.post("/hospital/match", data);
  }
  static async getOrgans () {
    return await API.get("/receiver/organs");
  }
  static async matchOrgan (data) {
    return await API.post("/receiver/transplant", data);
  }
}

export default APIRequests;