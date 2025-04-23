// Play background music on load
window.onload = () => {
    const audio = document.getElementById("bg-audio");
    audio.play().catch((error) => {
        console.log("Background music autoplay failed. User interaction is required:", error);
    });
};

// Handle the "Enter" button click
document.getElementById("enter-btn").addEventListener("click", () => {
    document.querySelector(".entry-page").style.display = "none";
    document.getElementById("map-container").style.display = "block";
    initMap();

    // Play background music after user interaction
    const audio = document.getElementById("bg-audio");
    if (audio.paused) {
        audio.play().catch((error) => {
            console.error("Error playing background music:", error);
        });
    }
});

// Initialize the Google Maps 3D globe with grid overlay
function initMap() {
    const mapOptions = {
        center: { lat: 41.7, lng: -73.5 }, // Set initial map center to CT area
        zoom: 9,
        mapTypeId: 'satellite', // Use satellite view for better 3D effect
        heading: 45, // 3D tilt angle
        tilt: 45, // 3D perspective
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Add tower markers
    const towers = [
        { lat: 41.4782, lon: -72.6966, height: 365, name: 'Durham Tower' },
        { lat: 41.7881, lon: -71.9495, height: 317, name: 'Brooklyn Tower' },
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

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    });
}

// Sound effect on button hover
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
        const hoverSound = new Audio('audio/effects/hover-sound.mp3');
        hoverSound.currentTime = 0; // Reset sound to start
        hoverSound.play().catch((error) => {
            console.error("Error playing hover sound:", error);
        });
    });
});
