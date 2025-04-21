var map = L.map('map').setView([41.7, -73.5], 9); // Starting location and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Full tower data (Add more towers below)
var towers = [
    { lat: 41.4782, lon: -72.6966, height: 365, name: 'Durham Tower' },
    { lat: 41.7881, lon: -71.9495, height: 317, name: 'Brooklyn Tower' },
    { lat: 41.4802, lon: -72.1486, height: 300, name: 'Montville Tower' },
    { lat: 41.3082, lon: -73.1896, height: 350, name: 'Bridgeport Tower' },
    { lat: 41.7041, lon: -72.0755, height: 325, name: 'Chopsey Hill Tower' },
    { lat: 41.6711, lon: -72.9144, height: 295, name: 'Canaan Tower' },
    { lat: 41.6584, lon: -73.3215, height: 335, name: 'Shelton Tower' },
    { lat: 41.3387, lon: -72.9154, height: 310, name: 'Willimantic Tower' },
    { lat: 41.6187, lon: -72.9328, height: 325, name: 'Norwich Tower' },
    { lat: 41.2271, lon: -73.1948, height: 318, name: 'Torrington Tower' },
    { lat: 41.6019, lon: -73.0479, height: 340, name: 'Hartford Tower' },
    { lat: 41.6361, lon: -73.4487, height: 365, name: 'New London Tower' },
    { lat: 41.5259, lon: -73.0845, height: 330, name: 'Waterbury Tower' },
    { lat: 41.3193, lon: -72.9686, height: 360, name: 'Meriden Tower' },
    { lat: 41.4069, lon: -73.0301, height: 290, name: 'Portland Tower' },
    { lat: 41.5032, lon: -73.2452, height: 320, name: 'New Haven Tower' },
    { lat: 41.4317, lon: -73.0973, height: 350, name: 'Lebanon Tower' },
    { lat: 41.4729, lon: -72.3911, height: 340, name: 'East Killingly North Tower' },
    { lat: 41.6106, lon: -72.9512, height: 300, name: 'Spindle Hill Tower' },
    { lat: 41.4012, lon: -73.4964, height: 330, name: 'Old Lyme Tower' },
    { lat: 41.2763, lon: -73.0239, height: 315, name: 'Windsor Locks Tower' },
    { lat: 41.5479, lon: -73.2737, height: 310, name: 'Norfolk Tower' },
    { lat: 41.4995, lon: -72.9575, height: 345, name: 'Killingworth Tower' },
    { lat: 41.3839, lon: -73.4344, height: 305, name: 'Stamford Tower' },
    { lat: 41.5003, lon: -72.8088, height: 325, name: 'North Stonington Tower' },
    { lat: 41.5318, lon: -73.4009, height: 305, name: 'John Tom Hill Tower' },
    { lat: 41.4771, lon: -72.9945, height: 335, name: 'Greenhill Tower' },
    { lat: 41.4132, lon: -73.1195, height: 320, name: 'Oakdale Tower' },
    { lat: 41.4453, lon: -73.0112, height: 345, name: 'Willard Road Tower' },
    { lat: 41.4876, lon: -73.2133, height: 325, name: 'Shelton/Trumbull Tower' },
    { lat: 41.5066, lon: -73.6671, height: 330, name: 'New Fairfield Tower' },
    { lat: 41.6143, lon: -73.4371, height: 310, name: 'Portland Tower' },
    { lat: 41.3517, lon: -72.5181, height: 295, name: 'Bethany Tower' },
    { lat: 41.4298, lon: -73.4284, height: 350, name: 'Wolcott Tower' },
    { lat: 41.5066, lon: -72.9333, height: 300, name: 'Torrington Tower' },
    // Add the rest of the towers in the same format
];

// Add markers for each tower
towers.forEach(tower => {
    L.marker([tower.lat, tower.lon]).addTo(map)
    .bindPopup(`<b>${tower.name}</b><br>Height: ${tower.height} ft`);
});
</script>
