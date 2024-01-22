const db = require("./../database/database");
const bcrypt = require("bcrypt");

exports.getAllAdmins = (req, res) => {
  const query = "SELECT * FROM users WHERE is_admin = TRUE";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({
        message: "admin data not found",
      });
    }
    res.status(200).json(results);
  });
};

exports.AddAdmin = (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);

  // Hash password using bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    const sql =
      "INSERT INTO users(name, email, password, is_admin) VALUES (?,?,?,?)";
    const values = [name, email, hashedPassword, true];

    db.query(sql, values, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error creating admin", err });
      }
      console.log("admin has been created successfully");
      res.status(201).json({ message: "admin created successfully" });
    });
  });
};

exports.editAdminData = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const query = "UPDATE users SET ? WHERE id = ? AND WHERE is_admin= TRUE";
  db.query(query, [updatedData, id], (err) => {
    if (err) {
      res.json({ message: "admin data not updated" });
    }
    res.json({ message: "admin data updated successfully" });
  });
};

exports.deleteAdmin = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM users WHERE id = ? AND is_admin = TRUE";
  db.query(query, id, (err) => {
    if (err) {
      res.json({ message: "error deleting admin" });
    }
    res.json({ message: "admin deleted successfully" });
  });
};

module.exports = exports;
