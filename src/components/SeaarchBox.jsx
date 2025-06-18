
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import '../styles/WeatherLeftInfo.css';
import PlaceIcon from '@mui/icons-material/Place';
import  WeatherBackground from '../components/WeatherVideo.jsx';



export default function SearchBox({setWeatherInfo, setForecastInfo, setDayForecastInfo, setUVdata, setWindDeg, setVideoUrl}){ // access the state variable
    let[city, setCity] = useState("");
    const [hasSearched, setHasSearched] = useState(false);  //for search btn animation


    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "7b553635f0810a5c9a71ee5168f5b993";
    const FORECAST_URL ="https://api.openweathermap.org/data/2.5/forecast";
    const UV_API_URL = "https://api.weatherapi.com/v1/forecast.json?key=e296bcc070be4bf9a1862404251006"; //&q=Durgapur&days=1"

    


    // for 24 hour data: https://api.openweathermap.org/data/2.5/forecast?lat=21.0285&lon=105.8542&appid=7b553635f0810a5c9a71ee5168f5b993&units=metric

    let getWeatherInfo = async()=>{
       let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponse = await response.json();
      
        const result = {
            city:jsonResponse.name,
            clouds : jsonResponse.clouds,
            temp: jsonResponse.main.temp,
            maxTemp: jsonResponse.main.temp_max,
            minTemp: jsonResponse.main.temp_min,
            feels_like: jsonResponse.main.feels_like,
            groundLevel: jsonResponse.main.grnd_level,
            humidity: jsonResponse.main.humidity,
            sea_level: jsonResponse.main.sea_level,
            sunrise: jsonResponse.sys.sunrise,
            sunset: jsonResponse.sys.sunset,
            visibility: jsonResponse.visibility,
            weather: jsonResponse.weather[0],
            winddirection: jsonResponse.wind.deg,
            windSpeed: jsonResponse.wind.speed
        }
        //  console.log(jsonResponse);
        //  console.log(result);
        setWeatherInfo(result);
        setWindDeg(result.winddirection);
        WeatherBackground({ setVideoUrl, weatherData: jsonResponse });
    }


let getforeCasetInfo = async()=>{
        let response = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        const forecastData = await response.json();

        
            //############ DAY DATA ###################

            const dailyForecast = [];
            const addedDays = new Set();

            forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
            const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

            // Only pick one entry per date (e.g., first one at noon or closest to noon)
            if (!addedDays.has(dateStr) && item.dt_txt.includes("12:00:00")) {
                dailyForecast.push({
                day: dayName,
                date: dateStr,
                weather: item.weather[0], // main weather info
                temp: item.main.temp
                });
                addedDays.add(dateStr);
            }
            });

            setDayForecastInfo(dailyForecast);
            // console.log(dailyForecast);



        //############# HOUR DATA #################
        const first24Hours = forecastData.list.map(item => ({   // forecastData have list array then map function...
             time: item.dt_txt, // already human-readable, e.g., "2025-06-07 09:00:00"
             temperature: item.main.temp,
            weather: item.weather[0] // array with 1 object 
        }));

        // console.log(first24Hours);
        setForecastInfo(first24Hours);
    }


    //############# UV DATA (Weather API) #################

    let getUvData = async()=>{
        let uvResponse = await fetch(`${UV_API_URL}&q=${city}&days=1`);
        const jsonuvResponse = await uvResponse.json();
        let UvData = {
            uvIdx : jsonuvResponse.current.uv,
            sunSet: jsonuvResponse.forecast.forecastday[0].astro.sunset,
        }
        // console.log(UvData);
        setUVdata(UvData);
    }


    let handelChange = (event)=>{  // for input change 
        setCity(event.target.value);
    }

    let handelForm = (event)=>{
        event.preventDefault();
        getWeatherInfo();
        getforeCasetInfo(); 
        getUvData();
        setCity("");    
         setHasSearched(true); //for search box animation
    }



    return(
    <>
         
    <form onSubmit={handelForm}>
        <div id="searchContainer" className={hasSearched ? 'afterSearch' : 'initial'}>
         <PlaceIcon id="searchLocationIcon"/>
            <TextField className='SearchBOX' id="city" placeholder="Cityname" variant="standard" value={city} required onChange={handelChange}
             InputProps={{ 
                disableUnderline: true,  
            sx: {                              // to disable autofill white box and undrline
            '& input:-webkit-autofill': {
                transition: 'background-color 9999s ease-in-out 0s',
                WebkitTextFillColor: 'inherit',
                caretColor: 'inherit',
            },
    }, }}/> 
         <Button id='searchBtn' variant="contained" type='submit' >Search</Button> 
        </div>
            
    </form>
     </>   
    );
}