import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Status() {

    const [info, setInfo] = useState([]); 
    const [regStat, setRegStat] = useState(); 

    useEffect(() => {
        
        const getInfo = localStorage.getItem("loginCred");
        setInfo(JSON.parse(getInfo));

        Axios.post("http://localhost:3001/checkReg", {
            NID: info.NID,
            phone: info.phone
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            }else {
                console.log(response)
                setRegStat(response);
                console.log(`status : ${regStat}`);
            }
        });

        // Axios.post("http://localhost:3001/getData", {
        //     NID: info.NID,
        //     phone: info.phone
        // }).then((response) => {
        //     if (response.data.message) {
        //         console.log(response.data.message);
        //     }else {
        //         localStorage.setItem("loginCred", JSON.stringify(response.data[0]));
        //         console.log(response.data[0]);
        //     }
        // });
    }, []);


    return (
        <div>
            {/* <h2>Name: {info.name}</h2>
            <h2>NID No: {info.NID}</h2>
            <h2>Dose One Date: {info.doseOneDate ? (info.doseOneDate) : ("Not Assigned")}</h2>
            <h2>Dose One: {info.doseOne ? ("Complete") : ("Pending")}</h2>
            <h2>Dose Two Date: {info.doseTwoDate ? (info.doseTwoDate) : ("Not Assigned")}</h2>
            <h2>Dose Two: {info.doseTwo ? ("Complete") : ("Pending")}</h2>
            {(info.doseOne && info.doseTwo) ? (<button>Download Certificate</button>) : (<button>Download Card</button>)} */}
        </div>
    )
}
