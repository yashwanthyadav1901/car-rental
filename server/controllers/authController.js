const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./../database/database");

// Controller function for user registration
exports.register = (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);

  // Hash password using bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    const sql = "INSERT INTO users(name, email, password) VALUES (?,?,?)";
    const values = [name, email, hashedPassword];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error creating user", err });
      }
      console.log("User has been created successfully");
      res.status(201).json({ message: "User created successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.send({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.send({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.send({ message: "Error comparing passwords" });
      }
      if (!isMatch) {
        return res.send({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, is_admin: user.is_admin },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.status(200).json({ loginStatus: true, data: token });
    });
  });
};

exports.verifyToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      auth: false,
      message: "No token provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const username = decoded.email;
    const userId = decoded.userId;
    const is_admin = decoded.is_admin;
    req.user = { userId: decoded.userId, userName: decoded.userName };
    return res.status(200).json({
      message: "Token verified successfully",
      name: username,
      id: userId,
      is_admin: is_admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal error");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ logoutStatus: true, message: "Logout successful" });
};

module.exports = exports;
