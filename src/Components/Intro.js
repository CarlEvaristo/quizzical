import React from "react"

function Intro(props) {
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <h3>Let's get Quizzical</h3>
            <button className="mainBtn" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}

export default Intro