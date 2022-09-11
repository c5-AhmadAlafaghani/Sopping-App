const express = require("express");

const { addToFavorite, removeFromFavorite } = require("../controllers/favorite");
const authentication = require("../middlewares/authentication");

const favoriteRouter = express.Router();

favoriteRouter.put("/Add/:product_id",authentication,addToFavorite);
favoriteRouter.put("/:product_id",authentication,removeFromFavorite);

module.exports = favoriteRouter;