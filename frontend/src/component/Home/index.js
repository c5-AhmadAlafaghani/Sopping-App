import React, { useState, useEffect } from "react";
import axios from "axios";

export function Home() {
  const [products, setProducts] = useState([]);
  const allProduct = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        console.log(result.data.result);
        setProducts(result.data.result);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    allProduct();
  }, []);

  return (
    <div>
      {products.map((element, index) => {
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
