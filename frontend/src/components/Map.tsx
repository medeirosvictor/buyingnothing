import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const activeIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
});

export interface MapMarker {
  position: LatLngExpression;
  title?: string;
  description?: string;
  id?: number;
}

export interface MapProps {
  center?: LatLngExpression;
  zoom?: number;
  markers?: MapMarker[];
  activeMarkerId?: number | null;
  height?: string;
  width?: string;
  scrollWheelZoom?: boolean;
  className?: string;
}

const DEFAULT_CENTER: LatLngExpression = [-3.7172, -38.5433];
const DEFAULT_ZOOM = 13;

export function Map({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  activeMarkerId = null,
  height = '400px',
  width = '100%',
  scrollWheelZoom = false,
  className = '',
}: MapProps) {
  return (
    <div className={className} style={{ height, width }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker
            key={marker.id ?? index}
            position={marker.position}
            icon={marker.id != null && marker.id === activeMarkerId ? activeIcon : defaultIcon}
          >
            {marker.title && (
              <Popup>
                <strong>{marker.title}</strong>
                {marker.description && <p className="m-0 text-xs">{marker.description}</p>}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
