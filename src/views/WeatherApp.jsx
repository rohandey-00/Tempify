import { useState } from 'react';
import SearchBox from '../components/SeaarchBox'
import WeatherLeftInfo from '../components/WeatherLeftInfo'
import HourForeCast from '../components/HourForeCast'
import DayForeCast from '../components/DayForeCast'
import IndexWind from '../components/IndexWind'
import "../styles/WeatherApp.css"

export default function WeatherApp(){

    const[weatherInfo, setWeatherInfo] = useState({});   //store base tempreature info
    const[forecastInfo, setForecastInfo] = useState([]);  //store hour and tempreature
    const[dayForecastInfo, setDayForecastInfo] = useState([]);  //store weaher based on 5 days 
    const[Uvdata, setUVdata] = useState({});  // store data from weatherAPI
    const[windDeg, setWindDeg] = useState(0); //to rerender the compass direction
    const [videoUrl, setVideoUrl] = useState('');
    

    return(
        <div className='MainBoxApp'>
                   
            <div className="leftBox">
                <div className="SearchBox">
                <SearchBox setWeatherInfo={setWeatherInfo} setForecastInfo ={setForecastInfo} setDayForecastInfo={setDayForecastInfo} setUVdata={setUVdata} setWindDeg={setWindDeg} setVideoUrl={setVideoUrl}/>
                </div>

                <div className="leftInfoBox">
                    <div className="div1 box">
                             <video 
                            className="background-video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            key={videoUrl}
                            >
                        <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>
                   <WeatherLeftInfo info={weatherInfo} />  {/*  classname = div2 */}
                </div> 
            </div>


            <div className="RightBox">
               
                <HourForeCast forecastInfo = {forecastInfo}/>
                <DayForeCast dayForecastInfo = {dayForecastInfo} />
                <IndexWind info={Uvdata} weatherInfo={weatherInfo} windDeg={windDeg}/>

            </div>
       </div>
    );
}