import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import { Route, Navigate, useLocation } from 'react-router-dom';


const verifyToken = async (token) => {
    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken,isExpired)
    if(decodedToken&&!isExpired){
        return true
    }
    else{
        return false
    }
  
};

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(token)
        const isValid =  verifyToken(token);
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/auth/sign-in" state={{ from: location.pathname }} replace  />;
};

export default PrivateRoute;
