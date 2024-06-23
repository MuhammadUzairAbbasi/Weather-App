import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function TodayWeather(props){

  function weather(){
        console.log(props);
      if(props && props.city && props.tempreture && props.image && props.description){
        return <>
          <Grid container spacing={2} className='today-weather-container grid grid-cols-2 text-2xl '>
            <Grid xs={5} sm={5} className='today-image mr-14 grid justify-end'>
            <div>
            <img src={`http://openweathermap.org/img/wn/${props.image}@4x.png`} alt=" " />
            </div>
            </Grid>

            <Grid item xs={5} sm={4} className='today-weather grid text-start ml-5 mt-5'>
            <div >
            <h1>Today</h1>
            <h2>{props.city.name}  {props.city.country}</h2> 
            <h4>Tempreture : {props.tempreture.temp}</h4>
            <h4>{props.description}</h4>
            </div>
            </Grid>
          </Grid>
      </>}
      else {
        console.log("Not Searched");
        return null
      }
  }
  return <>
    <Box>
    {weather()}
    </Box>
    </>
}