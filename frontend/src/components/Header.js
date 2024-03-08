import React, { useState, useEffect } from "react";

function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("email");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); //string that gets the user's email that get posted in the header when they are logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.localStorage.removeItem("isLoggedin");
    window.location.href = "/login";
    //remove the token, email , and isLoggedin, log outs the user and navigates them to log in page
  };

  return (
    <nav>
      <span>{username}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Header;
