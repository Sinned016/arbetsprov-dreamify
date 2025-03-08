"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; //

interface DecodedToken {
  email: string;
  username: string;
  userId: string;
  exp: number;
  iat: number;
}

export default function WelcomeMessage() {
  const [loggedinUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("Welcome message token: ");
      console.log(decodedToken);
      setLoggedInUser(decodedToken.username);
    }
  }, []);
  return (
    <div>
      {loggedinUser ? (
        <h1 className="text-center text-3xl font-bold">
          Welcome {loggedinUser}!
        </h1>
      ) : (
        <h1 className="text-center text-3xl font-bold">
          Thank you for logging in!
        </h1>
      )}
    </div>
  );
}
