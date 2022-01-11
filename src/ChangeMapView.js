
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import ISS from './ISS.png';
//import {useEffect} from 'react';

const ChangeMapViews = (props)=>{

     //const map = useMap();
     map.setView(props.coords, map.getZoom());
    
    



    //  const myIcon = L.icon({
    //     iconUrl: ISS,
    //     iconSize: [38, 38]
    // });
    
    //let marker = new L.marker(props.coords, {icon: myIcon}).addTo(map);
    
    //map.addLayer(marker);

    return null;
}

export default ChangeMapViews;