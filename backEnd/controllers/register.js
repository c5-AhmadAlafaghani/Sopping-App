const connection = require("../models/db");
const bcrypt = require("bcrypt");
const salt = 10;

const register = async (req, res) => {
  const { userName, phoneNumber, address, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users ( userName,phoneNumber,address, email, password ) VALUES (?,?,?,?,?)`;
  const data = [
    userName,
    phoneNumber,
    address,
    email.toLowerCase(),
    encryptedPassword,
  ];
  connection.query(query, data, (err, result) => {
    console.log();
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err.message,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result,
    });
  });
};

module.exports = {
  register,
};
