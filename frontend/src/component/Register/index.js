import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="register-Pg">
      <div className="register">
        <input
          className="input"
          type={"email"}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="input"
          type={"password"}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input
          className="input"
          type={"text"}
          placeholder="User Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <input
          className="input"
          type={"text"}
          placeholder="Phone Number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />

        <input
          className="input"
          type={"text"}
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <button
          className="button"
          onClick={() => {
            axios
              .post("http://localhost:5000/register", {
                email,
                password,
                phoneNumber,
                userName,
                address,
              })

              .then((result) => {
                if (result.data.success) {
                  setMessage("Create account successfully");
                }
              })
              .catch((err) => {
                console.log(err.message);
                return setMessage("try again");
              });
          }}
        >
          Register
        </button>
        <p>{message}</p>
        <p>
          If you have already registered you can sign in{" "}
          <Link to={`/login`}>here</Link>.
        </p>
      </div>
    </div>
  );
};
