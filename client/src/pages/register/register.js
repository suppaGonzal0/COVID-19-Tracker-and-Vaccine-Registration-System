import React from 'react'
import Axios from 'axios'
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
            <>
                <h2>You are not logged in</h2>
                <Link to="/login"><button>Go to login</button></Link>
            </>
        )
    } else {
        if (regStat) {
            return (
                <>
                    <h2>You are already registered</h2>
                    <Link to="/status"><button>Check Vaccine Status</button></Link>
                </>
            )
        }
        else {
            return (
                <form onSubmit={register} className='regForm'>
                    <h1>Register For Vaccine</h1>
                    <div className="field">
                        <label>Name</label>
                        <input type="text"
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                    </div>

                    <div className="field">
                        <label>NID</label>
                        <input type="text"
                            onChange={(e) => {
                                setNID(e.target.value);
                            }} />
                    </div>

                    <div className="field">
                        <label>Date of Birth</label>
                        <input type="date" max="2010-01-01"
                            onChange={(e) => {
                                setBirth(e.target.value);
                            }} />
                    </div>

                    <div className="field">
                        <label>Phone</label>
                        <input type="text"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }} />
                    </div>

                    <div className="field">
                        <label>Gender</label>
                        <input type="radio" name="gender" value="Male"
                            onChange={(e) => {
                                setGender(e.target.value);
                            }} />Male
                        <input type="radio" name="gender" value="Female"
                            onChange={(e) => {
                                setGender(e.target.value);
                            }} />Female
                    </div>

                    <div className="field" onChange={(e) => {
                        setCenter(e.target.value);
                    }}>
                        <label>Center</label>
                        <select>
                            <option defaultValue hidden>Choose a center</option>
                            <option>abc</option>
                            <option>def</option>
                            <option>ghi</option>
                            <option>jkl</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Address</label>
                        <input type="text"
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }} />
                    </div>

                    <input type="submit" value="Register" />

                </form>
    )
        }
    }

}