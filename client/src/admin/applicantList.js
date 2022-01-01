import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'

export default function ApplicantList() {

    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/registerAll").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }, [])

    const sortAll = () => {
        Axios.get("http://localhost:3001/registerAll").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }

    const sortNone = () => {
        Axios.get("http://localhost:3001/registerNone").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }

    const sortDoseOne = () => {
        Axios.get("http://localhost:3001/registerDoseOne").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }

    const sortComplete = () => {
        Axios.get("http://localhost:3001/registerComplete").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }

    return (
        <div>
            <h1>Registered Applicants List</h1>
           <p>Sort</p>
           <button onClick={sortAll}>All</button>
           <button onClick={sortNone}>No Dose Complete</button>
           <button onClick={sortDoseOne}>Dose One Complete</button>
           <button onClick={sortComplete}>Both Dose Complete Complete</button>
           <p>Applicant Number: {applicants.length}</p>
           {applicants.filter(applicant => applicant.doseOneDate!==null).map( (applicant, idx) => (
                <ul key={idx} className="appList">
                <li className="item">{applicant.NID}</li>
                <li className="item">{applicant.name}</li>
                <li className="item">{applicant.birth.split("T")[0]}</li>
                <li className="item">{applicant.phone}</li>
                <li className="item">{applicant.doseOne ? ("Complete") : ("Pending")}</li>
                <li className="item">{applicant.doseTwo ? ("Complete") : ("Pending")}</li>
                </ul>
            ))}
        </div>
    )
}