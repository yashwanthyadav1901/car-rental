const db = require("./../database/database");

exports.getallBookings = (req, res) => {
  query = "select * from bookings";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({
        message: "bookings data not found",
      });
    }
    res.status(200).json(results);
  });
};

module.exports = exports;
