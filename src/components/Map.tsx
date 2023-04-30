import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../App.css";
export default function Map() {
  const position: any = [51.505, -0.09];
  return (
    <MapContainer center={[45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
