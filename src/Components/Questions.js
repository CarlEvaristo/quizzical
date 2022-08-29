import React from "react"

export default function Questions({questionData, handleClick}) {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.textContent;
    }

    let questionElements = questionData.map((item, index) => { 
        let randIndex = Math.floor(Math.random() * 4) + 1
        let question = decodeHtml(item.question)
        let correctAnswer = decodeHtml(item.correctAnswer)
        item.incorrectAnswers.splice(randIndex, 0, correctAnswer)
        let answerElements = item.incorrectAnswers.map((answer, index) => {
            answer = decodeHtml(answer)
            return <button key={index} onClick={() => handleClick({answer, correctAnswer})} className="answerBtn">{answer}</button>
        })
        return (
            <div className="questionBox" key={item.question}>
                <h2>{question}</h2>
                {answerElements}
            </div>
        )
    })

    return (
        <>
            {questionElements}
        </>   
    )
}