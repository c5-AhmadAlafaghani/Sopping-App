import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css"

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
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
            setEmail(e.target.value);
          }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="User Name" onChange={(e) => {
            setUserName(e.target.value);
          }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="Phone Number" onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }} />
      </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={() => {
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
          }}>
        Submit
      </Button>
  


       

       
        <p>{message}</p>
        <p>
          If you have already registered you can sign in{" "}
          <Link to={`/login`}>here</Link>.
        </p>
      </div>
    </div>
  );
};
