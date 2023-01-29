import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assets/marker-icon.png";
import MarkerIconShadow from "../../assets/marker-shadow.png";

interface IProprietatePageMap {
  lat: number;
  long: number;
}
const ProprietatePageMap: React.FC<IProprietatePageMap> = ({ lat, long }) => {
  return (
    <MapContainer
      center={[lat, long]}
      zoom={25}
      scrollWheelZoom={true}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[lat, long]}
        icon={
          new Icon({
            iconUrl: MarkerIcon.src,
          })
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ProprietatePageMap;
