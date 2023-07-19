import styles from './Map.module.css'
import { useEffect, useState } from 'react';
import { MapContainer,TileLayer,Marker,Popup, useMap } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext';

function Map() {
  const navigate=useNavigate();
  const{cities}=useCities();
  const [mapPosition,setMapPosition]=useState([40,0])
 const [searchParams] =useSearchParams();
 const lat= searchParams.get("lat");
 const lng= searchParams.get("lng");
 useEffect(
  function(){
    if(lat && lng) setMapPosition([lat,lng]);
  },
  [lat,lng]
 );

return (
<div className={styles.mapContainer}>
    <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>(<Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
      {city.emoji}<br />   {city.cityName}.
      </Popup>
    </Marker>))}
    <ChangCenter position={mapPosition}/>
  </MapContainer>
</div>
  )
}

function ChangCenter({position}){
  const map=useMap();
  map.setView(position);
  return null;
}

export default Map