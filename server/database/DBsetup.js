const db = require("./database");
const car_controller = require("./../controllers/CarController");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const adminController = require("./../controllers/adminContoller");
const LocationController = require("./../controllers/locationController");
const BookingController = require("./../controllers/BookingController");

// async function setupDatabase() {
//   try {
//     await db.connectAsync();

//     // Drop tables if they exist
//     await db.queryAsync("DROP TABLE IF EXISTS car_details");
//     await db.queryAsync("DROP TABLE IF EXISTS locations");
//     await db.queryAsync("DROP TABLE IF EXISTS users");

//     // Create locations table
//     const createLocationTableQuery = `
//       CREATE TABLE locations (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255)
//       )`;
//     await db.queryAsync(createLocationTableQuery);

//     // Insert data into locations table
//     const insertLocationData = `INSERT INTO locations (name) VALUES
//       ('Hyderabad'),
//       ('Warangal'),
//       ('Secunderabad'),
//       ('Karimnagar'),
//       ('Nizamabad'),
//       ('Khammam'),
//       ('Mahbubnagar'),
//       ('Adilabad'),
//       ('Nalgonda'),
//       ('Jagtial')`;
//     await db.queryAsync(insertLocationData);

//     // Create car_details table
//     const createCarDetailsTableQuery = `
//       CREATE TABLE car_details (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         model VARCHAR(255),
//         brand VARCHAR(255),
//         year INT,
//         license_plate VARCHAR(20),
//         is_available BOOLEAN DEFAULT TRUE,
//         baggage INT,
//         fuel VARCHAR(50),
//         manual VARCHAR(50),
//         seat INT,
//         rent_per_day INT,
//         location VARCHAR(255),
//         image_path VARCHAR(255)
//       )`;
//     await db.queryAsync(createCarDetailsTableQuery);

//     // Insert data into car_details table
//     const insertCarDetailsQuery = `
//       INSERT INTO car_details (model, brand, year, license_plate, is_available, baggage, fuel, manual, seat, rent_per_day, location, image_path)
//       VALUES ('Tigor', 'Tata', 2022, 'ABC123', TRUE, 5, 'Petrol', 'manual', 5, 150.00, 'Hyderabad', 'wallpaper.jpg')`;
//     await db.queryAsync(insertCarDetailsQuery);

//     // Create users table
//     const createUsersTableQuery = `
//       CREATE TABLE users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         is_admin BOOLEAN DEFAULT FALSE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )`;
//     await db.queryAsync(createUsersTableQuery);

//     // Insert data into users table
//     const insertUserDataQuery = `
//     INSERT INTO users (name, password, email, is_admin)
//     VALUES
//         ('yashwanth', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'yashwanth@gmail.com', TRUE),
//         ('yashu', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'yashu@gmail.com', FALSE),
//         ('user1', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user1@example.com', FALSE),
//         ('user2', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user2@example.com', FALSE),
//         ('user3', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user3@example.com', FALSE),
//         ('user4', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user4@example.com', FALSE),
//         ('user5', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user5@example.com', TRUE),
//         ('user6', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user6@example.com', FALSE),
//         ('user7', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user7@example.com', FALSE),
//         ('user8', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user8@example.com', FALSE),
//         ('user9', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user9@example.com', TRUE),
//         ('user10', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user10@example.com', FALSE),
//         ('user11', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user11@example.com', FALSE),
//         ('user12', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user12@example.com', FALSE),
//         ('user13', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user13@example.com', FALSE),
//         ('user14', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user14@example.com', FALSE),
//         ('user15', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user15@example.com', FALSE),
//         ('user16', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user16@example.com', FALSE),
//         ('user17', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user17@example.com', FALSE),
//         ('user18', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user18@example.com', FALSE),
//         ('user19', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user19@example.com', FALSE),
//         ('user20', '$2b$10$S6XKr20VWhhRfAXiQWJw4eQNvXxx4UJULBhbppIioQkkpOflANPK2', 'user20@example.com', FALSE)
// `;
//     await db.queryAsync(insertUserDataQuery);

//     const createBookingsTableQuery = `
//     CREATE TABLE bookings (
//       booking_id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT,
//       car_id INT,
//       pickup_location VARCHAR(255),
//       dropoff_location VARCHAR(255),
//       pickup_date DATETIME,
//       dropoff_date DATETIME,
//       total_cost DECIMAL(10, 2),
//       FOREIGN KEY (user_id) REFERENCES users(id),
//       FOREIGN KEY (car_id) REFERENCES car_details(id)
//     )`;
//     await db.queryAsync(createBookingsTableQuery);

//     const insertBookingData = `
//     INSERT INTO bookings (user_id, car_id, pickup_location, dropoff_location, pickup_date, dropoff_date, total_cost)
//     VALUES
//         (1, 1, 'Airport', 'City Center', '2024-01-20 10:00:00', '2024-01-22 15:00:00', 120.00),
//         (2, 2, 'Hotel', 'Beach', '2024-02-01 14:30:00', '2024-02-05 12:00:00', 220.00);

//     `;
//     await db.queryAsync(insertBookingData);

//     console.log("Bookings table created.");

//     console.log("Database setup complete.");
//   } catch (error) {
//     console.error("Error setting up the database:", error);
//   } finally {
//     await db.closeAsync();
//   }
// }

// Export necessary functions and controllers
// exports.setupDatabase = setupDatabase;
exports.register = authController.register;
exports.login = authController.login;
exports.verifyToken = authController.verifyToken;

exports.logout = authController.logout;

exports.getAllUsers = userController.getAllUsers;
exports.deleteUsers = userController.deleteUser;

exports.getAllAdmins = adminController.getAllAdmins;
exports.addAdmin = adminController.AddAdmin;
exports.editAdmin = adminController.editAdminData;
exports.deleteAdmin = adminController.deleteAdmin;

exports.getCarUser = car_controller.getAllCarsUser;
exports.getCarsAdmin = car_controller.getAllCarsAdmin;
exports.getCarById = car_controller.getCarbyId;
exports.insertCarData = car_controller.insertCarData;
exports.deleteCar = car_controller.deleteCar;
exports.getCarByLocation = car_controller.getCarsByLocation;

exports.getallLocations = LocationController.getAllLocations;
exports.addLocation = LocationController.AddLocations;
exports.deleteLocation = LocationController.deleteLocation;

exports.getAllBookings = BookingController.getallBookings;
exports.addBooking = BookingController.addBookings;
