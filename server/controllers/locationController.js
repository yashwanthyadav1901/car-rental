const db = require("./../database/database");

exports.getAllLocations = (req, res) => {
  const sql = "SELECT * FROM locations";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
};

exports.AddLocations = (req, res) => {
  const sql = "INSERT INTO locations (`name`) VALUES (?)";
  db.query(sql, [req.body.locations], (err) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
};

exports.deleteLocation = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM locations WHERE id = ?";
  db.query(query, id, (err) => {
    if (err) {
      res.json({ message: "error deleting location" });
    }
    res.json({ message: "location deleted successfully" });
  });
};
