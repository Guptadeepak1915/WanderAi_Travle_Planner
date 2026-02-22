import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom purple marker
const purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// User location marker — blue
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Map center auto update
const MapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
};

const MapView = ({ places, cityCoords, userLocation, onPlaceClick }) => {
  const center = cityCoords
    ? [cityCoords.lat, cityCoords.lng]
    : [20.5937, 78.9629]; // India center

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '450px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapCenter center={center} />

        {/* User Location Marker */}
        {userLocation?.lat && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={blueIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-bold text-blue-600">📍 You are here</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Place Markers */}
        {places.map((place) =>
          place.coordinates?.lat && place.coordinates?.lng ? (
            <Marker
              key={place.placeId}
              position={[place.coordinates.lat, place.coordinates.lng]}
              icon={purpleIcon}
              eventHandlers={{
                click: () => onPlaceClick && onPlaceClick(place)
              }}
            >
              <Popup>
                <div className="min-w-40">
                  <img
                    src={place.photo}
                    alt={place.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="font-bold text-gray-800 text-sm">{place.name}</p>
                  <p className="text-purple-600 text-xs font-medium">
                    📍 {place.distance} km away
                  </p>
                  <p className="text-gray-500 text-xs">{place.category}</p>
                  <button
                    onClick={() => onPlaceClick && onPlaceClick(place)}
                    className="mt-2 w-full bg-purple-600 text-white text-xs py-1.5 rounded-lg hover:bg-purple-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;