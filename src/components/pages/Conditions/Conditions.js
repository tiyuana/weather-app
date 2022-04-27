import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Conditions.module.css';
import Button from '../../UI/Button';

const Conditions = (props) => {

    console.log("in conditions.js");

    const deleteHandler = () => {
        console.log("in Conditions.js obrisi grad "+props.responseObj.name);
        props.onDelete(props.responseObj.name);
    }

    const addToFavoritesHandler = () => {
        const responseCity = {
            name : props.name,
            icon : props.icon,
            responseObject : props.responseObj
        }
        console.log("in Conditions.js dodaj u favorites sljedeci objekt -> ");
        console.log(responseCity);
        props.onAddToFavorites(responseCity);
    }

    return (
        <li className={styles.city}>
            <div className={styles.Wrapper}>
                {props.loading && <div className={styles.Loader} />}

                {!props.error && props.responseObj.cod === 200 ?
                    <div>
                        <Link to={{ pathname: `/${props.responseObj.name}`, state: props.responseObj.coord }}><strong>{props.responseObj.name}</strong></Link>
                        <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                    </div>
                : null}
            </div>
            <div className={styles.button}>
                <Button onClick={deleteHandler}>Delete</Button>
                <Button onClick={addToFavoritesHandler}>Add To favorites</Button>
            </div>
        </li>
        
    );
}

export default Conditions;