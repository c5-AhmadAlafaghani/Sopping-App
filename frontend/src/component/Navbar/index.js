import Nav from "react-bootstrap/Nav";
import {  useNavigate } from "react-router-dom";
const Navbar = () => {

  const Navigate=useNavigate()
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link  onClick={()=>{Navigate("/home")}}>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={()=>{Navigate("/basket")}}>Cart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={()=>{Navigate("/favorite")}}>Favorite</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" onClick={()=>{Navigate("/login")}}>Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-4" onClick={()=>{Navigate("/register")}}>Register</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-5" onClick={()=>{Navigate("/dashboard")}}>Add Product</Nav.Link>
      </Nav.Item>
      <Nav.Item>
       
      </Nav.Item>
    </Nav>
  );
};

export { Navbar };
