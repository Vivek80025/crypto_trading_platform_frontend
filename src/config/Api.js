import axios from "axios";
// export const API_URL = "http://localhost:5455"
export const API_URL = "https://trading-project-backend.zeabur.app" 
export const Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});