import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import CovidProtection from './pages/covidProtection/covidProtection';
import Register from './pages/register/register';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Status from './pages/status/status';
import Home from './pages/home/home';
import ApplicantList from './admin/applicantList';
import ApplicantReq from './admin/applicantReq';
import AdminLogin from './admin/adminLogin';
import Navbar from './components/navbar/navbar';
import AboutUs from './pages/aboutUs/aboutUs';
import { useEffect, useState } from 'react';

function App() {

  const [loginStat, setLoginStat] = useState(false);

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
      <Navbar loginStat={loginStat} setLoginStat={setLoginStat}/>
      <Switch>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/" component={() => <Home loginStat={loginStat}/>}/>
      <Route exact path="/login" component={() => <Login setLoginStat={setLoginStat} loginStat={loginStat}/>}/>
      <Route exact path="/covidProtection" component={CovidProtection}/>
      <Route exact path="/about" component={AboutUs}/>
      <Route exact path="/status" component={() => <Status loginStat={loginStat}/>}/>
      <Route exact path="/register" component={() => <Register loginStat={loginStat}/>}/>
      <Route exact path="/adminLogin" component={AdminLogin}/>
      <Route exact path="/applicantList" component={ApplicantList}/>
      <Route exact path="/applicantReq" component={ApplicantReq}/>
      </Switch>
      {/* <button onClick={logout}>Logout</button> */}
    </Router>
  );
}

export default App;