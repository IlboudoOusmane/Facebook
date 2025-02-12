import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});


AxiosInstance.interceptors.request.use(
    (config) => { // contient la configuration de la requête.
      const token = localStorage.getItem('token'); 
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; 
      }
      return config; 
    },
    (error) => {
      return Promise.reject(error); 
    }
  );
  


AxiosInstance.interceptors.response.use(
  (response) => { // contient les données retournées par le serveur
    return response; 
    
  },
  (error) => {
    if (error.response) { // si l'authentification échouée 
      window.location.href = '/login'; 
      
    } 
    return Promise.reject(error); 
  }
  
);

export default AxiosInstance;

