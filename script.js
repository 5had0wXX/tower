var map = L.map('map').setView([41.7, -73.5], 9); // Starting location and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Full tower data (Add all towers below)
var towers = [
    { lat: 41.4782, lon: -72.6966, height: 365, name: 'Durham Tower' },
    { lat: 41.7881, lon: -71.9495, height: 317, name: 'Brooklyn Tower' },
    { lat: 41.4802, lon: -72.1486, height: 300, name: 'Montville Tower' },
    { lat: 41.3082, lon: -73.1896, height: 350, name: 'Bridgeport Tower' },
    { lat: 41.7041, lon: -72.0755, height: 325, name: 'Chopsey Hill Tower' },
    { lat: 41.6711, lon: -73.3215, height: 335, name: 'Shelton Tower' },
    { lat: 41.6584, lon: -73.3829, height: 340, name: 'Canaan Tower' },
    { lat: 41.6032, lon: -73.1065, height: 330, name: 'New Haven Tower' },
    { lat: 41.2295, lon: -73.0295, height: 360, name: 'Waterbury Tower' },
    { lat: 41.4129, lon: -72.9741, height: 315, name: 'Meriden Tower' },
    { lat: 41.2271, lon: -73.1948, height: 318, name: 'Torrington Tower' },
    { lat: 41.4199, lon: -73.2119, height: 340, name: 'Lebanon Tower' },
    { lat: 41.4015, lon: -73.1991, height: 300, name: 'Norwich Tower' },
    { lat: 41.5100, lon: -73.3170, height: 300, name: 'Portland Tower' },
    { lat: 41.6599, lon: -72.9240, height: 315, name: 'Willimantic Tower' },
    { lat: 41.6061, lon: -73.9239, height: 325, name: 'Shelton/Trumbull Tower' },
    { lat: 41.5278, lon: -73.5143, height: 330, name: 'North Stonington Tower' },
    { lat: 41.3183, lon: -73.0674, height: 290, name: 'Windsor Locks Tower' },
    { lat: 41.5509, lon: -72.8654, height: 340, name: 'Killingworth Tower' },
    { lat: 41.4138, lon: -72.9856, height: 325, name: 'Greenhill Tower' },
    { lat: 41.6359, lon: -72.9981, height: 350, name: 'Oakdale Tower' },
    { lat: 41.6367, lon: -73.1125, height: 330, name: 'Stamford Tower' },
    { lat: 41.3554, lon: -72.8979, height: 325, name: 'Spindle Hill Tower' },
    { lat: 41.4387, lon: -72.5128, height: 295, name: 'Bethany Tower' },
    { lat: 41.3182, lon: -73.1900, height: 310, name: 'Bridgeport Tower' },
    { lat: 42.5491, lon: -72.3519, height: 330, name: 'Worcester Tower' },
    { lat: 41.6867, lon: -71.2571, height: 315, name: 'Pawtucket Tower' },
    { lat: 42.3850, lon: -71.2110, height: 325, name: 'Lowell Tower' },
    { lat: 41.8244, lon: -71.4141, height: 340, name: 'Providence Tower' },
    { lat: 42.6599, lon: -73.7804, height: 345, name: 'Albany Tower' },
    { lat: 42.1290, lon: -73.7911, height: 340, name: 'Schenectady Tower' },
    { lat: 42.7780, lon: -73.9411, height: 350, name: 'Troy Tower' },
    { lat: 41.2979, lon: -73.2049, height: 330, name: 'New Milford Tower' },
    { lat: 42.3050, lon: -73.9711, height: 335, name: 'Albany Tower' },
    { lat: 42.2657, lon: -73.6935, height: 300, name: 'Newburgh Tower' },
    { lat: 41.7666, lon: -73.6961, height: 310, name: 'Danbury Tower' },
    { lat: 42.0007, lon: -73.9225, height: 320, name: 'Binghamton Tower' },
    { lat: 42.7794, lon: -73.8981, height: 330, name: 'Rensselaer Tower' },
    { lat: 42.3571, lon: -73.9249, height: 340, name: 'Clifton Park Tower' },
    { lat: 41.4342, lon: -73.6661, height: 330, name: 'Norfolk Tower' },
    { lat: 42.2051, lon: -73.8473, height: 310, name: 'Herkimer Tower' },
    { lat: 42.3075, lon: -73.9460, height: 300, name: 'Saratoga Springs Tower' },
    { lat: 41.3661, lon: -73.1999, height: 340, name: 'Newtown Tower' },
    { lat: 42.0665, lon: -73.5734, height: 310, name: 'Kingston Tower' },
    { lat: 42.7590, lon: -73.9901, height: 335, name: 'Queensbury Tower' },
    { lat: 41.7010, lon: -73.1779, height: 320, name: 'Ridgefield Tower' },
    { lat: 42.4612, lon: -73.8815, height: 325, name: 'Catskill Tower' },
    { lat: 41.5060, lon: -73.3219, height: 345, name: 'East Hartford Tower' },
    { lat: 42.5445, lon: -73.9293, height: 340, name: 'Amsterdam Tower' },
    { lat: 41.7478, lon: -72.8499, height: 300, name: 'East Hartford Tower' },
    { lat: 42.2299, lon: -73.8070, height: 350, name: 'Troy Tower' },
    { lat: 42.2825, lon: -73.9379, height: 355, name: 'Rensselaer County Tower' },
    { lat: 41.4080, lon: -72.9304, height: 300, name: 'West Hartford Tower' }
];

// Add markers for each tower
towers.forEach(tower => {
    L.marker([tower.lat, tower.lon]).addTo(map)
    .bindPopup(`<b>${tower.name}</b><br>Height: ${tower.height} ft`);
});
