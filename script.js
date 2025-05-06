document.getElementById('enter-btn').addEventListener('click', function () {
    console.log('Enter button clicked');

    // Show the map container
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block'; // Make the map visible immediately

    // Hide the entry page
    const entryPage = document.querySelector('.entry-page');
    if (entryPage) {
        entryPage.style.display = 'none'; // Hide the entry page
    }

    // Initialize the map
    initMap();
});

function initMap() {
    try {
        // Ensure OpenLayers is loaded
        if (typeof ol === 'undefined') {
            throw new Error("OpenLayers library is missing. Please ensure it is properly included.");
        }

        const apiKey = "Oj5Nh1YfwCTfaCAYUfI1"; // MapTiler API Key
        const mapStyleUrl = `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${apiKey}`;

        // Initialize the map
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
                center: ol.proj.fromLonLat([-72.5708, 41.6736]), // Centered at Glastonbury, CT
                zoom: 7, // Zoom level
            }),
        });

        // Predefined towers
        const towers = [
            { name: "John Tom Hill, Glastonbury, CT", lat: 41.6736, lon: -72.5708, description: "Former AT&T microwave relay site" },
            { name: "Durham, CT (Chamberlain Hill)", lat: 41.4825, lon: -72.6803, description: "Two towers (~240 ft & ~365 ft), semi-hardened building" },
            { name: "Blackstone, MA", lat: 42.0417, lon: -71.5417, description: "Former AT&T relay site, steel tower" },
            { name: "Peru, MA", lat: 42.4375, lon: -73.0375, description: "Microwave relay site, height unknown" },
            { name: "Bald Hill, Union, CT", lat: 41.9850, lon: -72.1400, description: "Former AT&T relay site, square delay lens antennas" },
            { name: "Bethany, CT", lat: 41.4214, lon: -72.9964, description: "Former AT&T microwave relay site" },
            { name: "Montville, CT", lat: 41.4400, lon: -72.1500, description: "Former AT&T relay site" },
            { name: "Grassy Hill Rd, Old Lyme, CT", lat: 41.3918, lon: -72.2855, description: "Connected to Durham and New London, CT" },
            { name: "Peekskill, NY", lat: 41.2900, lon: -73.9200, description: "Large steel tower, used for long-distance communication" },
            { name: "Roslyn Harbor, NY", lat: 40.8167, lon: -73.6400, description: "Built in 1970, approx. 275 ft tall" },
            { name: "Johnston, RI", lat: 41.8236, lon: -71.5217, description: "Microwave relay site, height unknown" },
        ];

        // Add markers for towers
        towers.forEach(tower => {
            const markerElement = document.createElement('div');
            markerElement.className = 'tower-marker';
            markerElement.style.width = '10px';
            markerElement.style.height = '10px';
            markerElement.style.backgroundColor = 'red';
            markerElement.style.borderRadius = '50%';
            markerElement.style.cursor = 'pointer';
            markerElement.title = `${tower.name}\n${tower.description}`;

            const marker = new ol.Overlay({
                position: ol.proj.fromLonLat([tower.lon, tower.lat]),
                positioning: 'center-center',
                element: markerElement,
                stopEvent: false,
            });

            map.addOverlay(marker);
        });

        // Add Site Maintenance Button functionality
        ensureMaintenanceButton(map);
    } catch (error) {
        console.error(error.message);
    }
}

function ensureMaintenanceButton(map) {
    const siteMaintenanceBtn = document.getElementById('site-maintenance-btn');
    siteMaintenanceBtn.addEventListener('click', () => {
        const password = prompt("Enter password for site maintenance:");
        if (password === "admin") {
            const action = prompt("Enter 'add' to add a tower or 'remove' to remove a tower:");
            if (action === "add") {
                const name = prompt("Enter tower name:");
                const lat = parseFloat(prompt("Enter latitude:"));
                const lon = parseFloat(prompt("Enter longitude:"));
                const description = prompt("Enter description:");

                if (name && !isNaN(lat) && !isNaN(lon) && description) {
                    const markerElement = document.createElement('div');
                    markerElement.className = 'tower-marker';
                    markerElement.style.width = '10px';
                    markerElement.style.height = '10px';
                    markerElement.style.backgroundColor = 'blue';
                    markerElement.style.borderRadius = '50%';
                    markerElement.style.cursor = 'pointer';
                    markerElement.title = `${name}\n${description}`;

                    const marker = new ol.Overlay({
                        position: ol.proj.fromLonLat([lon, lat]),
                        positioning: 'center-center',
                        element: markerElement,
                        stopEvent: false,
                    });

                    map.addOverlay(marker);
                    alert("New tower added successfully!");
                } else {
                    alert("Invalid input. Tower not added.");
                }
            } else if (action === "remove") {
                alert("Tower removal functionality is not implemented yet.");
            } else {
                alert("Invalid action.");
            }
        } else {
            alert("Incorrect password.");
        }
    });
}
