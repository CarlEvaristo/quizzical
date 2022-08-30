import React from "react"
import Intro from "./Intro"
import Question from "./Question"
import Settings from "./Settings"


export default function App() {
    const [questionData, setQuestionData] = React.useState([])
    const [settings, setSettings] = React.useState({
        amount: 0,
        category: "",
        difficulty: ""
    })
    const [isSet, setIsSet] = React.useState(false)
    const [hasStarted, setHasStarted] = React.useState(false)
    const [answeredAll, setAnsweredAll] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(false)


    React.useEffect(() => {
        let answeredQuestions = (questionData.filter(item => {
            return item.hasOwnProperty("chosenAnswer")
        })).length 

        if (questionData.length !== 0) {
            answeredQuestions === questionData.length && setAnsweredAll(true)
        }
    }, [questionData])


    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`)
            .then((response) => response.json())
            .then((data) => {   
                data.results.map((item,id) => {
                    function decodeHtml(html) {         // this function turns html entities into readable text (opentdb api produces send text with html entities)
                        var txt = document.createElement("textarea");
                        txt.innerHTML = html;
                        return txt.textContent;
                    }

                    return (
                        setQuestionData(prevData => {
                            let question = decodeHtml(item.question)  //remove html entities
                            let correctAnswer = decodeHtml(item.correct_answer) //remove html entities
                            let randIndex = Math.floor(Math.random() * 4)  //get random number
                            let allAnswers = item.incorrect_answers.map(answer => decodeHtml(answer)) //remove html entities from array
                            allAnswers.splice(randIndex, 0, correctAnswer)     // insert correct answer at random index

                            return [...prevData, {
                                id,
                                question,
                                correctAnswer: randIndex,
                                allAnswers,
                                // chosenAnswer: null
                            }]
                        })
                    )
                })
            })
    }, [isSet])


    function restart() {
        setQuestionData([])
        setSettings({
            amount: 0,
            category: "",
            difficulty: ""
        })
        setIsSet(false)
        setHasStarted(false)
        setAnsweredAll(false)
        setIsChecked(false)
    }

    function handleStartClick(event) {
        event.preventDefault()
        setHasStarted(true)
    }

    function handleSettingsClick(event) {
        event.preventDefault()
        setIsSet(true)
    }

    function handleSettingsChange(event) {
        event.preventDefault()
        const {name, value} = event.target
        setSettings(prevFormData => {
            return {...prevFormData, [name]: value}
        })
    }

    function handleAnswerBtn(answerId, questionId) {
        setQuestionData(prevData => { return prevData.map(item => {
               return item.id === questionId ?  {...item, chosenAnswer: answerId} : item
            }) 
        })
    }

    function score() {
        return (questionData.filter(item => {
            return item.correctAnswer === item.chosenAnswer
        })).length
    }

    return(
        <main>
            {!hasStarted ? 
                <Intro startGame={handleStartClick}/>: 
            !isSet ?
                <Settings handleClick={handleSettingsClick} handleChange={handleSettingsChange} settings={settings} /> :
                !isChecked ?
                    <>
                        {questionData.map(question => <Question key={question.question} questionData={question} handleClick={handleAnswerBtn} isChecked={isChecked} />)}
                        <div className="scoreBox">
                            {answeredAll && <button className="mainBtn" onClick={() => setIsChecked(true)}>Check answers</button>}
                        </div>
                    </>:
                    <>  
                        {questionData.map(question => <Question key={question.question} questionData={question} handleClick={handleAnswerBtn} isChecked={isChecked} />)}
                        <div className="scoreBox">
                            <h2>You scored {score()}/{questionData.length} correct answers</h2>
                            <button className="mainBtn" onClick={restart}>Play again</button>
                        </div>
                    </>

            }
        </main>
    )
}