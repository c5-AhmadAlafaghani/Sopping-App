const connection = require("../models/db");

const createNewProduct = (req, res) => {
  console.log("req.token", req.token.userId);
  const id = req.token.userId;
  const { productName, img, price, description } = req.body;
  const query = `INSERT INTO products (productName,
      img,
      price,
      description,user_id
      ) VALUES (?,?,?,?,?);`;
  const data = [productName, img, price, description, id];
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
      massage: "Product created",
      result: result,
    });
  });
};

const getAllProduct = (req, res) => {
  const query = `SELECT * FROM products WHERE is_deleted=0 `;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        massage: "Ther is no products for now",
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the products",
      result,
    });
  });
};

const deleteProductById = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.userId;
  const query = `UPDATE products SET is_deleted=1 WHERE id=? AND user_id=?;`;
  const data = [id, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err.message,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `!! No product deleted`,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `product Deleted`,
      result: result,
    });
  });
};

const updateProductById = (req, res) => {
  const { productName, img, description, price } = req.body;
  const id = req.params.id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM products WHERE id=? AND user_id=?;`;
  const data = [id, user_id];

  connection.query(query, data, (err, result) => {
    console.log("result",result);
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        massage: `The product: ${id} is not found`,
        err: err,
      });
    } else {
      const query = `UPDATE products SET productName=?,img=?,description=?,price=? WHERE id=?;`;
      const data = [
        productName || result[0].productName,
        img || result[0].img,
        description || result[0].description,
        price || result[0].price,
        id,
      ];

      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)
        console.log("true");
          res.status(201).json({
            success: true,
            massage: `product updated`,
            result: result,
          });
      });
    }
  });
};

const getProductById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM products WHERE id=? AND is_deleted=0 `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        massage: "Ther is no products",
      });
    }
    return res.status(200).json({
      success: true,
      result,
    });
  });
};
module.exports = {
  getAllProduct,
  createNewProduct,
  deleteProductById,
  updateProductById,
  getProductById,
};
