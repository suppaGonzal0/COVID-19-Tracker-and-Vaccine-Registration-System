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
        <div className='applicantContainer'>
            <h1 className='appListH'>Applicant Request Page</h1>
            <div className="listHead">
                    <div className="itemHead">NID</div>
                    <div className="itemHead">NAME</div>
                    <div className="itemHead">BIRTHDATE</div>
                    <div className="itemHead">PHONE</div>
                    <div className="itemHead">ASSIGN DATE</div>
                    <div className="itemHead">CONFIRM</div>
            </div>
           {applicants.filter(applicant => applicant.doseOneDate===null).map( (applicant, idx) => (
                <div key={idx} className="appList">
                <div className="item">{applicant.NID}</div>
                <div className="item">{applicant.name}</div>
                <div className="item">{applicant.birth.split("T")[0]}</div>
                <div className="item">{applicant.phone}</div>   
                <div className="item"><input className='dateField' type="date" onChange={(e) => {setDoseOneDate(e.target.value)}} /></div>
                <div className="item"><button className='doneBtn' onClick={()=>assign(applicant.NID)}>Assign</button> </div>        
                </div>
            ))}
        </div>
    )
}