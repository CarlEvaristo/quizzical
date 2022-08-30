import React from "react"

export default function Question({questionData, handleClick, isChecked}) {
    const {chosenAnswer, correctAnswer} = questionData
    let answerElements = questionData.allAnswers.map((answer, index) => {
        
        let btnStyle = (!isChecked && chosenAnswer === index) ? 
            "answerBtnChosen" :
            (!isChecked && chosenAnswer !== index) ? 
                "answerBtn" :
                    (isChecked && chosenAnswer === index && chosenAnswer !== correctAnswer) ?
                        "answerBtnWrong":
                        (isChecked && index === correctAnswer) ?
                            "answerBtnRight": "answerBtnAccent"



        return <button key={index} onClick={() => handleClick(index, questionData.id)} className={btnStyle}>{answer}</button>
    })

    return (
        <div className="questionBox" key={questionData.id}>
            <h2>{questionData.question}</h2>
            {answerElements}
        </div>
    )
}