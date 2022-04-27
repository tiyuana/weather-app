import React from "react";
import Card from "../../UI/Card";
import Conditions from "../Conditions/Conditions";
import styles from "./ForecastList.module.css"

const ForecastList = (props) => {

    const deleteCity = (cityName) => {
        console.log("in forecastList.js brisem cityName = "+cityName);
        props.onDelete(cityName);
    }

    const addToFavorites = (cityObject) => {
        console.log("in ForecastList.js dodajem favorite sljedeci objekt ->");
        console.log(cityObject);
        props.onAddToFavorites(cityObject);
    }

    return(
        <section className={styles.cities}>
            <Card>
                <ul >
                    {props.cities.map((city) => (
                        <Conditions
                            key={city.key}
                            name={city.name}
                            icon={city.icon}
                            responseObj={city.responseObj}
                            error={city.error} 
                            loading={city.loading}
                            onDelete={deleteCity}
                            onAddToFavorites={addToFavorites}
                        /> 
                    ))}
                </ul>
            </Card>
        </section>
        
    );

};

export default ForecastList;