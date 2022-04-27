import React from 'react'
import ReactDOM from "react-dom"

import styles from './ErrorModal.module.css'
import Card from './Card'

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onConfirm}></div>;
}

const ModalOverlay = (props) => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <button onClick={props.onConfirm} className={styles.button} >Okay</button>
            </footer>
        </Card>
    );
}

const ErrorModal = props => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}/>, document.getElementById("backdrop-root") )}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById("modal-root"))}
        </React.Fragment>      
    );
}

export default ErrorModal;