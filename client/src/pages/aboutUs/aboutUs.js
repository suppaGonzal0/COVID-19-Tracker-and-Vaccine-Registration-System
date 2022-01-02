import React from 'react'
import "./aboutUs.css"

export default function AboutUs() {
    return (
        <div className='aboutContainer'>
            <div className='left'>
                <div className='aboutText'>
                    <h1>About Us</h1>
                    <br />
                    <p>At present, there is only one website led by the government through which the citizens of Bangladesh can apply for the COVID-19 vaccine. Considering the massive population here, this unsurprisingly makes the vaccination process lengthier than it should be for an individual. </p>
                    <br />
                    <p>Currently we are applying various advanced technological features to make sure the whole process is more fast and efficient than other services. If you register with us, we can ensure you that you will have highly trained medical professionals to assist you throughout the whole process. We are also applying various security measures to keep your information safe with us. </p>
                    <br />
                    <p>Being the first private vaccination system, we aim to make the process of vaccination swifter than ever, keep everyone up to date with the latest COVID-19 situation and help Bangladesh reach 100% vaccinated population against the Coronavirus goal rapidly.</p>
                    <br />
                    <p>- Sadat Ahsan Rabby, CEO, VaxTrak Inc</p>
                </div>
            </div>
            <div className='right'><img className='aboutImg' src="about.png" alt="" /></div>
        </div>
    )
}
