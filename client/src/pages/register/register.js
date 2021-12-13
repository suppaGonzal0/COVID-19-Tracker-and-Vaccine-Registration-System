import React from 'react'
import Axios from 'axios'
import { useState } from 'react';

export default function Register() {

    const [name, setName] = useState();
    const [NID, setNID] = useState();
    const [birth, setBirth] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [center, setCenter] = useState();
    const [address, setAddress] = useState();

    const register = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/register", {
            name : name,
            NID : NID,
            birth : birth,
            phone : phone,
            gender : gender,
            center : center,
            address : address
        }).then((response) => {
                console.log(response.data);
        });
        e.target.reset();
    };

    return (
        <form onSubmit={register} className='regForm'>
            <h1>Register For Vaccine</h1>
            <div className="field">
                <label>Name</label>
                <input type="text"
                onChange={(e) => {
                    setName(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label>NID</label>
                <input type="text"
                onChange={(e) => {
                    setNID(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label>Date of Birth</label>
                <input type="date" max="2010-01-01"
                onChange={(e) => {
                    setBirth(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label>Phone</label>
                <input type="text"
                onChange={(e) => {
                    setPhone(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label>Gender</label>
                <input type="radio" name="gender" value="Male"
                onChange={(e) => {
                    setGender(e.target.value);
                }}/>Male
                <input type="radio" name="gender" value="Female"
                onChange={(e) => {
                    setGender(e.target.value);
                }}/>Female
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
                }}/>
            </div>

            <input type="submit" value="Register"/>

        </form>
    )
}
