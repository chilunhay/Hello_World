const express = require("express");
const app = express();
const cookieParser

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use()

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware For Errors
app.use(errorMiddleware);

module.exports = app