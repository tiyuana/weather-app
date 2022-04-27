import HourCard from "../DailyWeather/HourCard";

const FavoriteWeather = (props) => {
    console.log("In FavoriteWeather.js ovo je props ->");
    console.log(props.weather);

    return(
        <HourCard className="w-100 p-2 m-4">
            <h2 className="align-self-end">{props.weather.name}</h2>
            <h4 className="align-self-center">It is currently {Math.round(props.weather.responseObject.main.temp)} °C out with {props.weather.responseObject.weather[0].description}.</h4>
            <img src={`http://openweathermap.org/img/w/${props.weather.icon}.png`} className="align-self-end"/>

        </HourCard>
    );
}

export default FavoriteWeather;