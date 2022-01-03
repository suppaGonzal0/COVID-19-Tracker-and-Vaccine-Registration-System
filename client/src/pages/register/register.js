import React from 'react'
import Axios from 'axios'
import "./register.css"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ loginStat }) {

    const [name, setName] = useState();
    const [NID, setNID] = useState();
    const [birth, setBirth] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [center, setCenter] = useState();
    const [address, setAddress] = useState();

    const [info, setInfo] = useState({});
    const [regStat, setRegStat] = useState();


    const register = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/register", {
            name: name,
            NID: NID,
            birth: birth,
            phone: phone,
            gender: gender,
            center: center,
            address: address
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            }
            else {
                window.location.pathname="/status"
                console.log(response.data);
            }
        });
        e.target.reset();
    };

    if (loginStat) {
        Axios.post("http://localhost:3001/getData", {
            NID: info.NID,
            phone: info.phone
        }).then((response) => {
            if (response.data.message === "Not Registered") {
                console.log(response.data.message);
                setRegStat(false);
            } else {
                localStorage.setItem("loginCred", JSON.stringify(response.data[0]));
                console.log(response.data[0]);
                setRegStat(true);
            }
        });
    }

    useEffect(() => {

        const getInfo = localStorage.getItem("loginCred");
        setInfo(JSON.parse(getInfo));

    }, []);

    if (!loginStat) {
        return (
            <div className='goto'>
                <h2>You are not logged in</h2>
                <Link to="/login"><button className='gotoBtn'>Go to login</button></Link>
            </div>
        )
    } else {
        if (regStat) {
            return (
                <div className='goto'>
                    <h2>You are already registered</h2>
                    <Link to="/status"><button className='gotoBtn'>Check Vaccine Status</button></Link>
                </div>
            )
        }
        else {
            return (
                <div className="loginCard">
                    <div className="regBox">
                        <h1>Register For Vaccine</h1>
                        <form onSubmit={register} className='loginForm'>
                            <div className="loginField">
                                <label>Name</label>
                                <input type="text" className='loginInp'
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                            </div>

                            <div className="loginField">
                                <label>NID</label>
                                <input type="text" className='loginInp'
                                    onChange={(e) => {
                                        setNID(e.target.value);
                                    }} />
                            </div>

                            <div className="loginField">
                                <label>Date of Birth</label>
                                <input type="date" max="2010-01-01" className='loginInp'
                                    onChange={(e) => {
                                        setBirth(e.target.value);
                                    }} />
                            </div>

                            <div className="loginField">
                                <label>Phone</label>
                                <input type="text" className='loginInp'
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }} />
                            </div>

                            <div className="loginField" onChange={(e) => {
                                setGender(e.target.value);
                            }}>
                                <label>Gender</label>
                                <select className='loginInp'>
                                    <option defaultValue hidden>Choose your gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div className="loginField" onChange={(e) => {
                                setCenter(e.target.value);
                            }}>
                                <label>Center</label>
                                <select className='loginInp'>
                                    <option defaultValue hidden>Choose a center</option>
                                    <option>abc</option>
                                    <option>def</option>
                                    <option>ghi</option>
                                    <option>jkl</option>
                                </select>
                            </div>

                            <div className="loginField">
                                <label>Address</label>
                                <input type="text" className='loginInp'
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }} />
                            </div>

                            <input className='loginButton' type="submit" value="Register" />

                        </form>
                    </div>
                </div>
            )
        }
    }

}