import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import firebase from '../../firebase';
import "./login.css"

export default function Login({ loginStat, setLoginStat }) {

    const [NID, setNID] = useState();
    const [phone, setPhone] = useState();
    const [loginErr, setLoginErr] = useState();

    const login = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/login", {
            NID, phone
        }).then((response) => {
            if (response.data.message) {
                setLoginErr(response.data.message);
                console.log(response.data.message)
            } else {
                let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                let number = phone;
                firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (ex) {
                    let code = prompt('enter the otp', '');
                    if (code == null) return;
                    ex.confirm(code).then(function (result) {
                        localStorage.setItem("loginStat", "yes");
                        setLoginStat(true);
                        localStorage.setItem("loginCred", JSON.stringify(response.data[0]));
                        console.log(response.data[0]);
                        window.location.pathname = "/register"
                    }).catch((error) => {
                        console.log(error);
                    })
                })
            }
        });
    };

    const tryAgain = () => {
        window.location.reload(false)
    }

    if (!loginStat) {
        return (
            <div className='loginCard'>
                <div className='loginBox'>
                    <h2 >Login</h2>
                    <form onSubmit={login} className='loginForm'>
                        <div className="loginField">
                            <label>NID</label>
                            <input className='loginInp' type="text"
                                onChange={(e) => {
                                    setNID(e.target.value);
                                }} />
                        </div>

                        <div className="loginField">
                            <label>Phone</label>
                            <input className='loginInp' type="text"
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }} />
                        </div>
                        <div className="loginErr">
                            <h3 className="alert" id="recaptcha">{loginErr}</h3>
                            {loginErr ? <button className="errBtn" onClick={tryAgain}>  Try Again?</button> : null}
                        </div>
                        <input type="submit" value="Login" className='loginButton' />
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (
            window.location.pathname = "/"
        )
    }

}