const connection = require("../models/db");

const addToFavorite = (req, res) => {
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `INSERT INTO favorit (product_id ,user_id) VALUES (?,?);`;
  const data = [product_id, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      massage: `Product Added to favorite list`,
      result: result,
    });
  });
};

const removeFromFavorite = (req, res) => {
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `UPDATE favorit SET is_deleted=1 WHERE  user_id=? AND product_id=?;`;
  const data = [user_id, product_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Product removed from favorite list`,
      result: result,
    });
  });
};

//View favorit
const viewFavorit = (req, res) => {
  const id = req.token.userId;

  const query = `SELECT  products.id, productName,img,price,amount FROM favorit INNER JOIN  products ON  favorit.product_id =products.id WHERE favorit.user_id=? AND favorit.is_deleted = 0 ;`;
  const data = [id];
  console.log(data);

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err.message,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Products In favorite `,
      result: result,
    });
  });
};

module.exports = { addToFavorite, removeFromFavorite, viewFavorit };
