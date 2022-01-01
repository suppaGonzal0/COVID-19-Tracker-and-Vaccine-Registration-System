import './navbar.css'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';


function Navbar( { logout }) {

    return (
        <nav className="navContainer">
            <div className="logo">
                <h1>VaxTrak Inc.</h1>
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
            <div className="registerArea">
                <Link to="/register" className="registerContainer">
                        <h3>{logout === "yes" ? "Logout" : "Log in / register" } </h3>
                        <FontAwesomeIcon className='arrowIcon' icon={faArrowRight} />            
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
