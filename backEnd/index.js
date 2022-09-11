const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers



const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware


const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});