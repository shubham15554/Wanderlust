import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css"; 

const MapComponent = ({ coordinates, locationName }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const MAP_KEY = "z6r2q4dM2m5vEIuckyqU"; 

  useEffect(() => {
    if (map.current) return; 
    if (!coordinates || coordinates.length !== 2) return;

    maptilersdk.config.apiKey = MAP_KEY;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS, 
      center: coordinates, 
      zoom: 14 
    });

    
    new maptilersdk.Marker({ color: "#ff385c" }) 
      .setLngLat(coordinates)
      .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML(`<h4>${locationName}</h4><p>Exact location provided after booking</p>`)) // पिन पर क्लिक करने पर दिखने वाला पॉपअप
      .addTo(map.current);

  }, [coordinates, locationName]);

  return (
    <div className="w-full my-6">
      <h3 className="text-xl font-semibold mb-3">Where you'll be</h3>
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-xl shadow-md border border-gray-200" 
      />
    </div>
  );
};

export default MapComponent;