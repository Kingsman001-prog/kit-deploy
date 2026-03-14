import { useEffect, useState } from "react"
import "./Add.css"
import {Canvas} from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"


const generateaddition = () => {
    const a = Math.floor(Math.random() * 100)
    const b = Math.floor(Math.random() * 100)
    return {question: `${a} * ${b}`, solution : a*b}
}

function Cubel({position}){
    return(
        <mesh position={position}>
            <boxGeometry />
            <meshStandardMaterial color="orange" ref={material => material && (material.wireframe = false)} />
            <meshStandardMaterial color="orange" />
            
        </mesh>
            
        
    )
}

function Cuber({position}){
    return(
        <mesh position={position}>
            <boxGeometry />
            <meshStandardMaterial color="green" />
        </mesh>
    )
}

function Ground({ position, size}){
    return(
        <mesh position={position}>
            <boxGeometry args={size}/>
            <meshStandardMaterial/>
        </mesh>
    )
}



function Left({onCorrect}){
    const [problem, setProblem] = useState(generateaddition())
    const [input, setInput] = useState("")
    const [alert, setAlert] = useState("")
    const [count, setCount] =useState(-5)


    const button = [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["C", "0", "Ans"]
    ]
    {Cubel (count)}
    function handle(cell){
        if(cell === "C"){
            setInput("")

        }
        else if (cell === "Ans"){
            if (parseInt(input) === problem.solution){
                setProblem(generateaddition())
                setCount(prev => prev - 1)
                onCorrect(count)
                setInput("")
                setAlert("Team A your answer is correct")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }else if(!parseInt(input)){
                setAlert("No answer given")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }
            else {
                setAlert("Team A your answer is wrong")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }
        }else{
            setInput(prev => prev +  "" + cell)
        }
    }


    return(
        <div className="left-container">
            <div className="question">{problem.question}</div>
            <div className="ans">
                <input value={input} readOnly/>
            </div>
            <div className="btns">
                {button.map((row, rk) => (
                    <div className="row" key={rk}>
                        {row.map((cell, ck) => (
                            <button key={ck} className={cell} onClick={() => handle(cell)}>{cell}</button>
                        ))}
                    </div>
                ))}
            </div>
            <div className="bottom"><span className={alert}>{ alert}</span></div>
        </div>
    )
}

function Right({onCorrect}){
    const [problem, setProblem] = useState(generateaddition())
    const [input,setInput] = useState("")
    const [alert, setAlert] = useState("")
    const [count, setCount] = useState(5)


    const button = [
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["C", "0", "Ans"]
    ]
    
    
    function handle(cell){
         if(cell === "C"){
            setInput("")

        }
        else if (cell === "Ans"){
            if (parseInt(input) === problem.solution){
                setProblem(generateaddition())
                setCount(prev => prev + 1)
                onCorrect(count)
                setInput("")
                setAlert("Team B your answer is correct")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }else if(!parseInt(input)){
                setAlert("No answer given")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }
            else {
                setAlert("Team B your answer is wrong")
                setTimeout(() => {
                    setAlert("")
                }, 2000)
            }
        }else{
            setInput(prev => prev +  "" + cell)
        }
    }


    return(
        <div className="left-container">
            <div className="question">{problem.question}</div>
            <div className="ans">
                <input value={input}  readOnly/>
            </div>
            <div className="btns">
                {button.map((row, rk) => (
                    <div className="row" key={rk}>
                        {row.map((cell, ck) => (
                            <button key={ck} className={cell} onClick={() => handle(cell)}>{cell}</button>
                        ))}
                    </div>
                ))}
            </div>
            <div className="bottom"> <span className={alert}>{alert}</span></div>
        </div>
    )
}
 
function Rope(){
    return(
        <mesh>
            <boxGeometry args={[1, 1, 11]}/>
            <meshStandardMaterial color={"black"}/>
        </mesh>
    )
}


function Addition(){
    const [positionl, setPositionl] = useState(-15)
    const [positionr, setPositionr] = useState(15)
    const [messages, setMessages] = useState("")
    const [visible, setVisible] = useState(false)
    const [player, setPlayer] = useState()
    const {transcript, listening, resetTranscript} = useSpeechRecognition();


    useEffect(() => {
        if(positionl === 0){
            setMessages("🎉 Congratulations team A wins!!")
            setPlayer(<Cubel position={[0,0,0]}/>)
            setVisible(true)
            
            
        }
        else if(positionr === 0){
            setMessages("🎉 Congratulations team B wins!!")
            setPlayer(<Cuber position={[0,0,0]}/>)
            setVisible(true)
        }
    }, [positionl, positionr])
    
    const reset = () => {
        setPositionl(-15)
        setPositionr(15)
        setVisible(false)
    }

    return(
        <div className="addition-container">
           {visible && ( 
                <div className="winner">
                    
                    <div className="score">
                        <span>✨</span>
                        <h2>🏆</h2>
                        <h1>{messages}<br/>{player}</h1>
                        <button onClick={reset}>Play again!!!</button>
                    </div>
                </div>)
            }
            <div className="left">
                <Left onCorrect = {() => setPositionl(p => p + 3)}/>
            </div>
            <div className="center">
                <h1>Multiplication <br/> Blocks race</h1>
                <div className="track">
                    <Canvas camera={{position: [0, 19, 0], fov:50}}>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[0, 19, 0]}/>
                        <Cubel position={[positionl,0,4.5]}/>
                        <Rope/>
                        <Cuber position={[positionr,0,4.5]}/>
                        <Ground position={[0, -1, 6]} size={[35, 4,2]}/>
                        
                    </Canvas>
                   
                </div>
            </div>
            <div className="right"> <Right onCorrect = {() => setPositionr(p => p - 3)}/></div>
        </div>
    )
}

export default Addition;