
import { LineChart } from '@mui/x-charts/LineChart';
import "../styles/WeatherApp.css"



export default function HourForeCast({forecastInfo}){

    if (!forecastInfo || forecastInfo.length === 0){        
    return null;
    }

 
    const forecast8 = forecastInfo.slice(0, 8); // Get only the first 8 entries
    const temperatureArray = forecast8.map(item => Math.round(item.temperature));

    const timeArray = forecast8.map(item => {
    const [hour] = item.time.split(' ')[1].split(':');
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12} ${suffix}`;
    });


    return(
        
        <div className="hourForeCastBox">
            
            <LineChart
                height={300}
                series={[{
                data:  temperatureArray,
                color: '#90caf9',
                }]}
                xAxis={[{
                scaleType: 'point', data: timeArray, 
                tickLabelStyle: { fill: '#fff' },
                axisLineStyle: { stroke: '#888' },
                tickLineStyle: { stroke: '#888' },
                }]}
            
                
                axisHighlight={{ x: 'line', y: 'none' }}
                tooltip={{
                trigger: 'axis',
                markLineProps: {
                    stroke: '#fff',
                    strokeWidth: 1,
                    strokeDasharray: '4 2',
                },
                }}
                sx={{
                '.MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: '#fff' },
                '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: '#888' },
                '.MuiChartsAxis-left .MuiChartsAxis-tick': { stroke: '#888' },
                '.MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: '#fff' },
                '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#888' },
                '.MuiChartsAxis-bottom .MuiChartsAxis-tick': { stroke: '#888' },
                }}
            />

        </div>
    );
}