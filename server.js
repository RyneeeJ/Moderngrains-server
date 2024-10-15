require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

// ROUTES
const checkoutRoutes = require("./routes/checkout");
const geoRoutes = require("./routes/geolocation");

app.use(express.json());

app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/geolocation", geoRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
