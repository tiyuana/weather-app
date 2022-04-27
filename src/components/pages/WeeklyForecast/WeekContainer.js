import react from "react";
import DayCard from "./DayCard";
import { useParams } from "react-router";



const WeekContainer = (props) => {

    const params = useParams();

    return(
        <div className="container">
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <h3 className="display-5 text-muted">{params.cityId}</h3>
          <div className="row justify-content-center">
            {props.fiveDays.map((dayWeather) => (
                  <DayCard key={dayWeather.dayName} dailyForecast={dayWeather} />
            ))}
          </div>
        </div>
    );

}

export default WeekContainer;