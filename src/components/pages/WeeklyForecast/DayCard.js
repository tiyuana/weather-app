import {useParams } from "react-router";
import {Link} from 'react-router-dom';



const DayCard = (props) => {


    const params = useParams();

    const imgURL = `owf owf-${props.dailyForecast.icon} owf-5x`

    return (
        <div className="col-sm-2">
            <div className="card">
                <Link  to={`/${params.cityId}/${props.dailyForecast.dayName}`}><h2 className="card-title">{props.dailyForecast.dayName}</h2></Link>
                <i className={imgURL}>{props.dailyForecast.icon}</i>
                <h3>{Math.round(props.dailyForecast.minTemp)} °C</h3>
                <h3>{Math.round(props.dailyForecast.maxTemp)} °C</h3>
            </div>
        </div>
    );
}



export default DayCard;