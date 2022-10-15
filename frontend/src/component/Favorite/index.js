import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function Favorite() {

  const [favorite, setFavorite] = useState([]);
  const token = localStorage.getItem("token");

  let { id } = useParams();



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
  const removeFromFavorite =(id)=>{
axios.put(`http://localhost:5000/favorite/${id}`,{},
{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then((result) => {
  console.log(result.data);
  viewFavoriteList()
})
.catch((err) => {
  console.log(err.message);
});
  }
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
                <button onClick={()=>{
                  removeFromFavorite(element.id)
                }}>Remove from favorite</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
