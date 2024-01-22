const db = require("./../database/database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.getAllCarsUser = (req, res) => {
  const query = "SELECT * FROM car_details WHERE is_capacity = TRUE";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({ error: "error fetching car data" });
    }
    if (results) {
      res.status(200).json({ results });
    }
  });
};

exports.getAllCarsAdmin = (req, res) => {
  const query = "SELECT * FROM car_details";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({ error: "error fetching car data" });
    }
    if (results) {
      res.status(200).json(results);
    }
  });
};

exports.getCarbyId = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM car_details where id = ?";
  db.query(query, id, (err, results) => {
    if (err) {
      res.status(404).json({ error: "error fetching car-details", err });
    }
    if (results) {
      res.status(200).json({ results });
    }
  });
};

exports.getCarsByLocation = (req, res) => {
  const location = req.body.location;
  console.log(location);
  const query = "SELECT * FROM car_details WHERE location = ?";

  db.query(query, location, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error fetching car details", err });
    } else {
      res.status(200).json({ results });
    }
  });
};

exports.insertCarData = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle Multer error
      return res.status(500).json({ error: "Error uploading file", err });
    }

    // Access file information from req.file
    const image_path = req.file.filename;

    const model = req.body.model;
    const brand = req.body.brand;
    const year = req.body.year;
    const license_plate = req.body.license_plate;
    const baggage = req.body.baggage;
    const fuel = req.body.fuel;
    const manual = req.body.manual;
    const seat = req.body.seat;
    const rent_per_day = req.body.rent_per_day;
    const location = req.body.location;

    const query = `INSERT INTO car_details
      (model, brand, year, license_plate, baggage, fuel, manual, seat, rent_per_day, location, image_path) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      model,
      brand,
      year,
      license_plate,
      baggage,
      fuel,
      manual,
      seat,
      rent_per_day,
      location,
      image_path,
    ];
    console.log(values);
    db.query(query, values, (err, result) => {
      if (err) {
        res.json({ error: "Error inserting car data", err });
      } else {
        res.status(200).json({ message: "Car data inserted successfully" });
      }
    });
  });
};

exports.deleteCar = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM car_details where id = ?";
  db.query(query, id, (err) => {
    if (err) {
      res.json({ error: "error deleting car information" });
    } else {
      res.json({ message: "car data deleted successfully" });
    }
  });
};

module.exports = exports;
