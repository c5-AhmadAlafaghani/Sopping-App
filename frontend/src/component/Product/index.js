import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Product() {
  let { id } = useParams();
  const [products, setProducts] = useState([]);

  console.log(products);
  const getById = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <div>
      {products.map((element) => {
        return (
          <div key={element.id}>
            <div className="product-big-dev">
              <div className="Product-Img-Div">
                <img className="img" src={element.img} />
              </div>
              <div className="productName-description">
                <div className="productName"> {element.productName}</div>
                <div className="description"> {element.description}</div>
                <div className="price">{element.price} JD</div>
                <div></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
