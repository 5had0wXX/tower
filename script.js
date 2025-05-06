document.getElementById('enter-btn').addEventListener('click', function () {
    console.log('Enter button clicked');

    // Show the map container
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block'; // Make the map visible

    // Hide the entry page
    const entryPage = document.querySelector('.entry-page');
    if (entryPage) {
        entryPage.style.display = 'none';
    }

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

    // Initialize the map after a brief delay
    setTimeout(() => {
        if (typeof ol === 'undefined') {
            alert("Error: OpenLayers library is missing. Please ensure it is properly included.");
            document.body.removeChild(loadingScreen);
            return;
        }
        initMap();
        document.body.removeChild(loadingScreen); // Remove the loading screen when done
    }, 1500);
});

function initMap() {
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
            center: ol.proj.fromLonLat([-98.5795, 39.8283]), // Geographic center of the US
            zoom: 3, // Fully zoomed out over the US
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

            map.addOverlay(marker);
            console.log(`Marker added: ${tower.name} at [${tower.lat}, ${tower.lon}]`);
        } catch (error) {
            console.error(`Failed to add marker for ${tower.name}:`, error);
        }
    });

    console.log("All markers added to the map.");
}
