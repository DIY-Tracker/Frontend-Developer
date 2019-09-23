import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://diy-tracker.herokuapp.com', // This will need to be changed/taken out.
    headers: {
      Authorization: token
      //content type may need to be added since Java is the backend.
    }
  });
};