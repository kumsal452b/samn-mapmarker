import Map from './components/Map';
import "./App.css";
import 'leaflet/dist/leaflet.css';
import datas from './components/Locations.json'
function App() {
  // localStorage.setItem('items',JSON.stringify(datas))
  return (
    <div className="leaflet-map" >
      <Map/> 
    </div>
  );
}

export default App;
