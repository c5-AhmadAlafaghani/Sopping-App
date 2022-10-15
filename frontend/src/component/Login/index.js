import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";


export const Login = ({setIslog}) => {

  let navigate = useNavigate();
 
  // ===================================
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  // ===================================

  const loginn = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
       const token = result.data.token
       localStorage.setItem('token',token );
       setIslog(true)
       navigate(`/home`)
      
       
      })

      .catch((err) => {
        setMessage("Error, pleas check your email or password and try to login again");
      });
  };

 

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
          <p>If you are not registered please sign up <Link to={`/register`}>here</Link>. </p>
        </div>
      </div>
    </>
  );
};
