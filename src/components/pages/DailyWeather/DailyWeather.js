import {useEffect, useState} from "react";
import { useParams } from "react-router";
import HourlyWeather from "./HourlyWeather";


//ovdje ne mogu koristiti hourly forecast 4 days jer imam samo free acc openweather-a
//one call api ima hourly samo za 2 dana
//jedino mogu 3hour 5 day pa prikazivati svaka 3 h
const DailyWeather = (props) => {

    const params = useParams();
    const [hourlyWeatherList, setHourlyWeatherList] = useState([]);

    const getDayName = (dt) => {
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var dayNum = new Date(dt * 1000).getDay();
        var dayName = days[dayNum];
        return dayName
    }

    const fetchData = ( async () => {
        console.log("in Daily Weather.js")
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params.cityId}&units=metric&appid=5a4e05662564bdefbc9d1b3d65c255f0`);
        const data = await response.json();
        console.log(data);

        for(let i = 0; i<40 ; i++){
            const dayName = getDayName(data.list[i].dt);

            if(params.dayId === dayName){
                let data_time = data.list[i].dt_txt.split(" ")[1];
                let expected_temp = data.list[i].main.temp;


                const hourlyWeather = {
                    hours : data_time,
                    icon : <img src={`http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`} alt=""/>,
                    temp : expected_temp
                }

                setHourlyWeatherList((prevHourlyWeathers) => {
                    const updated = [...prevHourlyWeathers,hourlyWeather];
                    return updated;
                });
            }
        }
    });


    useEffect(() => {
        fetchData();
    }, []);  


    return(

        <div className="d-flex flex-column align-items-center">
            {hourlyWeatherList.map((hourlyWeather) => (
                <HourlyWeather key={hourlyWeather.hours} hourlyWeather={hourlyWeather}/>
            ))}
        </div>
    );
}

export default DailyWeather;