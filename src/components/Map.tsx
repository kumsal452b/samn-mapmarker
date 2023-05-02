import { MapContainer, Marker,TileLayer, useMap } from "react-leaflet";
import "../App.css";
import { Alert, Button, List, Snackbar } from "@mui/material";
import "./Map.css";
import TheListItem from "./ListItem";
import { Icon, Map } from "leaflet";
import { useEffect, useState } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

let myMap: Map;
const BuildMap = ({ theRef }: { theRef: Function }) => {
  const map = useMap();
  if (theRef) {
    theRef(map);
  }
  return null;
};
export default function MapComponent() {
  const position: any = [51.505, -0.09];
  var theData = localStorage.getItem("items");
  const [locations, setLocations] = useState<Array<any>>(
    theData ? JSON.parse(theData) : []
  );
  const [existAlert, setExistAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  function upTheMap(refMap: any) {
    myMap = refMap;
  }
  const onClick = (data: any, args: any) => {
    myMap.setView([data.lat, data.lng], 12);
  };
  const onDelete = (data: any, args2: any) => {
    var theFilteredData = locations.filter((el: any) => el.id !== data.id);
    localStorage.setItem("items", JSON.stringify(theFilteredData));
    setLocations(theFilteredData);
  };
  const saveTheMap = () => {
    let theLastIndex = locations[0];
    let lat = myMap.getCenter().lat;
    let lng = myMap.getCenter().lng;
    let theTemp = Object.create(locations);
    let theFindOut = theTemp.filter(
      (loc: any) => loc.lng === lng && loc.lat === lat
    );
    if (theFindOut.length !== 0) {
      setExistAlert(true);
      return;
    }
    var theObject = {
      date: new Date(),
      lat: myMap.getCenter().lat,
      lng: myMap.getCenter().lng,
      id: theLastIndex ? theLastIndex.id + 1 : 0,
    };

    localStorage.setItem("items", JSON.stringify([theObject, ...locations]));
    setLocations([theObject, ...locations]);
    setSuccessAlert(true);
  };
  const closeExist = () => {
    setExistAlert(false);
  };
  const closeSuccess = () => {
    setSuccessAlert(false);
  };
  const saveJson=()=>{
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(locations));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "GLOC" + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  return (
    <div>
      <div className="top-container-left">
        <div key={"123dsfs123"} className="list-items">
          {locations?.map((el: any) => {
            return (
              <TheListItem
                data={el}
                onClick={onClick}
                onDelete={onDelete}
                key={el.lng + el.lat + el.id}
              />
            );
          })}
        </div>
      </div>
      <div className="top-container-right">
        <Button variant="contained" onClick={saveTheMap.bind({})}>
          Save
        </Button>
        <Button variant="contained" onClick={saveJson.bind({})} style={{marginLeft:10}}>
          Dowload
        </Button>
      </div>
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100vh" }}
        key={"123123map12312"}
      >
        <BuildMap theRef={upTheMap} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations?.map((el) => {
          let key = el.id + "mymap" + el.id + el.lat;
          return (
            <Marker
              position={[el.lat, el.lng]}
              key={key}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            ></Marker>
          );
        })}
      </MapContainer>
      <Snackbar open={existAlert} autoHideDuration={3000} onClose={closeExist}>
        <Alert severity="error" sx={{ width: "100%" }}>
          This location already exist!
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={closeSuccess}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Success!
        </Alert>
      </Snackbar>
    </div>
  );
}
