import axios from "axios";


const axiosClient = axios.create({
   baseURL: 'http://localhost:8800',
   withCredentials: true,
   
 });

 export default axiosClient;