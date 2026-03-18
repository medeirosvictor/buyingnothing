import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

// Note: In production, you might want to handle this differently
// This is a workaround for the default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export interface MapMarker {
  position: LatLngExpression;
  title?: string;
  description?: string;
}

export interface MapProps {
  center?: LatLngExpression;
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  width?: string;
  scrollWheelZoom?: boolean;
  className?: string;
}

// Default to Fortaleza, Ceará, Brazil
const DEFAULT_CENTER: LatLngExpression = [-3.7172, -38.5433];
const DEFAULT_ZOOM = 13;

export function Map({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            {marker.title && (
              <Popup>
                <strong>{marker.title}</strong>
                {marker.description && <p className="m-0">{marker.description}</p>}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Convenience component for single marker with default location
export function SimpleMap({
  height = '400px',
  className = '',
}: {
  height?: string;
  className?: string;
}) {
  return <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} height={height} className={className} />;
}
