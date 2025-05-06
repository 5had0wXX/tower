document.getElementById('enter-btn').addEventListener('click', function () {
    console.log('Enter button clicked');
    
    // Show the map container
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block'; // Make the map visible
    
    // Hide the entry page
    const entryPage = document.querySelector('.entry-page');
    entryPage.style.display = 'none'; // Hide the entry page

    // Show loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'absolute';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.background = 'rgba(0, 0, 0, 0.8)';
    loadingScreen.style.color = 'white';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.zIndex = '100';
    loadingScreen.innerText = 'Loading map...';
    document.body.appendChild(loadingScreen);

    // Initialize the map
    setTimeout(() => {
        initMap();
        document.body.removeChild(loadingScreen); // Remove loading screen after map is initialized
    }, 2000);
});

function initMap() {
    const apiKey = "Oj5Nh1YfwCTfaCAYUfI1"; // MapTiler API Key
    const mapStyleUrl = `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${apiKey}`;

    if (!ol) {
        console.error("OpenLayers library is not loaded.");
        return;
    }

    // Initialize the map with the correct US center and zoom
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
            center: ol.proj.fromLonLat([-98.5795, 39.8283]), // Centered at the geographic center of the US
            zoom: 3, // Fully zoomed out over the US
        }),
    });

    // Add predefined Long Lines towers
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

    towers.forEach(tower => {
        try {
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

            // Add marker to the map
            map.addOverlay(marker);

            console.log(`Marker added: ${tower.name} at [${tower.lat}, ${tower.lon}]`);
        } catch (error) {
            console.error(`Failed to add marker for ${tower.name}:`, error);
        }
    });

    console.log("All markers added to the map.");

    // Add functionality for site maintenance button
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
                    const newTower = { name, lat, lon, description };
                    towers.push(newTower);

                    const markerElement = document.createElement('div');
                    markerElement.className = 'tower-marker';
                    markerElement.style.width = '10px';
                    markerElement.style.height = '10px';
                    markerElement.style.backgroundColor = 'blue'; // New towers are blue
                    markerElement.style.borderRadius = '50%';
                    markerElement.style.cursor = 'pointer';
                    markerElement.title = `${newTower.name}\n${newTower.description}`;

                    const marker = new ol.Overlay({
                        position: ol.proj.fromLonLat([newTower.lon, newTower.lat]),
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
                const name = prompt("Enter the name of the tower to remove:");
                const index = towers.findIndex(tower => tower.name === name);
                if (index !== -1) {
                    towers.splice(index, 1);
                    alert("Tower removed. Refresh the page to see changes.");
                } else {
                    alert("Tower not found.");
                }
            } else {
                alert("Invalid action.");
            }
        } else {
            alert("Incorrect password.");
        }
    });
}
