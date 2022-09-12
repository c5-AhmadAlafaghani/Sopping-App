import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({setIslog,isLog}) => {
  const Navigate = useNavigate();

  const logout = () => {

    setIslog(false)
    localStorage.removeItem("token");
  };
  return (
    <>
      {isLog ? (
        <div>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  Navigate("/home");
                }}
              >
                Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => {
                  Navigate("/basket");
                }}
              >
                Cart
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => {
                  Navigate("/favorite");
                }}
              >
                Favorite
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                onClick={() => {
                  logout();
                  Navigate("/login");
                }}
              >
                logout
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-5"
                onClick={() => {
                  Navigate("/dashboard");
                }}
              >
                Add Product
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      ) : (
        <div>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  Navigate("/home");
                }}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                onClick={() => {
                  Navigate("/login");
                }}
              >
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-4"
                onClick={() => {
                  Navigate("/register");
                }}
              >
                Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      )}
    </>
  );
};

export { Navbar };
