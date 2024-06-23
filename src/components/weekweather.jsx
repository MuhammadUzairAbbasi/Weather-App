
export default function WeekWeather(props) {
    console.log(props);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date=new Date(props.date)
    console.log(date);
    
    function WeatherData(){
        if(props && props.date && props.image && props.description && props.temperature){
            return <>
            <div className="weak-weather w-46  text-start text-xl ">
                <div ><img src={`http://openweathermap.org/img/wn/${props.image}@4x.png`} alt="" /></div>
                    <div className=" ml-12">
                        <h6>{daysOfWeek[date.getDay()]}</h6>
                        <h6>Temperature  {props.temperature}</h6>
                        <h6>{props.description}</h6>    
                    </div>
                </div>
                </>
        }
        else {
            console.log("NO Data");
            return null
        }

    }
    return <>
    {WeatherData()} 
    </>
}

