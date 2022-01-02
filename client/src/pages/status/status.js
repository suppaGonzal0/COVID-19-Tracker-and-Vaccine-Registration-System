import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import "./status.css"

export default function Status({ loginStat }) {

    const [info, setInfo] = useState({});
    const [regStat, setRegStat] = useState();

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

    const downloadCard = () => {

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [8, 7]
        });

        doc.setFont('Roboto', 'bold');


        doc.text(3, 1, `Vaccination Card`);
        doc.text(2.7, 2, `Name: ${info.name}   NID: ${info.NID}`);
        if (info.doseOneDate === null) {
            doc.text(2.7, 2.5, `1st Dose Date: Not Assigned`);
        } else {
            doc.text(2.7, 2.5, `1st Dose Date: ${(info.doseOneDate).split("T")[0]}`);;
        }
        if (info.doseTwoDate === null) {
            doc.text(2.7, 3, `2nd Dose Date: Not Assigned`);
        } else {
            doc.text(2.7, 3, `2nd Dose Date: ${(info.doseTwoDate).split("T")[0]}}`);
        }

        doc.save("Vaccine Card.pdf");

    }

    const downloadCertificate = () => {

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [8, 7]
        });

        doc.setFont('courier', 'bold');

        doc.text(1.7, 1, `Vaccination Completion Certificate`);
        doc.text(1.7, 1.5, `Name: ${info.name}`);
        doc.text(1.7, 2, `NID: ${info.NID}`);

        doc.save("Vaccination Cartificate.pdf");

    }


    if (!loginStat) {
        return (
            <div className='goto'>
                <h2>You are not logged in</h2>
                <Link to="/login"><button className='gotoBtn'>Go to login</button></Link>
            </div>
        )
    } else {
        if (!regStat) {
            return (
                <div className='goto'>
                    <h2>You are not registered</h2>
                    <Link to="/register"><button className='gotoBtn'>Register For Vaccine</button></Link>
                </div>
            )
        }
        else {
            return (
                <div className='statusContainer'>
                    <h2>Vaccine Status Page</h2>
                    <br />
                    <div className="statusBox1">
                        <div className='box1'><h3>Name</h3> <p>{info.name}</p></div>
                        <div className='box1'><h3>NID No</h3> <p>{info.NID}</p></div>
                    </div>
                    <div className="statusRow">
                        <div className='statusBox'><h3>Dose One Date</h3> <p>{info.doseOneDate ? (info.doseOneDate).split("T")[0] : ("Not Assigned")}</p></div>
                        <div className='statusBox'><h3>Dose One</h3> <p>{info.doseOne ? ("Complete") : ("Pending")}</p></div>
                    </div>
                    <div className="statusRow">
                        <div className='statusBox'><h3>Dose Two Date</h3> <p>{info.doseTwoDate ? (info.doseTwoDate).split("T")[0] : ("Not Assigned")}</p></div>
                        <div className='statusBox'><h3>Dose Two</h3><p>{info.doseTwo ? ("Complete") : ("Pending")}</p></div>
                    </div>
                    {(info.doseOne && info.doseTwo) ? (<button className='statusBtn' onClick={downloadCertificate}>Download Certificate</button>) : (<button className='statusBtn' onClick={downloadCard}>Download Card</button>)}
                </div>
            )
        }
    }
}