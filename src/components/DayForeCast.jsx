import "../styles/WeatherApp.css"
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function DayForeCast({dayForecastInfo}){

    const ICON_URL = "https://openweathermap.org/img/wn/";
    
    if (!dayForecastInfo || dayForecastInfo.length === 0){        
    return null;
    }

    return(
        <div className="dayForecast">


            <span className="icon-text"> <CalendarTodayOutlinedIcon/> 5-DAY FORECAST </span> <br />

           <div className="daysData">

            {dayForecastInfo.map((item) => (
                <div key={item.date} className="dayForecastdiv">
                    <p>{item.day}</p>

                    <h2>{Math.floor(item.temp)}&deg;c</h2>
                    
                    <div className="iconImagedaily">
                        <img src={`${ICON_URL}${item.weather.icon}@2x.png`} alt="Weather illustration"/>
                    </div>


                </div>
             ))}
            </div>

            </div>
    );
}