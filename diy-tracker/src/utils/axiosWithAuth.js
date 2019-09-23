import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://localhost:5000/api', // This will need to be changed/taken out.
    headers: {
      Authorization: token
    }
  });
};