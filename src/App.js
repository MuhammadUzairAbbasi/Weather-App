import React,{useState,useEffect} from 'react'
import SearchBar from './components/SearchBar'
import TodayWeather from './components/Today_Weather'
import WeekWeather from './components/weekweather'
import Grid from '@mui/material/Unstable_Grid2'


export default function App(){
  const [term,setterm]=useState(null);
  const [todayweather,settodayweather]=useState(null);
  const [cityDetails,setcityDetials]=useState(null)
  const [tempDetails,settempDetails]=useState(null)
  const [image,setimage]=useState(null)
  const [weather,setweather]=useState([]);
  const [OtherDayWeather,setOtherDayWeather]=useState([])
  
  let now = new Date();
  console.log(now);
 
        let currentHour = now.getHours().toString().padStart(2, '0');
        console.log(currentHour);
        let currentTime = `${currentHour}:00:00`;

    useEffect(() => {
      if (term) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_WEATHER_API}&q=${term}&units=metric`;
        fetch(url)
          .then(res => res.json())
          .then(data => {
            console.log(data);
  
            setcityDetials(data.city)
            settempDetails(data.list[0].main)
            setweather(data.list)
            setimage(data.list[0].weather[0].icon)
            settodayweather(data.list[0].weather[0].description)
          })
          .catch(err => {
            console.log(err);
          });
      }
    }, [term]);

  console.log("Weather Details",weather);

  useEffect(() => {
    if (weather.length > 0) {
      const groupedData = weather.reduce((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      const dailyData = Object.values(groupedData).map(items => {
        return items.reduce((closest, current) => {
          const targetTime = new Date(`${current.dt_txt.split(' ')[0]} ${currentTime}`);
          const currentDiff = Math.abs(new Date(current.dt_txt) - targetTime);
          const closestDiff = Math.abs(new Date(closest.dt_txt) - targetTime);
          return currentDiff < closestDiff ? current : closest;
        });
      });

      setOtherDayWeather(dailyData.slice(1, 4));
    }
  }, [weather, currentTime]);

  function handleterm(value){
    console.log(value);
    setterm(value)
  }
 
  return (
  
    <div className="App">
    <div className='Background'>  </div>
   <div className="weather-update text-center text-3xl border border-white p-2">
     
     <div className="text-center p-2 ">
          <SearchBar onSearch={handleterm}/>
        </div>
      

      <div className='md:ml-28'>
      <TodayWeather city={cityDetails} tempreture={tempDetails} image={image} description={todayweather}/>
      </div>
      <div className='md:ml-15 '>
      <Grid container spacing={2} >
          {OtherDayWeather.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <WeekWeather 
                date={item.dt_txt} 
                image={item.weather[0].icon} 
                temperature={item.main.temp} 
                description={item.weather[0].description} 
              />
            </Grid>
          ))}
        </Grid>

     </div>
     </div>

    </div> 
  )
}

