import React, { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { Navigate, useLocation } from 'react-router-dom';

const verifyToken = (token) => {
  try {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    return Boolean(myDecodedToken) && !isMyTokenExpired;
  } catch {
    return false;
  }
};

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const isValid = verifyToken(token);
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

  const fromFullPath = `${location.pathname}${location.search || ''}${location.hash || ''}`;

  return isAuthenticated ? element : (
    <Navigate to="/auth/sign-in" state={{ from: fromFullPath }} replace />
  );
};

export default PrivateRoute;
