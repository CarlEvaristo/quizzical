import React from "react"

function Intro(props) {
    return (
        <div className="intro">
            <h1>Quizzical</h1>
            <h3>Some description if needed</h3>
            <button className="mainBtn" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}

export default Intro