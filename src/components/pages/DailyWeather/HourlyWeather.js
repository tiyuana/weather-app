import HourCard from "./HourCard";

const HourlyWeather = (props) => {

    return(
        <HourCard className="w-50 d-flex p-4 m-5">
            <h4 className="align-self-center">{props.hourlyWeather.hours}</h4>
            <p className="align-self-center">{props.hourlyWeather.icon}</p>
            <h4 className="align-self-center">{Math.round(props.hourlyWeather.temp)} °C</h4>
        </HourCard>
    );

}

export default HourlyWeather;