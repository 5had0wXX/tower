document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("enter-btn");
    const audio = document.getElementById("bg-audio");

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

    // Add hover sound for buttons
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("mouseover", () => {
            const hoverSound = new Audio("audio/effects/hover-sound.mp3");
            hoverSound.currentTime = 0; // Reset sound to start
            hoverSound.play().catch((error) => {
                console.error("Error playing hover sound:", error);
            });
        });
    });
});

function initMap() {
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
        { lon: -73.0000, lat: 41.5000, height: 400, name: "New Haven Tower" } // Example additional tower
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
        source: vectorSource,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'images/marker-icon.png', // Ensure this icon exists
                scale: 0.05
            })
        })
    });

    map.addLayer(markerLayer);

    // Add interaction for markers (popup)
    const overlay = new ol.Overlay({
        element: document.createElement('div'),
        positioning: 'bottom-center',
        stopEvent: false
    });

    overlay.getElement().className = 'tooltip';
    map.addOverlay(overlay);

    map.on('pointermove', function (event) {
        const feature = map.forEachFeatureAtPixel(event.pixel, function (feat) {
            return feat;
        });

        if (feature) {
            const coordinate = event.coordinate;
            overlay.setPosition(coordinate);
            overlay.getElement().innerHTML = `
                <b>${feature.get('name')}</b><br>Height: ${feature.get('height')} ft
            `;
        } else {
            overlay.setPosition(undefined);
        }
    });
}
