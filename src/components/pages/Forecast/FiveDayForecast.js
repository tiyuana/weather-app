import react , {useEffect , useState} from "react";
import { useParams } from "react-router";
import WeekContainer from "../WeeklyForecast/WeekContainer";
import { useLocation } from 'react-router-dom'


const FiveDayForecast = () => {

    const [dailyWeatherList, setDailyWeatherList] = useState([]);
    const params = useParams();
    const location = useLocation();

          
    const FetchData = ( async () => {
        
        let latitude;
        let longitude;

        if (!location.state){
            console.log("moras dohvatiti drugu lokacije!!!")
            const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${params.cityId}&limit=1&appid=5a4e05662564bdefbc9d1b3d65c255f0`);
            const data1 = await response1.json();
            latitude = data1[0].lat;
            longitude = data1[0].lon;

        }   else {
            
            latitude = location.state.lat;
            longitude = location.state.lon;
        }


        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=5a4e05662564bdefbc9d1b3d65c255f0`);
        const data = await response.json();
        console.log(data);

        for (let i = 0; i <5; i=i+1) {

            var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var dayNum = new Date(data.daily[i].dt * 1000).getDay();
            var dayName = days[dayNum];
            

            const dailyWeather = {
                dayName : dayName,
                icon : <img src={`http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`}/>,
                minTemp : data.daily[i].temp.min,
                maxTemp : data.daily[i].temp.max

            }

            setDailyWeatherList((prevDailyWeathers) => {
                const updated = [...prevDailyWeathers,dailyWeather];
                return updated;
            });
        }
    });


    useEffect(() => {
        FetchData();
    }, []);    


    return(
        <div>
            <WeekContainer fiveDays={dailyWeatherList} />
        </div>
    );
}

export default FiveDayForecast;