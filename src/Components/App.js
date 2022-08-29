import React from "react"
import Intro from "./Intro"
import Questions from "./Questions"
import Settings from "./Settings"


export default function App() {
    const [questionData, setQuestionData] = React.useState([])
    const [settings, setSettings] = React.useState({
        amount: 0,
        category: "",
        difficulty: ""
    })
    const [stage, setStage] = React.useState(null)




    React.useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`)
            .then((response) => response.json())
            .then((data) => {   
                console.log(data.results)      
                data.results.map(item => {
                    return (
                        setQuestionData(prevData => {
                            return [...prevData, {
                                question: item.question,
                                incorrectAnswers: item.incorrect_answers,
                                correctAnswer: item.correct_answer
                            }]
                        })
                    )
                })
            })
    }, [settings])

    function handleStartClick(event) {
        event.preventDefault()
        setStage(0)
    }

    function handleSettingsClick(event) {
        event.preventDefault()
        setStage(1)
    }

    function handleSettingsChange(event) {
        event.preventDefault()
        const {name, value} = event.target

        setSettings(prevFormData => {
            return {...prevFormData, [name]: value}
        })
    }

    function handleAnswerBtn({answer, correctAnswer}){
        console.log(answer, correctAnswer)
    }

    return(
        <main>
            {stage == null ? 
            <>
                <Intro startGame={handleStartClick}/>
            </>: 
            stage === 0 ?
                <Settings handleClick={handleSettingsClick} handleChange={handleSettingsChange} settings={settings} /> :
                <Questions questionData={questionData} handleClick={handleAnswerBtn} />
            }
        </main>
    )
}