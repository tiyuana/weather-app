import React , {useState , useRef, useContext} from 'react';
import { useHistory } from 'react-router';
import Card from '../UI/Card';
import styles from "./Login.module.css";
import ErrorModal from '../UI/ErrorModal';
import AuthContext from '../../store/auth-context';

const Login = (props) => {

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState();
    const authCtx = useContext(AuthContext);



    const loginHandler = (event) => {

        event.preventDefault();

        if(emailRef.current.value.trim().length === 0|| passwordRef.current.value.trim().length === 0){
            setError({
                title : "Invalid email or password",
                message : "Try again - non empty"
            })
            return;
        }

        if(!emailRef.current.value.trim().includes('@')){
            setError({
                title : "Invalid email",
                message : "Try again - email must contain @"
            })
            return;
        }
        if(passwordRef.current.value.trim().length < 8){
            setError({
                title : "Invalid password",
                message : "Try again - password must contain at least 8 characters"
            })
            return;
        }

        if (passwordRef.current.value.search(/[A-Z]/) === -1){
            setError({
                title : "Invalid password",
                message : "Try again - password must contain at least one uppercase letter"
            })
            return;
        }
        if (passwordRef.current.value.search(/[0-9]/) === -1){
            setError({
                title : "Invalid password",
                message : "Try again - password must contain at least one number"
            })
            return;
        }
        if (passwordRef.current.value.search(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/) === -1){
            setError({
                title : "Invalid password",
                message : "Try again - password must contain one special character"
            })
            return;
        }

        const enteredUser = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        };

        const date = props.getDate(new Date());


        const token = enteredUser.email + date;
        console.log("in Login.js Token = "+token);
        console.log("ispravni su svi podaci!");

        authCtx.login(token);
        console.log("spremio sam token!! valjda")

        props.onLogin(token);
        emailRef.current.value = '';
        passwordRef.current.value = '';
        console.log("sada idemo na weather, trebali bi");
        history.replace("/weather");

    }


    const confirmHandler = () =>{
        setError(null)
    }


    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={confirmHandler}/>}
            <Card className={styles.input}>
                <form onSubmit={loginHandler}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" ref={emailRef} ></input>
                    <label htmlFor="password" >Password</label>
                    <input id="password" type="text" ref={passwordRef}></input>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </Card>
        </div>
    );
}

export default Login;