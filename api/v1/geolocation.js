const axios = require("axios");

export default async function (req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://moderngrains-rpg.netlify.app/"
  ); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const response = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
      {
        params: {
          latitude: lat,
          longitude: lng,
          localityLanguage: "en",
        },
      }
    );

    const locationData = response.data;
    res.json({
      locality: locationData.locality || "Unknown Locality",
      city: locationData.city || "Unknown City",
      country: locationData.countryName || "Unknown Country",
    });
  } catch (error) {
    console.error("Error fetching geolocation:", error.message);
    res.status(500).json({ error: "Failed to fetch geolocation data" });
  }
}
