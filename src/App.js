import './App.css';
import {useRef, useEffect} from 'react';

import mapboxgl from 'mapbox-gl';


//Setting necessary API keys
mapboxgl.accessToken = 'pk.eyJ1IjoicG9wYWNlemFyIiwiYSI6ImNreTcwcHdnODB4aHYyd3FjbTd1YTVuOTIifQ.ugfd7chAjxQP-uDoXxzdtA';
const weatherKey = '896846e494d895e2763ed9316f5c2ffb';

function App() {

  //initial values to render the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  

  //define iss marker
  const marker = new mapboxgl.Marker({
    color: '#F84C4C' // color it red
    });

  

  //fetch ISS JSON data and weather
  const fetchIss = async () => {
    const issRes = await fetch("http://api.open-notify.org/iss-now.json");
    const issData = await issRes.json();

    try {
      const lat = issData['iss_position']['latitude'];
      const lng = issData['iss_position']['longitude'];

      map.current.flyTo({
        center: [lng,lat]
        });

        //move marker to Iss position
        marker.setLngLat([lng,lat]);    
        marker.addTo(map.current);

        //get weather for the position corresponding to the marker
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}`);
        const weatherData = await weatherRes.json();

        const temperature = (weatherData.main.temp - 273.15).toFixed(2);

        try {
          // weather info displayed when clicking on marker
          const popup = new mapboxgl.Popup().setText(
            `Temperature: ${temperature} °C`
            ).setMaxWidth('none');

            marker.setPopup(popup)

        } catch (err) {
          console.log(err);
        }

    } catch (err) {
        console.log(err);
    }
  };


  
  useEffect(() => {

    if (map.current) return; // initialize map only once
    
    //generating the map with some default values
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0,0],
      zoom: 6
    });

  });


return(
  <div className='App'>
    <div ref={mapContainer} className="map-container"/>
          
    <button onClick={fetchIss}>
      Current Iss position
    </button>
  </div>
  )
}

export default App;
