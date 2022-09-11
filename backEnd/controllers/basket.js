const connection = require("../models/db");

//add to cart  depend on the login | token userId
const addAndUpdateToCart = (req, res) => {
  let quantity = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM basket WHERE product_id=? AND user_id=? AND is_deleted = 0 `;
  const data = [product_id, user_id];
  console.log("data", data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length) {
      result[0].amount = quantity + result[0].amount;
      const query = `UPDATE basket SET amount=? WHERE product_id=? AND is_deleted = 0`;
      const data = [result[0].amount, result[0].product_id];
      connection.query(query, data, (err, results) => {
        if (results.affectedRows != 0) {
          return res.status(201).json({
            success: true,
            massage: `Product Amount Updated +1`,
            result: results,
          });
        } else {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    } else {
      const query = `INSERT INTO basket (product_id ,user_id) VALUES (?,?);`;
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
          massage: `Product Added to Basket`,
          result: result,
        });
      });
    }
  });
};

//View Cart
const viewCart = (req, res) => {
  const id = req.token.userId;

  const query = `SELECT  products.id, productName,img,price,amount FROM basket INNER JOIN  products ON  basket.product_id =products.id WHERE basket.user_id=? AND basket.is_deleted = 0 ;`;
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
      massage: `Products In Cart `,
      result: result,
    });
  });
};

// Remove product from Cart
const removefromcart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.product_id;

  const query = `UPDATE basket SET is_deleted=1 
    WHERE user_id=? AND product_id=?;`;
  const data = [user_id, product_id];
  console.log("data", data);
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        massage: `Product removed `,
        result: result,
      });
    }
  });
};


// empty cart

const emptyCart = (req, res) => {
  const user_id = req.token.userId;
  const query = `UPDATE basket SET is_deleted=1 
    WHERE user_id=?;`;
  const data = [user_id];
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Products removed `,
        result: result,
      });
    }
  });
};

module.exports = {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  emptyCart,
};
