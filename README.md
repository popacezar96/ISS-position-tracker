## ISS position tracker

This is a frontend project that shows the current position of the International Space Station (ISS) relative to the Earth by clicking a button.
The position is representedd by a red marker on a map. When clicking the marker, a popup indicating the temperature of the zone(°C) reported at the time of the request will appear on top of the marker.

### Technologies

The project was developed on top of React.js and the information required for it to work was provided through two different APIs:
- http://open-notify.org/Open-Notify-API/ -> for the latitude and longitude of the ISS
- https://openweathermap.org/ -> weather API

### Installation and use

To test out the app you need to follow these steps:

1. Clone the app from this repository
```
git clone https://github.com/popacezar96/ISS-position-tracker.git
```
2. Open a terminal inside the project directory and install the necessary dependencies through npm:
```
npm install
```
3. After completeng the instalation you can run the app using the command:
```
npm start
```
