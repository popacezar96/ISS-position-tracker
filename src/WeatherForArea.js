
const WeatherForArea = (props)=>{

    const localWeather = props.weather;

    if(typeof localWeather.daily[0] !== 'undefined'){

        // show min and max temperature for today and the next 7 days

        const dailyWeather = localWeather.daily.map((day,index)=>{

            //dates starting from today

            let today = new Date();
            today.setDate(today.getDate() + index);
            const currentDay = today.toLocaleDateString('en-US', { weekday: 'short' });

            return(
                <div key={index}>
                    <h3>{(index === 0)? 'Today': currentDay}</h3>
                    <p>Min: {day.temp.min}°C</p>
                    <p>Max: {day.temp.max}°C</p>
                </div>
            )
        })

        return(
            <div>
                <h2>Weather analysis for the selected area</h2>
    
                <p>There are currently {localWeather.temperature}°C</p>
                <p>Description: {localWeather.description}</p>

                <div className="forecast-list">
                    {dailyWeather}
                </div>

            </div>
        )
    }

    else{
        return <p>Click on the map to get weather forecast!</p>
    }
}

export default WeatherForArea;