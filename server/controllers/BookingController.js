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

exports.addBookings = (req, res) => {
  const {
    carid,
    userid,
    pickuplocation,
    dropofflocation,
    pickupdate,
    dropofdate,
  } = req.body;

  const sql =
    "INSERT INTO bookings (user_id, car_id, pickup_location, dropoff_location, pickup_date, dropoff_date) VALUES (?,?,?,?,?,?)";

  const values = [
    userid,
    carid,
    pickuplocation,
    dropofflocation,
    pickupdate,
    dropofdate,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json({ error: "error adding booking", err });
    }
    res.status(201).json({ message: "booking added successfully" });
  });
};

module.exports = exports;
