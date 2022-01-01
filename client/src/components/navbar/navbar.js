import './navbar.css'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import Logout from '../logOut/Logout';


function Navbar( { loginStat, setLoginStat }) {

    const [loginText, setloginText] = useState("Log in/register")

    return (
        <nav className="navContainer">
            <div className="logo">
                <h2>VaxTrak Inc.</h2>
            </div>
            <div className="navLinksContainer">
                <div className="navLinks">
                    <Link to="/" className='navLink'><h3>Home</h3></Link>
                    <Link to="/about" className='navLink'><h3>About us</h3></Link>
                    <Link to="/covidProtection" className='navLink'><h3>Protection from COVID-19</h3></Link>
                    <Link to="/status" className='navLink'><h3>Vaccine Status</h3></Link>
                    <Link to="/contact" className='navLink'><h3>Contact</h3></Link>
                </div>              
            </div>
            <div className="loginArea">
                { loginStat ? <Logout setLoginStat={setLoginStat}/> : 
                    <Link to="/login" className="loginContainer">
                    <h3> Log in / register </h3>
                    <FontAwesomeIcon className='arrowIcon' icon={faArrowRight} />            
                    </Link>
                }
                
            </div>
        </nav>
    )
}

export default Navbar
