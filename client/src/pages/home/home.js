import React from 'react'
import { useState, useEffect } from 'react'


export default function Home({loginStat}) {

    const [stats, setstats] = useState({})
    const [country, setcountry] = useState()
    const [countryFetch, setcountryFetch] = useState(false)
    const [countrySelected, setcountrySelected] = useState(false)
    const [countryID, setCountryID] = useState()

    useEffect(  () => {
        async function fetchData() {
            const data = await fetch("https://api.covid19api.com/summary")
            const parsedData = await data.json()
            return parsedData;
        }
        
        async function getData(){
            const data = await fetchData()
            console.log(data)
            setstats(data.Global)
            setcountry(data.Countries)
            setcountryFetch(true)
        }  

        getData()
        // console.log(country)

        return  () => {
            setstats({})
            setcountry([])
        }  

        
    }, [])


    return (
        <div className='homeContainer'>
            <h1>Home</h1>
            <div className="stats">
                <h2>Latest Statistics</h2>
                <h3>{`New Cases: ${stats.NewConfirmed}`}</h3>
                <h3>{`Total Deaths: ${stats.TotalDeaths}`}</h3>
                <h3>{`Total Recovered: ${Math.round(stats.NewConfirmed/2)}`}</h3>
                { countryFetch ?
                <select name="countrySelect" onChange={(e) => {setCountryID(e.target.value)
                setcountrySelected(true)}}>
                    <option defaultValue hidden>Choose a country</option>
                    {country.map((cn, idx) => (
                        <option key={idx} value={idx}>{cn.Country}</option>
                    ))}
                </select>

                 : <h2>Nothing to show</h2>

                }
                {countrySelected ? <h3>{`Total Infected: ${country[countryID].TotalConfirmed}`}</h3> : 
                    null
                }   
                
            </div>        

        </div>
    )
}