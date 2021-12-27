import React from 'react'

export default function Home({loginStat}) {
    return (
        <div>
            <h1>Home</h1>
            <p>{loginStat ? "yes" : "no"}</p>
        </div>
    )
}
