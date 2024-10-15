require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://moderngrains-rpg.netlify.app/",
    methods: ["GET", "POST"],
  })
);

// ROUTES
const checkoutRoutes = require("./routes/checkout");
const geoRoutes = require("./routes/geolocation");
const successRoutes = require("./routes/paymentSuccess");

app.use(express.json());

app.use("/api/checkout", checkoutRoutes);
app.use("/api/geolocation", geoRoutes);
app.use("/api/paymentSuccess", successRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
