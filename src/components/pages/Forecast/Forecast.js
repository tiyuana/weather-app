import React , {useState, useCallback} from 'react';
import styles from './Forecast.module.css';
import ForecastList from './ForecastList';
import {Link} from 'react-router-dom';


const Forecast = () => {


    const [unit,setUnit] = useState("metric");
    const [enteredCity, setEnteredCity] = useState("");
    let [responseObj, setResponseObj] = useState({});

    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    const [cityList, setCities] = useState([]);

    const [favorites, setFavorites] = useState([]);


    const deleteCityHandler = (cityName) => {
        console.log("in forecast.js ovo je cityname= "+cityName);
        setError(false);
        let updatedCities;

        updatedCities = cityList.filter(item => item.responseObj.name !== cityName);
        setCities(updatedCities);
    }


    const ifExist = (item, itemList) => {
        console.log("provjeri postojanje grada "+item);
        for(var it in itemList){
            console.log("provjeravam grad ");
            console.log(itemList[it].name);
            if (item === itemList[it].name){
                return true;
            }
        }
        return false;
    };


    const addToFavoritesHandler = (cityObject) => {
        setError(false);
        console.log("in Forecast.js i want to add to favorites sljedeci objekt ->");
        console.log(cityObject);

        if (ifExist(cityObject.name, favorites)){        
            console.log(cityObject.name + " je vec u listi!");
            setError('City is already in favorites!');
        }
        else{
            setFavorites((prevFavorites) => {
                console.log("lista favorita u handleru")
                console.log(favorites);
                const updatedFav = [...prevFavorites,cityObject];
                console.log(favorites);
                return updatedFav;
            });
        }
    }

    const getForecast = useCallback(async (e) => {
        if(e){
            e.preventDefault();
        }

        //clear states for new data
        setError(false);
        setLoading(true);

        try{
            if (cityList.length === 10) {
                throw new Error("Max 10 cities allowed!");
            }

            if(enteredCity.trim().length === 0){
                throw new Error('Input is empty - try again!');
            }


            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&units=${unit}&appid=5a4e05662564bdefbc9d1b3d65c255f0`);
            if (!response.ok) {
                throw new Error("Please enter valid city");
            }

            
            else {
                // waits until the request completes...
                const data = await response.json();

                setResponseObj(data);
                setLoading(false);

                if (ifExist(data.name, cityList)){
                    throw new Error('City is already listed!');
                }
                console.log(data);
                const responseCity = {
                    key : data.name,
                    name : data.name,
                    responseObj : data,
                    icon: data.weather[0].icon,
                    error : false,
                    loading : loading
                }
                
                setCities((prevCities) => {
                    const updated = [...prevCities,responseCity];
                    return updated;
                });
            }
            
        } catch (error) {
            setError(error.message);
            console.log("error message");
        }
        setLoading(false);
    
    });



    let content = <p></p>;
    let errorContent = <p></p>;

    if (cityList.length > 0) {
        content = <ForecastList cities={cityList} onDelete={deleteCityHandler} onAddToFavorites={addToFavoritesHandler}/>;
        console.log(cityList);
    }

    if (error) {
        errorContent = <p className={styles.Small}>{error}</p>;
    }

    if (loading) {
        content = <p>Loading...</p>;
    }
        


    return(
        <div>
           <h2>Find Current Weather Conditions</h2>
           <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={enteredCity}
                    onChange={(e) => setEnteredCity(e.target.value)}
                    className={styles.TextInput}
                    />

                <label className={styles.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={styles.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celsius
                </label>
                <button className={styles.Button} type="submit">Get Forecast</button>
            </form>

            <Link to={{ pathname: "/weather/favorites", state: favorites }}><button className={styles.Button}>Go to favorites</button></Link>
            {error && errorContent}
            <section>{content}</section>
        </div>
    );

}
export default Forecast;