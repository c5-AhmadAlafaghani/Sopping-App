const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const productsRouter = require("./routes/products");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/products", productsRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
