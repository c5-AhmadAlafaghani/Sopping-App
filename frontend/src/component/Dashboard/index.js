import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css"
export function Dashboard() {
  const token = localStorage.getItem("token");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const createProduct = () => {
    const product = {
      productName,
      description,
      img,
      price,
    };
    axios
      .post(`http://localhost:5000/products/create`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setMessage("The Product has been created successfully");
      })
      .catch((err) => {
        console.log(err.message);
        setMessage("Error, The Product has not been created successfully");
      });
  };
  return (
    <div className="Create_Product_div">
      {token !== null ? (
        <>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product Name"  onChange={(e) => {
              setProductName(e.target.value);
            }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image link</Form.Label>
        <Form.Control type="text" placeholder="Image link" onChange={(e) => {
              setImg(e.target.value);
            }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>The description of product</Form.Label>
        <Form.Control type="text" placeholder="The description of product" onChange={(e) => {
              setDescription(e.target.value);
            }} />
      </Form.Group>
        </Form>
         
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>The price</Form.Label>
        <Form.Control type="text" placeholder="The price"  onChange={(e) => {
              setPrice(e.target.value);
            }} />
      </Form.Group>
      <Button variant="primary" type="submit"  onClick={() => {
              createProduct();
            }}>
        Submit
      </Button>
         
          <p>{message}</p>
        </>
      ) : (
        <p>
          you cant reach this page before <Link to={`/login`}>login</Link>, If
          you are not registered, you can register{" "}
          <Link to={`/register`}>here</Link>{". "}
        </p>
      )}
    </div>
  );
}
