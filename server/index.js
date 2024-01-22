const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
console.log(process.env.SECRET_KEY);
const CorsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const port = 8001;
app.use(express.json());
app.use(cors(CorsOptions));
app.use(routes);
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
