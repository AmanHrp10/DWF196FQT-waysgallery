import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://waysgallery-api.herokuapp.com/api/v1',
});

export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};
