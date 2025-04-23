document.addEventListener("DOMContentLoaded", () => {
    // Get the button and audio elements
    const button = document.getElementById("enter-btn");
    const audio = document.getElementById("bg-audio");

    // Add click event listener to the "Enter" button
    button.addEventListener("click", () => {
        console.log("Enter button clicked"); // Debugging log

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
});

// Initialize the Google Maps 3D globe with grid overlay
function initMap() {
    if (typeof google === "undefined") {
        console.error("Google Maps API failed to load.");
        return;
    }

    const mapOptions = {
        center: { lat: 41.7, lng: -73.5 }, // Set initial map center
        zoom: 9,
        mapTypeId: "satellite", // Use satellite view for better 3D effect
        heading: 45, // 3D tilt angle
        tilt: 45, // 3D perspective
    };

    const mapElement = document.getElementById("map");
    if (!mapElement) {
        console.error("Map container not found");
        return;
    }

    const map = new google.maps.Map(mapElement, mapOptions);

    // Add tower markers
    const towers = [
        { lat: 41.4782, lon: -72.6966, height: 365, name: "Durham Tower" },
        { lat: 41.7881, lon: -71.9495, height: 317, name: "Brooklyn Tower" },
        // Add more towers here
    ];

    towers.forEach(tower => {
        const marker = new google.maps.Marker({
            position: { lat: tower.lat, lng: tower.lon },
            map: map,
            title: tower.name,
        });

        const infowindow = new google.maps.InfoWindow({
            content: `<b>${tower.name}</b><br>Height: ${tower.height} ft`,
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });
}
