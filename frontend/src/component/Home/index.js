import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "./style.css"
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
  const addToVavorite = (id) => {
    console.log(id);
    axios
      .put(
        `http://localhost:5000/favorite/Add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    allProduct();
  }, []);

  return (
    <div className="main">
     
      {products.map((element) => {
        return (
          <Card style={{ width: "18rem" }} key={element.id} >
            

                <Card.Img variant="top"
                  className="img"
                  src={element.img}
                  onClick={() => {
                    Navigate(`/product/${element.id}`);
                  }}
                />
                 <Card.Body>
          <Card.Title>{element.productName}</Card.Title>
          <Card.Text>
          {element.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{element.price} JD</ListGroup.Item>
        </ListGroup>  
                <div>
                  {token ? (<>
                    <Card.Body>
                    <Card.Link  onClick={() => {
                        addToVavorite(element.id);
                      }}>Add to favorite</Card.Link>
                    
                  </Card.Body>
                    

                    </>) : (
                    <></>
                  )}

                  {decoded === element.user_id ? (
                    <>
                    <Button
                    className="button_g"
            variant="primary"
            type="delete"
            onClick={() => {
              deleteProductById(element.id);
            }}
          >
            Delete
          </Button>
          <Button
          className="button_g"
            variant="primary"
            type="update"
            onClick={() => {
              Navigate(`/update/${element.id}`);
            }}
          >
            Update
          </Button>
                     
                    </>
                  ) : (
                    <></>
                  )}
                </div>
            </Card>
        );
      })}
    </div>
  );
}
