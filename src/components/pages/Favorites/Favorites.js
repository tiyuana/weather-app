import { useLocation } from 'react-router-dom'
import FavoriteWeather from './FavoriteWeather';

const Favorites = () => {

    const location = useLocation();

    if (location.state){
        console.log("In Favorites.js ovo je lista Favorites ->");
        console.log(location.state);    }
    else{
        console.log("U Favorites.js nisi nista poslala");
    }

    return(
        <div>
            {!location.state && <h1>No cities added to favorites yet :-(</h1>}
            {location.state && location.state.length === 0 && <h1>No cities added to favorites yet :-(</h1>}
            {location.state && <div className="d-flex flex-column align-items-center ">
                {location.state.map((weather) => (
                    <FavoriteWeather key={weather.name} weather={weather}/>
                ))}
            </div>}
        </div>
        
    );
}

export default Favorites;