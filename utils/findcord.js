const ExpressError = require("./ExpressError.js");
// store your key in env variable
const token = process.env.MAP_TOKEN;   // ✅ load from env here

async function getGeoJSON(placeName) {
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(placeName)}.json?key=${token}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;

      return {
        type: "Point",
        coordinates: [lng, lat]
      };
    } else {
      throw new ExpressError(404 , "Type a valid location")
    }
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
}

module.exports =  getGeoJSON;
