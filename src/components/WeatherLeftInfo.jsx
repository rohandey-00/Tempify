
import "../styles/WeatherLeftInfo.css"
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


export default function WeatherLeftInfo({ info, videoUrl }) {
  if (!info || !info.weather) {
    return <h1 style={{color:"white", marginLeft:"12rem"}}>Search a City</h1>;
  }

  const ICON_URL = "https://openweathermap.org/img/wn/";

  return (
  <div className="div2 box">   
    <div className="leftUpperInfoBox">
      <h1>{Math.floor(info.temp)}&deg;c</h1>
      <h2>{info.weather.description}</h2>
      <p>
        Today, expect a {info.weather.description} day in {info.city} with temperature reaching a maximum of {info.maxTemp}&deg; C
      </p>
    </div>

    <div className="leftButtomInfo">
      <div className="feelsLike" id="leftButtomInfoDiv">
        <span className="icon-text">
        < ThermostatOutlinedIcon />
         FEELS LIKE
        </span>
        
        <div>
          <h4>{Math.floor(info.feels_like)}&deg;</h4> <br />
          <p>Maximum = {Math.floor(info.maxTemp)}&deg;c & minimum = {Math.floor(info.minTemp)}&deg;c</p>
        </div>
      </div>

      <div className="now" id="leftButtomInfoDiv">
        <span className="icon-text">
          <CloudQueueIcon/> 
          NOW
        </span>
        <div id="iconImage">
        <img src={`${ICON_URL}${info.weather.icon}@4x.png`} alt="Weather illustration" />
        </div>
     
      </div>

      <div className="visibility" id="leftButtomInfoDiv">
        <span className="icon-text">
        <VisibilityIcon />
        VISIBILITY
        </span>
        
        <div>
          <h4>{Math.round((info.visibility / 1000))} km</h4>
        </div>
       
      </div>

      <div className="humidity" id="leftButtomInfoDiv">
        <span className="icon-text">
          <WaterDropIcon/>  
          HUMIDITY
        </span>

        <div>
          <h4>{info.humidity}%</h4> <br />
          <p>Moisture in the air.</p>

        </div>

      </div>


    </div>
  </div>
  );
}