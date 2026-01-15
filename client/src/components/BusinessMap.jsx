import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom blue marker for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Red marker for businesses
const businessIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  
  return null;
}

function BusinessMap({ businesses, userLocation, onBusinessClick }) {
  const defaultCenter = [-25.5388, 26.0850]; // Zeerust center
  const center = userLocation || defaultCenter;

  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57347.42093662771!2d26.057082!3d-25.538857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebff5d3f2d3f3f3%3A0x3d3d3d3d3d3d3d3d!2sZeerust%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1234567890123">OpenStreetMap</a> contributors'
      />
      <MapController center={center} />
      
      {/* User Location Marker */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <strong>You are here</strong>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Business Markers */}
      {businesses.map((business) => {
        if (business.latitude && business.longitude) {
          return (
            <Marker 
              key={business.id} 
              position={[business.latitude, business.longitude]}
              icon={businessIcon}
              eventHandlers={{
                click: () => onBusinessClick && onBusinessClick(business)
              }}
            >
              <Popup>
                <div className="text-center">
                  <strong className="text-lg">{business.name}</strong>
                  <p className="text-sm text-gray-600">{business.category}</p>
                  {business.distance && (
                    <p className="text-xs text-gray-500">{business.distance.toFixed(2)} km away</p>
                  )}
                  <button 
                    onClick={() => onBusinessClick && onBusinessClick(business)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    View Details →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}

export default BusinessMap;