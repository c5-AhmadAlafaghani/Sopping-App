import React, {  useState } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";


export const Login = () => {

 
  // ===================================
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  //===================================

  const loginn = () => {
    console.log(email,
        password,);
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
       console.log(result.data.token);
       const token = result.data.token
       localStorage.setItem('token',token );

      })

      .catch((err) => {
        setMessage("Error happened while Login, please try again");
      });
  };

  //===============================================================

  return (
    <>
      <div className="Form">
       

        <div className="loginns">
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="button"
            onClick={() => {
              loginn();
            }}
          >
            Login
          </button>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};
