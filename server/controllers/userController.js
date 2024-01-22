const db = require("./../database/database");

exports.getAllUsers = (req, res) => {
  query = "SELECT * FROM users WHERE is_admin = FALSE";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({ error: "user data not found" });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ? AND is_admin = FALSE";
  db.query(query, userId, (err) => {
    if (err) {
      res.json({ message: "error deleting user", err });
    }
    res.json({ message: "user deleted successfully" });
  });
};

module.exports = exports;
