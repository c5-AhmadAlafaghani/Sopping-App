import React, { useState, useEffect } from "react";
import axios from "axios";


export function Favorite() {

  const [favorite, setFavorite] = useState([]);

  
  // const addToFavorite = (id) => {
  //   axios
  //     .put(`http://localhost:5000/favorite/add/${id}`)
  //     .then((result) => {
  //       console.log(result.data);
  //       setFavorite(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  const viewFavoriteList = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        setFavorite(result.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    viewFavoriteList();
  }, []);

  return (
    <div>
      {favorite.map((element, index) => {
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
