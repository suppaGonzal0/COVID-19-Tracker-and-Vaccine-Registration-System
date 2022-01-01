import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'

export default function ApplicantReq() {

    const [applicants, setApplicants] = useState([]);
    const [doseOneDate, setDoseOneDate] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/register").then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                console.log(response.data);
                setApplicants(response.data);
            }
        });  
    }, [])

    const assign = (NID) => {
            Axios.put("http://localhost:3001/assign", { NID: NID, doseOneDate: doseOneDate}).then(
              (response) => {
                console.log(response)
                window.location.reload(false);
              }
            );
    }

    return (
        <div>
           {applicants.filter(applicant => applicant.doseOneDate===null).map( (applicant, idx) => (
                <ul key={idx} className="appList">
                <li className="item">{applicant.NID}</li>
                <li className="item">{applicant.name}</li>
                <li className="item">{applicant.birth.split("T")[0]}</li>
                <li className="item">{applicant.phone}</li>   
                <li><input type="date" onChange={(e) => {setDoseOneDate(e.target.value)}} /></li>
                <button onClick={()=>assign(applicant.NID)}>Assign</button>         
                </ul>
            ))}
        </div>
    )
}