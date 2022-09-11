const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/roles");


const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});