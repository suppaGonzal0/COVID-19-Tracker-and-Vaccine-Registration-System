import React from 'react'
import Axios from 'axios'
import "./Admins.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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

    const markDoseOne = (NID) => {
        Axios.put("http://localhost:3001/markDoseOne", { NID: NID }).then(
            (response) => {
                console.log(response)
                window.location.reload(false);
            }
        );
    }

    const markDoseTwo = (NID) => {
        Axios.put("http://localhost:3001/markDoseTwo", { NID: NID }).then(
            (response) => {
                console.log(response)
                window.location.reload(false);
            }
        );
    }

    return (
        <div className='applicantContainer'>
            <h1 className='appListH'>Registered Applicants List</h1>
            <div className='sort'>
                <p>Sort by:</p>
                <button className='sortBtn' onClick={sortAll}>All Applicants</button>
                <button className='sortBtn' onClick={sortNone}>No Dose</button>
                <button className='sortBtn' onClick={sortDoseOne}>Dose One</button>
                <button className='sortBtn' onClick={sortComplete}>Both Dose</button>
            </div>
            <h3>Number of Applicants: {applicants.length}</h3>
            <div className="listHead">
                    <div className="itemHead">NID</div>
                    <div className="itemHead">NAME</div>
                    <div className="itemHead">BIRTHDATE</div>
                    <div className="itemHead">PHONE</div>
                    <div className="itemHead">DOSE ONE DATE</div>
                    <div className="itemHead">DOSE ONE</div>
                    <div className="itemHead">DOSE TWO DATE</div>
                    <div className="itemHead">DOSE TWO</div>
            </div>
            {applicants.filter(applicant => applicant.doseOneDate !== null).map((applicant, idx) => (
                <div key={idx} className="appList">
                    <div className="item">{applicant.NID}</div>
                    <div className="item">{applicant.name}</div>
                    <div className="item">{applicant.birth.split("T")[0]}</div>
                    <div className="item">{applicant.phone}</div>
                    <div className="item">{applicant.doseOne ? ("Complete") : ("Pending")}</div>
                    <div className="item">{applicant.doseOne ? <FontAwesomeIcon className='checkIcon' icon={faCheckCircle} /> : <button className='doneBtn' onClick={() => markDoseOne(applicant.NID)}>Mark As Done</button>}</div>
                    <div className="item">{applicant.doseTwo ? ("Complete") : ("Pending")}</div>
                    <div className="item">{applicant.doseTwo ? <FontAwesomeIcon className='checkIcon' icon={faCheckCircle} /> : <button className='doneBtn' onClick={() => markDoseTwo(applicant.NID)}>Mark As Done</button>}</div>
                    <br />
                </div>
            ))}
        </div>
    )
}