
const token = process.env.MAP_TOKEN; 

export default async function getGeoJSON(placeName) {
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
      console.warn(`No geocoding results found for "${placeName}"`);
      return null;
    }
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
}