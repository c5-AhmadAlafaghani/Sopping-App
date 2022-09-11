const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  createNewProduct,
  getAllProduct,
  deleteProductById,
  updateProductById,
  getProductById,
} = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.post("/create", authentication, createNewProduct);
productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);
productsRouter.delete("/:id", authentication, deleteProductById);
productsRouter.put("/:id", authentication, updateProductById);

module.exports = productsRouter;
