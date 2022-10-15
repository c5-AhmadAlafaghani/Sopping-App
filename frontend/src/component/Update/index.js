
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


export function Update() {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const UpdateProduct = (id) => {
    const product = {
      productName,
      description, 
      img,
      price,
      
    };
    axios
      .put(`http://localhost:5000/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setMessage("The Product has been updated successfully");
      })
      .catch((err) => {
        console.log(err.message);
        setMessage("Error, The Product has not been updated ");
      });
  };
  console.log(token);
  return (
    <div className="Create_Product_div">
        <p>Update the product</p>
      {token !== null ? (
        <>
          {" "}
          <input
            className="Create_Product_inputs"
            type="text"
            placeholder="Update Product Name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <input
            className="Create_Product_inputs"
            type="text"
            placeholder="Update Image link"
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
          <input
            className="Create_Product_inputs"
            type="text"
            placeholder="Update the description of product"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            className="Create_Product_inputs"
            type="text"
            placeholder="Update The price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <button
            className="submit"
            onClick={() => {
              UpdateProduct(id);
            }}
          >
            Submit
          </button>
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

