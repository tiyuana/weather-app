import React from "react";
import { Route , Switch, Redirect} from "react-router-dom";
import './App.css';
import Forecast from './components/pages/Forecast/Forecast';
import Login from "./components/Login/Login";
import FiveDayForecast from "./components/pages/Forecast/FiveDayForecast";
import DailyWeather from "./components/pages/DailyWeather/DailyWeather";
import Favorites from "./components/pages/Favorites/Favorites";


function App() {


  const storeUser = (token) => {
    console.log("in App.js spremam token "+token);
    localStorage.setItem("token", token);

  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }
  
  const formatDate = (date) => {
      return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
      ].join('-');
  }

  //checks if token date is validate ; if matches today's date
  const checkTokenValidity = (token) => {
    if(!localStorage.getItem("token")){
      return false;
    }

    const currentDate = formatDate(new Date());
    const tokenDate = token.substr(token.length - 10);
    if(currentDate === tokenDate){
      return true
    }
    return false

  }


  return (
    <div className="App">
      <Switch>

        <Route path = "/weather" exact>
          <header className="App-header">
            <h1>Weather App</h1>
          </header>
          <main className="main">
            {checkTokenValidity(localStorage.getItem("token")) && <Forecast />} 
            {!checkTokenValidity(localStorage.getItem("token")) && <Redirect to="/"/> } 
          </main>
          <footer className="footer">
            Page created by Tihana
          </footer>
        </Route>

        <Route path="/" exact>
          <Login onLogin={storeUser} getDate={formatDate}/>
        </Route>

        <Route path="/:cityId" exact>
          {checkTokenValidity(localStorage.getItem("token")) && <FiveDayForecast /> } 
          {!checkTokenValidity(localStorage.getItem("token")) && <Redirect to="/"/> } 
        </Route>

        <Route path="/weather/favorites">
          <header className="App-header">
            <h1>Favorites</h1>
          </header>
          <main className="main">
            {checkTokenValidity(localStorage.getItem("token"))  && <Favorites /> } 
            {!checkTokenValidity(localStorage.getItem("token")) && <Redirect to="/"/> } 
          </main>
          <footer className="footer">
            Page created by Tihana
          </footer>         
        </Route>

        <Route path="/:cityId/:dayId">
          {checkTokenValidity(localStorage.getItem("token")) && <DailyWeather /> } 
          {!checkTokenValidity(localStorage.getItem("token")) && <Redirect to="/"/> } 
        </Route>

      </Switch>
    </div>
  );
}

export default App;