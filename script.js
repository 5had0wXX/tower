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
    try {
        initMap();
        document.body.removeChild(loadingScreen); // Remove loading screen after map is initialized
    } catch (error) {
        console.error("Error initializing the map:", error);
        loadingScreen.innerText = 'Failed to load map. Please refresh the page.';
    }
});

function initMap() {
    const apiKey = "Oj5Nh1YfwCTfaCAYUfI1"; // MapTiler API Key
    const mapStyleUrl = `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${apiKey}`;

    if (typeof ol === 'undefined') {
        throw new Error("OpenLayers library is not loaded.");
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
        { name: "Bald Hill, Union, CT", lat: 41.9850, lon: -72.1400, description: "Former AT&T relay site
