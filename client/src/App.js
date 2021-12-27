import './App.css';
import {Redirect ,BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CovidProtection from './pages/covidProtection/covidProtection';
import Register from './pages/register/register';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Status from './pages/status/status';
import Home from './pages/home/home';
import { useEffect, useState } from 'react';

function App() {

  const [loginStat, setLoginStat] = useState(false);

  // let response = null;
  // const checkRegStat = () => {
  //   if(localStorage.getItem("regStat" === null)){
  //     response = 0;
  //   } else{
  //     response = localStorage.getItem("regStat");
  //   }
  //   return(
  //     response
  //   );
  // }

  const logout = () => {
    localStorage.removeItem("loginStat");
    localStorage.removeItem("loginCred");
  }

  useEffect(() => {
    if((localStorage.getItem("loginStat")) === "yes"){
      setLoginStat(true);
   }
   else{
     setLoginStat(false);
   }
   console.log(`App: ${loginStat}`)
  }, [loginStat])
  
  return (
    <Router>
      <Switch>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/" component={() => <Home loginStat={loginStat}/>}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/covidProtection" component={CovidProtection}/>
      <Route path="/register">
          {loginStat ? <Register/> : <Redirect to = "/login"/>}
        </Route>
      {/* <Route exact path="/register" component={Register}/>
      <Route exact path="/status" component={Status}/> 
      {loginStat ? <Redirect to = "/register"/> : <Redirect to = "/login"/>}
      {loginStat ? <Redirect to = "/status"/> : <Redirect to = "/login"/>}        */}
      </Switch>
      <button onClick={logout}>Logout</button>
    </Router>
  );
}

export default App;