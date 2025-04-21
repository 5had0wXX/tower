// Play background music on load
window.onload = () => {
    const audio = document.getElementById("bg-audio");
    audio.play();
};

// Handle the "Enter" button click
document.getElementById("enter-btn").addEventListener("click", () => {
    document.querySelector(".entry-page").style.display = "none";
    document.getElementById("map-container").style.display = "block";
    initMap();
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

    // Adding a grid overlay
    const gridLayer = new google.maps.visualization.Grid({
        cellSize: 100, // Customize the grid size
        gridColor: "#ff4b5c",
        opacity: 0.3,
    });
    gridLayer.setMap(map);

    // Add tower markers (data from above)
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
        const hoverSound = new Audio('hover-sound.mp3');
        hoverSound.play();
    });
});
