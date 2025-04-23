document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("enter-btn");
    const audio = document.getElementById("bg-audio");
    let userInteracted = false;

    // Mark interaction when the user clicks anywhere on the page
    document.addEventListener("click", () => {
        userInteracted = true;
    });

    // Add click event listener to "Enter" button
    button.addEventListener("click", () => {
        console.log("Enter button clicked");

        // Hide the entry page and show the map container
        const entryPage = document.querySelector(".entry-page");
        const mapContainer = document.getElementById("map-container");

        if (entryPage && mapContainer) {
            entryPage.style.display = "none";
            mapContainer.style.display = "block";
        } else {
            console.error("Entry page or map container not found");
        }

        // Play background music after user interaction
        if (audio) {
            audio.play().catch((error) => {
                console.error("Error playing background music:", error);
            });
        } else {
            console.error("Background audio element not found");
        }

        // Initialize the map
        initMap();
    });

    // Play hover sound only if the user has interacted with the page
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("mouseover", () => {
            if (userInteracted) {
                const hoverSound = new Audio("audio/effects/hover-sound.mp3");
                hoverSound.currentTime = 0; // Reset sound to start
                hoverSound.play().catch((error) => {
                    console.error("Error playing hover sound:", error);
                });
            }
        });
    });
});

// Fallback for crypto.randomUUID
function generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function initMap() {
    // Ensure OpenLayers is loaded
    if (typeof ol === "undefined") {
        console.error("OpenLayers library is not loaded.");
        return;
    }

    // Create a map instance
    const map = new ol.Map({
        target: 'map', // Target the map div
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM() // Use OpenStreetMap tiles
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-73.5, 41.7]), // Center on CT area
            zoom: 9
        })
    });

    // Add tower markers
    const towers = [
        { lon: -72.6966, lat: 41.4782, height: 365, name: "Durham Tower" },
        { lon: -71.9495, lat: 41.7881, height: 317, name: "Brooklyn Tower" },
    ];

    const vectorSource = new ol.source.Vector();

    towers.forEach(tower => {
        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([tower.lon, tower.lat])),
            name: tower.name,
            height: tower.height
        });

        vectorSource.addFeature(marker);
    });

    const markerLayer = new ol.layer.Vector({
        source: vectorSource
    });

    map.addLayer(markerLayer);
}
