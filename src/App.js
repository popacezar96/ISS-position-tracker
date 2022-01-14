import './App.css';
import WeatherForArea from './WeatherForArea';
import {useRef, useEffect, useState} from 'react';

import mapboxgl from 'mapbox-gl';


//Setting necessary API keys
mapboxgl.accessToken = 'pk.eyJ1IjoicG9wYWNlemFyIiwiYSI6ImNreTcwcHdnODB4aHYyd3FjbTd1YTVuOTIifQ.ugfd7chAjxQP-uDoXxzdtA';
const weatherKey = '896846e494d895e2763ed9316f5c2ffb';


//define iss marker and clicked area marker
const issMarker = new mapboxgl.Marker({
  color: '#F84C4C' // color it red
  });


function App() {

  //initial values to render the map
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const [forecast, setForecast] = useState({
    temperature: 0,
    description: '',
    daily: []
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
      issMarker.setLngLat([lng,lat]);
      issMarker.addTo(map.current);


      //returns weather corresponding to the position of the ISS
      const issTempData = await fetchWeatherData(lat,lng);
      
      const issTemp = issTempData.current.temp;

      const popup = new mapboxgl.Popup().setText(
        `Temperature: ${issTemp} °C`
      ).setMaxWidth('none');
      

      //show temperature when clicking on marker
      issMarker.setPopup(popup);

    } catch (err) {
        console.log(err);
    }
  };


  //fetch weather for specific longitude and latitude on the map
  const fetchWeatherData = async (lat,lng) => {

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,alerts&appid=${weatherKey}`
          );

        const weatherData = await weatherRes.json();

        try {

          return weatherData;

        } catch (err) {
          console.log(err);
        }
  }


  useEffect(() => {

    if (map.current) return; // initialize map only once
    
    //generating the map with some default values
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0,0],
      zoom: 6
    });


    map.current.on('click',(e)=>{

      fetchWeatherData(e.lngLat.lat, e.lngLat.lng)
      .then((res)=>{  
        setForecast({
          temperature: res.current.temp,
          description: res.current.weather[0].description,
          daily: res.daily
        });
      })
      .catch((err)=>{
        console.log(err);
      })
    });

  });


return(
  <div className='App'>
    <div ref={mapContainer} className="map-container"/>
    
    <button onClick={fetchIss}>
      Current Iss position
    </button>
    {/* Component that shows updated weather predictions for a given area */}
    <WeatherForArea weather = {forecast}/>

  </div>
  )
}

export default App;
