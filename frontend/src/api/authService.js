import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; 
  }
};
