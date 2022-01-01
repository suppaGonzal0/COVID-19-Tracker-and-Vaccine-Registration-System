import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import firebase from '../../firebase';

export default function Login() {

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
                        localStorage.setItem("loginCred", JSON.stringify(response.data[0]));
                        console.log(response.data[0]);
                        window.location.pathname = "/status"
                    }).catch((error) => {
                        console.log(error);
                    })
                })
            }
        });


    };
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={login}>
                <div className="field">
                    <label>NID</label>
                    <input type="text"
                        onChange={(e) => {
                            setNID(e.target.value);
                        }} />
                </div>

                <div className="field">
                    <label>Phone</label>
                    <input type="text"
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                </div>
                <h3 className="alert" id="recaptcha">{loginErr}</h3>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}