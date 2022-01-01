import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

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
        if(info.doseOneDate===null){
            doc.text(2.7, 2.5, `1st Dose Date: Not Assigned`);
        } else{
            doc.text(2.7, 2.5, `1st Dose Date: ${(info.doseOneDate).split("T")[0]}`);;
        }
        if(info.doseTwoDate===null){
            doc.text(2.7, 3, `2nd Dose Date: Not Assigned`);
        } else{
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
            <>
                <h2>You are not logged in</h2>
                <Link to="/login"><button>Go to login</button></Link>
            </>
        )
    } else {
        if (!regStat) {
            return (
                <>
                    <h2>You are not registered</h2>
                    <Link to="/register"><button>Register For Vaccine</button></Link>
                </>
            )
        }
        else {
            return (
                <div>
                    <h2>Name: {info.name}</h2>
                    <h2>NID No: {info.NID}</h2>
                    <h2>Dose One Date: {info.doseOneDate ? (info.doseOneDate).split("T")[0] : ("Not Assigned")}</h2>
                    <h2>Dose One: {info.doseOne ? ("Complete") : ("Pending")}</h2>
                    <h2>Dose Two Date: {info.doseTwoDate ? (info.doseTwoDate).split("T")[0] : ("Not Assigned")}</h2>
                    <h2>Dose Two: {info.doseTwo ? ("Complete") : ("Pending")}</h2>
                    {(info.doseOne && info.doseTwo) ? (<button onClick={downloadCertificate}>Download Certificate</button>) : (<button onClick={downloadCard}>Download Card</button>)}
                </div>
            )
        }
    }
}