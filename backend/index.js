const express = require("express");
const app = express();

const connectDB = require("./config/db");
const router = require("./routes");

const cookieParser = require("cookie-parser");
const cors = require("cors");

global.backendError = require("./utils/backendError");

// parse url encoded form data
app.use(express.urlencoded({ extended: true }));
// json to js objects
app.use(express.json());

// configure dotenv
require("./config/dotenvconfig");

// set allowed request origins
app.use(
  cors({
    origin: process.env.CORS_ALLOWED,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,Cache-Control",
    credentials: true,
  })
);

app.set("trust proxy", 1);

// limit the requests
app.use(require("./config/rateLimit"));

// establish mongodb connection
connectDB();

// parse cookies
app.use(cookieParser());

// routes
app.use("/", router);

// error handling
app.use((err, req, res, next) => {
  console.error(err); // Log error message
  res.status(err.statusCode || 500).json(err.message); // Send JSON error response
});

app.listen(process.env.PORT);
