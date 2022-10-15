import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css"
export const Login = ({ setIslog }) => {
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
        const token = result.data.token;
        localStorage.setItem("token", token);
        setIslog(true);
        navigate(`/home`);
      })

      .catch((err) => {
        setMessage(
          "Error, pleas check your email or password and try to login again"
        );
      });
  };

  return (
    <>
      <div className="login">
        <Form   onSubmit={(e) => {
          e.preventDefault();
        }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            className="form"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              loginn();
            }}
          >
            Submit
          </Button>
        </Form>

        <p>{message}</p>
        <p>
          If you are not registered please sign up{" "}
          <Link to={`/register`}>here</Link>.{" "}
        </p>
      </div>
    </>
  );
};
