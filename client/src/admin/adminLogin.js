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
                window.location.pathname="/applicantList"
            }
        });
    };
    return (
        <>
            <h1>Admin Login</h1>
            <form onSubmit={adminLogin}>
                <div className="field">
                    <label>Email</label>
                    <input type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>

                <div className="field">
                    <label>Password</label>
                    <input type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <h3 className="alert">{loginErr}</h3>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}