import axios from "axios";
// import env from "./env";

const DATABASE_URL = "http://localhost:3000/";
const API_KEY = 1;
const API_VERSION = 0.1;

const instance = axios.create({
  baseURL: DATABASE_URL,
  timeout: 10000,
  headers: {
    ApiKey: API_KEY,
    ApiVersion: API_VERSION,
    "Content-Type": "application/json"
  }
});

export default instance;
