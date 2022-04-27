import React from "react";
import styles from "./HourCard.module.css"

const HourCard = (props) => {
    return(
        <div className={`${styles.hourCard} ${props.className}`}>{props.children}</div>
    );
}

export default HourCard;