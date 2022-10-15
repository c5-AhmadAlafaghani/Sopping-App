import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style.css"

const Navbar = ({setIslog,isLog}) => {
  const Navigate = useNavigate();

  const logout = () => {

    setIslog(false)
    localStorage.removeItem("token");
  };
  return (
    <>
      {isLog ? (
        <div >
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
                eventKey="link-5"
                onClick={() => {
                  Navigate("/dashboard");
                }}
              >
                Add Product
              </Nav.Link>
            </Nav.Item>
           
            <Button
            className="button_l"
            variant="primary"
            type="submit"
            onClick={() => {
              logout();
              Navigate("/login");            }}
          >
            Logout
          </Button>
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
            
            <Button
            className="button_l"
            variant="primary"
            type="submit"
            onClick={() => {
              Navigate("/login");
            }}
          >
            Login
          </Button>
          <Button 
          className="button_l"
            variant="primary"
            type="submit"
            onClick={() => {
              Navigate("/register");
            }}
          >
            Register
          </Button>
          </Nav>
          
        </div>
      )}
    </>
  );
};

export { Navbar };
