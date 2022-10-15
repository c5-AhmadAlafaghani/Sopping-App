import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function Home() {
  const Navigate = useNavigate();

  const [products, setProducts] = useState([]);

  let decoded = 0;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwt_decode(token);
    decoded = decoded.userId;
  }

  const allProduct = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteProductById = (product_id) => {
    axios
      .put(
        `http://localhost:5000/products/delete/${product_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        allProduct();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const addToVavorite = (id)=>{
    console.log(id);
    axios.put(`http://localhost:5000/favorite/Add/${id}`,{},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      console.log(result.data);
      
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  useEffect(() => {
    allProduct();
  }, []);

  return (
    <div>
      {products.map((element) => {
        return (
          <div key={element.id}>
            <div className="product-big-dev">
              <div className="Product-Img-Div">
                <img
                  className="img"
                  src={element.img}
                  onClick={() => {
                    Navigate(`/product/${element.id}`);
                  }}
                />
              </div>
              <div className="productName-description" onClick={() => {}}>
                <div className="productName" onClick={() => {}}>
                  {" "}
                  {element.productName}
                </div>
                <div className="description" onClick={() => {}}>
                  {" "}
                  {element.description}
                </div>
                <div className="price" onClick={() => {}}>
                  {element.price} JD
                </div>
                <div>
                  <button
                    className="addToFavorite"
                    onClick={() => {
                      addToVavorite(element.id);
                    }}
                  >
                    Add to favorite
                  </button>
                  {decoded === element.user_id ? (
                    <>
                      <button
                        onClick={() => {
                          deleteProductById(element.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="update"
                        onClick={() => {
                          Navigate(`/update/${element.id}`);
                        }}
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
