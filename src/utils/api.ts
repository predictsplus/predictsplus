import axios from "axios";

const fetchWithAuth = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  return fetch(url, { ...options, headers });
};
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5789"

export const core_services = {
  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "",
          },
        }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  registerUser: async ({
    name,
    age,
    email,
    password,
  }: {
    name: string;
    age: number;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          name,
          age,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "", 
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getBets: async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/api/bets`);
    return res.json();
  },
};
