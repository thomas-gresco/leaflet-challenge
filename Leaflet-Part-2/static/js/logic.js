// Function to create a map centered on the United States
function createMap() {
  const map = L.map('map').setView([37.0902, -95.7129], 4); 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  return map;
}

// Function to set the marker size based on magnitude
function getMarkerSize(magnitude) {
  return magnitude * 5; 
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
  const markers = [];

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
    });
    marker.bindPopup(createPopup(feature));
    markers.push(marker);
  });

  return L.layerGroup(markers).addTo(map);
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

// Function to add layer controls to the map
function addLayerControls(map, earthquakeLayer, tectonicPlatesLayer) {
  const baseMaps = {
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    'Satellite': L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{
      attribution:
        'Map data © <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ArcGIS</a>'
    }) 
  };
  const overlayMaps = {
    'Earthquakes': earthquakeLayer,
    'Tectonic Plates': tectonicPlatesLayer
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
}

// Fetch earthquake data and visualize it on the map
async function visualizeEarthquakesAndTectonicPlates() {
  const map = createMap();

  const earthquakeResponse = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'); 
  const earthquakeData = await earthquakeResponse.json();
  const earthquakeLayer = createMarkers(earthquakeData, map);

  const tectonicPlatesResponse = await fetch('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json');
  const tectonicPlatesData = await tectonicPlatesResponse.json();
  const tectonicPlatesLayer = L.geoJSON(tectonicPlatesData, {
    style: {
      color: '#FF0000',
      weight: 2, 
      opacity: 0.8 
    }
  });

  createLegend(map); // Add the legend to the map
  addLayerControls(map, earthquakeLayer, tectonicPlatesLayer);
}

// Call the function to start visualization
visualizeEarthquakesAndTectonicPlates();


