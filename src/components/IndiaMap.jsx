import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, MapPin, Clock } from 'lucide-react';
import { feature } from 'topojson-client';
import indiaTopoJson from '../data/india.topo.json';
import 'leaflet/dist/leaflet.css';
import './IndiaMap.css';

// Fix default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom numbered marker icon
const createNumberedIcon = (number, isStart = false, isEnd = false) => {
  let color = '#667eea';
  if (isStart) color = '#10b981';
  if (isEnd) color = '#ef4444';
  
  return L.divIcon({
    html: `<div class="custom-marker" style="background: ${color}">
      <span>${number}</span>
    </div>`,
    className: 'custom-marker-wrapper',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    // Set fixed bounds for India - no auto-fitting to destinations
    const indiaBounds = [
      [6.5, 68.0],    // Southwest
      [35.5, 97.5]    // Northeast
    ];
    
    // Fit to India bounds only once on mount
    map.fitBounds(indiaBounds, { 
      padding: [20, 20],
      maxZoom: 5,
      animate: false 
    });
    
    // Lock the map to prevent panning outside India
    map.setMaxBounds(indiaBounds);
  }, [map]);
  
  return null;
}

function IndiaMap({ destinations }) {
  // India center coordinates
  const indiaCenter = [20.5937, 78.9629];

  const indiaGeoJson = useMemo(
    () => feature(indiaTopoJson, indiaTopoJson.objects.ind),
    []
  );
  
  // India bounds - restricting view to India only
  const indiaBounds = [
    [6.5, 68.0],    // Southwest coordinates
    [35.5, 97.5]    // Northeast coordinates
  ];
  
  // Create route path coordinates
  const routePath = destinations
    .filter(dest => dest.coordinates)
    .map(dest => [dest.coordinates.lat, dest.coordinates.lng]);

  // Line options for route
  const lineOptions = {
    color: '#667eea',
    weight: 3,
    opacity: 0.8,
    dashArray: '10, 10',
    dashOffset: '0'
  };

  const geoJsonStyle = {
    color: '#2f3b52',
    weight: 1,
    opacity: 0.85,
    fillOpacity: 0,
    dashArray: '2 4'
  };

  return (
    <section className="india-map-section">
      <h2 className="section-title">
        <Navigation size={20} />
        Journey Across India
      </h2>
      
      <div className="map-container-leaflet">
        <MapContainer
          center={indiaCenter}
          zoom={5}
          minZoom={4}
          maxZoom={6}
          style={{ height: '100%', width: '100%', minHeight: '500px' }}
          scrollWheelZoom={true}
          zoomControl={true}
          dragging={true}
          doubleClickZoom={true}
          touchZoom={true}
          keyboard={true}
          boxZoom={true}
          maxBounds={indiaBounds}
          maxBoundsViscosity={1.0}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CartoDB'
            className="map-tiles"
            maxZoom={6}
            minZoom={4}
            bounds={indiaBounds}
          />
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.png"
            attribution='&copy; Stamen Design'
            className="border-tiles"
            maxZoom={6}
            minZoom={4}
            opacity={0.6}
          />

          <GeoJSON data={indiaGeoJson} style={geoJsonStyle} />
          
          <MapController />
          
          {/* Route line connecting all destinations */}
          {routePath.length > 1 && (
            <Polyline positions={routePath} pathOptions={lineOptions} />
          )}
          
          {/* Destination markers */}
          {destinations.map((dest, index) => {
            if (!dest.coordinates) return null;
            
            const isStart = index === 0;
            const isEnd = index === destinations.length - 1;
            const position = [dest.coordinates.lat, dest.coordinates.lng];
            
            return (
              <Marker
                key={dest.id}
                position={position}
                icon={createNumberedIcon(index + 1, isStart, isEnd)}
              >
                <Popup>
                  <div className="leaflet-popup-content-custom">
                    <div className="popup-image">
                      <img src={dest.image} alt={dest.name} />
                    </div>
                    <div className="popup-details">
                      <h4>{dest.name}</h4>
                      <p className="state">
                        <MapPin size={14} />
                        {dest.state}
                      </p>
                      <p className="duration">
                        <Clock size={14} />
                        {dest.duration}
                      </p>
                      <div className="activities">
                        <strong>Activities:</strong>
                        {dest.activities.slice(0, 3).map((activity, idx) => (
                          <div key={idx} className="activity">• {activity}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-icon start"></div>
            <span>Start: Bhopal</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon route"></div>
            <span>Travel Route</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon destination"></div>
            <span>Destinations ({destinations.length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon end"></div>
            <span>Return: Bhopal via Bangalore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndiaMap;
