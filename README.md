# Earthquake and Tectonic Plate Visualization

This project visualizes earthquake data and tectonic plate boundaries on a map using Leaflet, a popular JavaScript mapping library.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Data Sources](#data-sources)
- [Acknowledgments](#acknowledgments)

## Overview

The goal of this project is to visualize earthquake data provided by the United States Geological Survey (USGS) along with tectonic plate boundaries obtained from a separate dataset. The earthquakes are represented as markers on the map, with their size reflecting the magnitude and color representing the depth. Additionally, tectonic plate boundaries are displayed as lines on the map. The map allows users to toggle earthquake and tectonic plate data on and off independently.

## Getting Started

### Prerequisites

To run this project, you need the following software installed on your machine:

- A modern web browser (e.g., Google Chrome, Mozilla Firefox)
- Internet connection to fetch external data and map tiles

### Installation

1. Clone this repository to your local machine or download the ZIP file and extract it.

2. Obtain a Mapbox access token by creating a free account on the Mapbox website (https://www.mapbox.com/). This token is required to use the Mapbox Satellite tiles.

3. Replace `'YOUR_MAPBOX_ACCESS_TOKEN'` in the `main.js` file with your actual Mapbox access token.

## Usage

1. Open the `index.html` file in your web browser.

2. The map will be centered on the United States, and you will see earthquake markers with varying sizes and colors representing their magnitude and depth, respectively.

3. Use the layer controls in the top-right corner of the map to toggle earthquake and tectonic plate data on and off independently.

4. Click on an earthquake marker to view additional information about the earthquake in a popup.

## Data Sources

- Earthquake data is provided by the United States Geological Survey (USGS) through their GeoJSON feed (URL_TO_YOUR_JSON_DATA). The data is updated every 5 minutes.

- Tectonic plate boundaries data is obtained from the GitHub repository by fraxen (https://github.com/fraxen/tectonicplates).

## Acknowledgments

- Leaflet (https://leafletjs.com/): A powerful JavaScript library for interactive maps.

- USGS Earthquake Hazards Program (https://earthquake.usgs.gov/): Providing real-time earthquake data and educational resources.

- Mapbox (https://www.mapbox.com/): Offering satellite imagery and map styles for web applications.
