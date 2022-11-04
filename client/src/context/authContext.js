import axiosClient from '../api/axios.js';
import {createContext, useState, useEffect} from 'react'; 

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))

   useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(currentUser))
   },[currentUser])

   const login = async (inputs) => {
      const res =  await axiosClient.post("/api/auth/login", inputs);
      setCurrentUser(res.data)
   };

   const logout = async () => {
      await axiosClient.post("/api/auth/logout");
      setCurrentUser(null)
   };

   return  (
      <AuthContext.Provider value={{currentUser, login, logout}}>
         {children}
      </AuthContext.Provider>
      )
}