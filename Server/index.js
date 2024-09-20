const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/Auth/index.js");
const adminProductRoutes = require("./Routes/Admin/ProductsRoutes.js");  

const app = express();
require('dotenv').config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductRoutes);

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongoDbUrl)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server listening on port ${port}`));
