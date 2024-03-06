const express = require("express");

const router = express.Router();
const CarController = require("./../database/DBsetup");
const authController = require("./../database/DBsetup");
const userController = require("./../database/DBsetup");
const adminContoller = require("./../database/DBsetup");
const locationController = require("./../database/DBsetup");
const BookingController = require("./../database/DBsetup");

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/verify-token").get(authController.verifyToken);

router
  .route("/dashboard/manage-cars")
  .get(CarController.getCarsAdmin)
  .post(CarController.insertCarData);

router
  .route("/dashboard/manage-location")
  .get(locationController.getallLocations)
  .post(locationController.addLocation);

router
  .route("/dashboard/manage-location/:id")
  .delete(locationController.deleteLocation);

router.route("/user/cars/by-location").post(CarController.getCarByLocation);

router
  .route("/dashboard/manage-cars/:id")
  .get(CarController.getCarById)
  .delete(CarController.deleteCar);

router.route("/cars").get(CarController.getCarUser);

router.route("/dashboard/manage-users/users").get(userController.getAllUsers);

router
  .route("/dashboard/manage-users/users/:id")
  .delete(userController.deleteUsers);

router
  .route("/dashboard/admin")
  .get(adminContoller.getAllAdmins)
  .post(adminContoller.addAdmin);
router
  .route("/dashboard/admin/:id")
  .put(adminContoller.editAdmin)
  .delete(adminContoller.deleteAdmin);

router
  .route("/dashboard/manage-bookings")
  .get(BookingController.getAllBookings);

module.exports = router;
