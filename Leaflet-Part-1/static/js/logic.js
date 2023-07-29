// Function to create a map
function createMap() {
  const map = L.map('map').setView([37.0902, -95.7129], 4); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  return map;
}

// Function to set the marker size based on magnitude
function getMarkerSize(magnitude) {
  return magnitude * 5; // Adjust the multiplier as needed to scale the marker size
}

// Function to set the marker color based on depth
function getMarkerColor(depth) {
  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026'];
  return depth > 100 ? colors[6] :
         depth > 70 ? colors[5] :
         depth > 50 ? colors[4] :
         depth > 30 ? colors[3] :
         depth > 10 ? colors[2] :
         depth > 5  ? colors[1] :
                      colors[0];
}

// Function to create popups for markers
function createPopup(feature) {
  return `
    <strong>Location:</strong> ${feature.properties.place}<br>
    <strong>Magnitude:</strong> ${feature.properties.mag}<br>
    <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
  `;
}

// Function to create earthquake markers on the map
function createMarkers(data, map) {
  data.features.forEach((feature) => {
    const lat = feature.geometry.coordinates[1];
    const lon = feature.geometry.coordinates[0];
    const magnitude = feature.properties.mag;
    const depth = feature.geometry.coordinates[2];
    const marker = L.circleMarker([lat, lon], {
      radius: getMarkerSize(magnitude),
      fillColor: getMarkerColor(depth),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);
    marker.bindPopup(createPopup(feature));
  });
}

// Function to create the legend
function createLegend(map) {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [0, 5, 10, 30, 50, 70, 100];
    const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026'];
    let labels = [];

    for (let i = 0; i < depths.length; i++) {
      labels.push(
        '<i style="background:' + colors[i] + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km' : '+ km')
      );
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(map);
}


// Fetch earthquake data and visualize it on the map
async function visualizeEarthquakes() {
  const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'); 
  const data = await response.json();

  const map = createMap();
  createMarkers(data, map);
  createLegend(map);
}

// Call the function to start visualization
visualizeEarthquakes();
