const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/Auth/index.js");
const adminProductRoutes = require("./Routes/Admin/ProductsRoutes.js"); 
const shopProductRoutes = require("./Routes/Shop/ProductRoutes.js");
const cartRoutes = require("./Routes/Shop/Cart-Routes.js")
const shopAddressRouter = require("./Routes/Shop/Address-Routes.js");
const shopOrderRoutes = require("./Routes/Shop/Order-Routes.js"); 
const adminOrderRoutes = require("./Routes/Admin/Order-Routes.js");
const shopSearchRoutes = require("./Routes/Shop/Search-Routes.js"); 
const shopReviewRoutes = require("./Routes/Shop/Review-Routes.js"); 
const featuresRoutes = require("./Routes/Common/Feature-Routes.js"); 


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
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", cartRoutes);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/shop/review", shopReviewRoutes);

app.use("/api/common/feature", featuresRoutes)






const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URL;

mongoose
  .connect(mongoDbUrl)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server listening on port ${port}`));
