
const videoMap = {
  Clear: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/w_500/q_auto/f_auto/v1750138315/sunny-cloudy_weather_qsc3oz.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163585/clear_sky_night_m2xlwm.mp4',
  },
  Clouds: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163768/pretty_cloudy_pgywip.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163680/night_cloud_lzfcmb.mp4',
  },
  Rain: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138296/Rain_lmyclg.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163721/Rain_zdccde.mp4',
  },
   Thunderstorm: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138293/thanderstrom-_afternoon_sp1msd.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138298/Thanderstrom_khesst.mp4',
  },
  Fog: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163590/foggy_day_tmwevd.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750165902/foggy_night_hpena6.mp4',
  },
   Snow: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138292/snow_day_yglkpm.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138288/night_snow_p8htnx.mp4',
  },
  Default: {
    day: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750138292/cloudy_e3xfob.mp4',
    night: 'https://res.cloudinary.com/db4aeva1d/video/upload/v1750163680/night_cloud_lzfcmb.mp4',
  },
};



export default function WeatherBackground({setVideoUrl, weatherData}){
   
    const now = weatherData.dt;
    const sunrise = weatherData.sys.sunrise;
    const sunset = weatherData.sys.sunset;

    const isDay = now >= sunrise && now < sunset;
    const condition = weatherData.weather[0].main;

    const key = videoMap[condition] ? condition : 'Default';
    const url = isDay ? videoMap[key].day : videoMap[key].night;

    setVideoUrl(url);

  //  console.log(weatherData);
  //  console.log(url);
   
}