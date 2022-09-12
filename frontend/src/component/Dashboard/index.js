import React, { useState, useEffect } from "react";
import axios from "axios";
export function Dashboard() {
  const token = localStorage.getItem("token");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const createProduct = () => {
    const product= {
        productName,
        description,
        img,
        price}
    axios
      .post(`http://localhost:5000/products/create`,product, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
   
    <div className="Create_Product_div">
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="Image link"
                    onChange={(e) => {
                      setImg(e.target.value);
                    }}
                  />
           
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="The description of product"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <input
                    className="Create_Product_inputs"
                    type="text"
                    placeholder="The price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <button
                    className="Create_button"
                    onClick={() => {
                      createProduct();
                    }}
                  >
                    Create
                  </button>
                </div>
  );
}
