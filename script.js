document.getElementById('enter-btn').addEventListener('click', function () {
    console.log('Enter button clicked');

    // Show the map container and hide the entry page
    const mapContainer = document.getElementById('map-container');
    const entryPage = document.querySelector('.entry-page');

    // Ensure elements are found before proceeding
    if (mapContainer && entryPage) {
        mapContainer.style.display = 'block'; // Make the map visible
        entryPage.style.display = 'none'; // Hide the entry page
        initMap(); // Initialize the map immediately
    } else {
        console.error("Map container or entry page elements not found.");
    }
});

function initMap() {
    if (typeof ol === 'undefined') {
        console.error("OpenLayers library is missing. Please ensure it is properly included.");
        return;
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

    // Static Long Lines towers
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
        const markerElement = document.createElement('div');
        markerElement.className = 'tower-marker';
        markerElement.title = `${tower.name}\n${tower.description}`;

        const marker = new ol.Overlay({
            position: ol.proj.fromLonLat([tower.lon, tower.lat]),
            positioning: 'center-center',
            element: markerElement,
            stopEvent: false,
        });

        map.addOverlay(marker);
    });

    console.log("All markers loaded and displayed on the map.");
}

// Ensure the Site Maintenance button redirects correctly
document.getElementById('site-maintenance-btn').addEventListener('click', function () {
    window.location.href = '/edit-towers.html'; // Replace with your editing page URL
});
