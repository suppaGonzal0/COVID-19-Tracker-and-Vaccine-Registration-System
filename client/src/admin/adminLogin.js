import React from 'react'
import Axios from 'axios'
import { useState } from 'react';

export default function AdminLogin() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginErr, setLoginErr] = useState();

    const adminLogin = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/admin", {
            email, password
        }).then((response) => {
            if (response.data.message) {
                setLoginErr(response.data.message);
            } else {
                localStorage.setItem("admin", "verified");
                console.log(response);
                window.location.pathname = "/applicantList"
            }
        });
    };

    const tryAgain = () => {
        window.location.reload(false)
    }

    return (
        <div className='loginCard'>
            <div className='loginBox'>
                <h2 className='loginH'>Admin Login</h2>
                <form className='loginForm' onSubmit={adminLogin}>
                    <div className="loginField">
                        <label>Email</label>
                        <input className='loginInp' type="text"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                    </div>

                    <div className="loginField">
                        <label>Password</label>
                        <input className='loginInp' type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                    </div>
                    <div className="loginErr">
                        <h3 className="alert">{loginErr}</h3>
                        {loginErr ? <button className="errBtn" onClick={tryAgain}>  Try Again?</button> : null}
                    </div>
                    <input type="submit" value="Login" className='loginButton' />
                </form>
            </div>
        </div>
    )
}