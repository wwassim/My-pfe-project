import React, { useState, useEffect } from "react";
import L from "leaflet";

function FieldMap() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Create a new Leaflet map and set its initial view
    const newMap = L.map("mapid").setView([51.505, -0.09], 13);

    // Add a tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(newMap);

    // Save the map to state
    setMap(newMap);
  }, []);

  function handleLocationInput(e) {
    const inputLocation = e.target.value;
    setLocation(inputLocation);
    if (e.key === "Enter") {
      e.preventDefault();
      // Use geocoding API to get the location's coordinates and set the map's view to those coordinates
    }
  }

  return (
    <div>
      <input type="text" onKeyDown={handleLocationInput} placeholder="Enter a location" />
      <div id="mapid" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}

export default FieldMap;
