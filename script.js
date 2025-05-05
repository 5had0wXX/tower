document.getElementById('enter-btn').addEventListener('click', function () {
    console.log('Enter button clicked');
    
    // Show the map container
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block'; // Make the map visible
    
    // Hide the entry page
    const entryPage = document.querySelector('.entry-page');
    entryPage.style.display = 'none'; // Hide the entry page

    // Initialize the map
    initMap();
});

function initMap() {
    const apiKey = "Oj5Nh1YfwCTfaCAYUfI1"; // <--- PLACE YOUR API KEY HERE
    const mapStyleUrl = `https://api.maptiler.com/maps/outdoor-v2/style.json?key=Oj5Nh1YfwCTfaCAYUfI1`;

    if (!ol) {
        console.error("OpenLayers library is not loaded.");
        return;
    }

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: mapStyleUrl,
                }),
            }),
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-98.35, 39.5]), // Centered in the US
            zoom: 4, // Zoom level
        }),
    });

    // Add predefined AT&T towers
    const towers = [
        { name: "Tower 1", lat: 37.7749, lon: -122.4194, elevation: 150 },
        { name: "Tower 2", lat: 40.7128, lon: -74.0060, elevation: 200 },
        { name: "Tower 3", lat: 34.0522, lon: -118.2437, elevation: 180 },
    ];

    towers.forEach(tower => {
        const marker = new ol.Overlay({
            position: ol.proj.fromLonLat([tower.lon, tower.lat]),
            positioning: 'center-center',
            element: document.createElement('div'),
            stopEvent: false,
        });
        marker.getElement().innerHTML = `<b>${tower.name}</b><br>Elevation: ${tower.elevation}m`;
        map.addOverlay(marker);
    });
}

// Add functionality for the Site Maintenance button
document.getElementById('site-maintenance-btn').addEventListener('click', function () {
    const password = prompt("Enter password for Site Maintenance:");
    if (password === 'admin') {
        const name = prompt("Enter Tower Name:");
        const lat = parseFloat(prompt("Enter Latitude:"));
        const lon = parseFloat(prompt("Enter Longitude:"));
        const elevation = parseInt(prompt("Enter Elevation (m):"));

        // Validate input
        if (!name || isNaN(lat) || isNaN(lon) || isNaN(elevation)) {
            alert("Invalid input! Please try again.");
            return;
        }

        // Add the new tower to the map
        const map = ol.Map.prototype; // Assume map instance is global or accessible
        const marker = new ol.Overlay({
            position: ol.proj.fromLonLat([lon, lat]),
            positioning: 'center-center',
            element: document.createElement('div'),
            stopEvent: false,
        });
        marker.getElement().innerHTML = `<b>${name}</b><br>Elevation: ${elevation}m`;
        map.addOverlay(marker);

        alert(`Tower "${name}" added successfully!`);
    } else {
        alert("Incorrect password! Access denied.");
    }
});
