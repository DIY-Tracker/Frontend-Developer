import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  console.log(token);
  return axios.create({
    baseURL: 'https://diy-tracker.herokuapp.com',
    headers: {
      'Authorization': `Bearer ${token}`
      //content type may need to be added since Java is the backend.
    }
  });
};