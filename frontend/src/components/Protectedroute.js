import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token"); //getting the token

    if (storedToken) {
        //checks if token is stored on log in
        //if the token of the user is successfully resotred next
      setIsLoggedIn(true);
    } 
    else {
      navigate("/login");
      // if no token is stored in localstorage navigates the user to login page
    }
  }, [navigate]); 

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;