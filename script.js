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
            center: ol.proj.fromLonLat([0, 0]), // Replace with your desired coordinates [longitude, latitude]
            zoom: 2, // Zoom level
        }),
    });

    console.log('Map initialized with MapTiler API.');
}

// Add functionality for the Site Maintenance button
document.getElementById('site-maintenance-btn').addEventListener('click', function () {
    const password = prompt("Enter password for Site Maintenance:");
    if (password === 'admin') {
        alert("Access granted. You can now perform maintenance tasks.");
        // Redirect to maintenance page or enable maintenance features
        // window.location.href = 'maintenance.html'; // Uncomment if you have a dedicated page
    } else {
        alert("Incorrect password! Access denied.");
    }
});
