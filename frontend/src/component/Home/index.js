import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export function Home() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [price, setPrice] = useState("");

  let decoded = 0;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwt_decode(token);
    decoded = decoded.userId;
  }

  const updateProductById = (element) => {
    setUpdateBox(!updateBox);
    // setItemId(element.id);
    setProductName(element.productName);
    setPrice(element.price);
    setDescription(element.description);
    if (updateBox) updateItem(element.id);
  };

  const allProduct = () => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        console.log(result.data.result);
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const updateItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/products/${id}`,
        {
            productName,
            description,
            price,
          },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      allProduct();
    } catch (error) {
      console.log(error);
    }
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
                <div>
                  {decoded === element.user_id ? (
                    <>
                      {/* <button
                        onClick={() => {
                          updateProductById(element.id);
                        }}
                      >
                        update
                      </button> */}
                      {updateBox  === element.id && (
                        <form>
                          <br />
                          <input
                            type="text"
                            defaultValue={element.title}
                            placeholder="item title here"
                            onChange={(e) => setProductName(e.target.value)}
                          />
                          <br />

                          <input
                            placeholder="item price here"
                            defaultValue={element.price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </form>
                      )}{" "}
                      <button
                        onClick={() => {
                          deleteProductById(element.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                    className="update"
                    onClick={() => updateItem(element)}
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
