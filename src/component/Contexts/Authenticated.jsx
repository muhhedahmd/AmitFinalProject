import axios from 'axios';
import{ createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const  [user, setUser] = useState({
    "username": "",
    Name: "",

    email : "",
    "image":""
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async()=>{
 
  await      axios.get('https://dummyjson.com/auth/me', {
       method: 'GET',
       headers: {
         'Authorization': localStorage.getItem("token"), 
       }, 
     })
     .then(res => {
       setUser(
        {
          "username": res.data.username,
          email : res.data.email,
          "Name" : res.data.firstName + " " +  res.data.firstName,
          "image":res.data.image

        }
       )
 
     })
     .then(console.log);
    })()

    if (token) setIsAuthenticated(true);
    
  }, []);

  





  const login = () => {
    setIsAuthenticated(true);

  };

  const logout = () => {
  localStorage.removeItem("token");
    
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated  , login, logout  , setUser , user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
