
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import WindCompass from '../components/WindCompass';
import AirIcon from '@mui/icons-material/Air';
import "../styles/WeatherApp.css";


export default function IndexWind( {info, weatherInfo, windDeg}){
     if (!info || !weatherInfo || !windDeg || info.length === 0) {
    return null;
  }

  const { uvIdx: value, sunSet: time } = info;
  const degree = windDeg;


  function getWindDirection(degree) {
        const directions = [
            "North", "North-East", "East", "South-East",
            "South", "South-West", "West", "North-West"
        ];

        const index = Math.round(degree / 45) % 8;   // Divide the circle into 8 parts (360/8 = 45 degrees each)

        return directions[index];
    }
   
    //-----------------------------------------------------------------------------------

    // Determine label
    const label = value <= 2 ? 'Low' :
                    value <= 5 ? 'Moderate' :
                    value <= 7 ? 'High' :
                    value <= 10 ? 'Very High' : 'Extreme';

    const markerLeft = `${(value / 11) * 100}%`; // Calculate position for marker (value 0–11 mapped to %)


    //Ultra Violet Ray message
    let uvMessage =
    value >= 8 ? "Very High UV – Protection Needed"
    : value >= 6 ? "High UV – Wear Sunscreen"
    : value >= 3 ? "Moderate UV"
    : value > 0  ? "Low UV – Minimal Risk"
    : "Chill it's night";


   


    return(
        <div className="rightButtomBox">

            <div className="uv-card">
                <div className="uv-header">
                    <span className="icon-text"><ThermostatOutlinedIcon/></span> UV INDEX
                </div>
                <h4 className="uv-value">{value}</h4>
                <div className="uv-label">{label}</div>
                
                <div className="uv-scale">
                    <div className="uv-gradient"></div>
                    <div className="uv-marker" style={{ left: markerLeft }}></div>
                </div>
                
                <p className="uv-note">{uvMessage}</p>
            </div>
            

            <div className="winnd-card">
                <div className="wind-header">
                    <span className="icon-text"><AirIcon/></span> WIND
                </div>

                <div className="parrentWindCard">  {/*to fit/adjust properly*/}
                    <div>
                         <h4 className="wind-value">{Math.floor(weatherInfo.windSpeed)}&nbsp;<p id="windkm">km/h</p></h4>  
                        <h5 id='windDirName'>{getWindDirection(degree)}</h5>              
                    </div>
                   
                  <div  className='windCompass'>
                     <WindCompass degree={degree} />
                   </div>

                </div>
               

            </div>
    

        </div>
        
    );
}