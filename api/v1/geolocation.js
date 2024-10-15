const axios = require("axios");

export default async function (req, res) {
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
