import { useState } from 'react';
import './science.css';
const ScienceQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scoreA , setScoreA] = useState(0);
    const [scoreB , setScoreB] = useState(0);

    const questions = [
        {
            question: "What is Science?",
            options: [
                {a: "The study of living things"},
                {b: "The study of the natural world"},
                {c: "The study of technology"},
                {d: "The study of society"}
            ],
            answer: "b"
        },
        {
            question: "What do plant need to grow?",
            options: [
                {a: "Water"},
                {b: "Sunlight"},
                {c: "Soil"},
                {d: "All of the above"}
            ],
            answer: "d"
        },
        {
            question: "What part of the organs responsible for respiration?",
            options: [
                {a: "Lungs"},
                {b: "Heart"},
                {c: "Liver"},
                {d: "Kidneys"}
            ],
            answer: "a"
        },
    ];

    function handleA(selectedKey){
        if(questions[currentQuestion].answer === selectedKey){
           setScoreA(prev => prev + 1)
        }
        setCurrentQuestion(prev => prev + 1); 
    }
    function handleB(selectedKey){
        if(questions[currentQuestion].answer === selectedKey){
            setScoreB(prev => prev + 1)
        }
        setCurrentQuestion(prev => prev + 1); 
    }

    function Showwinner(){
        if(scoreA > scoreB){
            return(
                <div className="winner">
                    <h2>Final Score: A: {scoreA} - B: {scoreB}</h2>
                    <h1>Team A Wins! 🏆</h1>
                </div>
            )
        }
        else if(scoreB > scoreA){
            return(
                <div className="winner">
                    <h2>Final Score: B: {scoreB} - A: {scoreA}</h2>
                    <h1>Team B Wins! 🏆</h1>
                </div>
            )
        } else {
            return (
                <div className="winner">
                    <h2>Final Score: A: {scoreA} - B: {scoreB}</h2>
                    <h1>It's a Tie!</h1>
                </div>
            )
        }
    }

    return (
        <div className="quiz-container" >
            <h1>⚔️ Science Quiz: Battle Arena</h1>
            <div className="ring">
                <div className={`boxer boxer-a `}>
                    👤 Team A
                </div>
                <div className="scoreboard">
                    <div className="score">A: {scoreA}</div>
                    <div className="score">B: {scoreB}</div>
                </div>
                <div className={`boxer boxer-b `}>
                    Team B 👤
                </div> 
            </div>

            {currentQuestion < questions.length ? (
                <div className="question-box">
                    <div className="questions">
                        <h2>{questions[currentQuestion].question}</h2>
                    </div>
                    <div className="options">
                        <div className="opt opt-a">
                            {questions[currentQuestion].options.map((option, idx) => {
                                const key = Object.keys(option)[0]
                                const value = option[key]
                                return(
                                    <button key={key} onClick={() => handleA(key)}>{value}</button>
                                )
                            })}
                        </div>
                        <div className="opt opt-b">
                            {questions[currentQuestion].options.map((option, idx) => {
                                const key = Object.keys(option)[0]
                                const value = option[key]
                                return(
                                    <button key={key} onClick={() => handleB(key)}>{value}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="game-over" onClick={() => setCurrentQuestion(0)}>
                    <Showwinner/>
                </div>
            )}
            <p className="progress">Question {Math.min(currentQuestion + 1, questions.length)}/{questions.length}</p>
        </div>
    );
};

export default ScienceQuiz;
