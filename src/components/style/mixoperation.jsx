import { useEffect, useState } from "react";
import "./mixoperation.css";

function Cal1({ onCorrect }) {
  const [questions, setQuestions] = useState(Add());
  const [but, setBut] = useState("");
  const [pop, setPop] = useState(false)
  const [alert, setAlert] = useState("")

  function Add() {
    const la = Math.floor(Math.random() * 20);
    const lb = Math.floor(Math.random() * 20);
    const ops = ["+", "*", "-"];
    const choose = ops[Math.floor(Math.random() * ops.length)];

    let solution;
    switch (choose) {
      case "+":
        solution = la + lb;
        break;
      case "*":
        solution = la * lb;
        break;
      case "-":
        solution = la - lb;
        break;
      default:
        solution = la + lb;
    }

    return { question: `${la} ${choose} ${lb} = ?`, answer: solution };
  }

  function handle(cell) {
    if (cell === "C") {
      setBut("");
    } else if (cell === "Ans") {
      if (parseInt(but) === questions.answer) {
        onCorrect();
        setQuestions(Add());
        setBut("");
      }else if (!parseInt(but)){
        setPop(true)
        setAlert("Enter your answer")
        setTimeout(() => {
          setPop(false)
        }, 3000)
      }
       else {
        setPop(true)
        setAlert("Team A wrong answer")
        setTimeout(() => {
          setPop(false)
        },2000)

      }
    } else {
      setBut((prev) => prev + cell);
    }
  }

  const buttons = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["C", 0, "Ans"],
    [".",  "-"],
  ];

  return (
    <div className="cal1-body">
      {pop && <div className="pop"><h5>{alert}</h5></div>}
      <div className="cal1-question">
        <p>{questions.question}</p>
      </div>
      <div className="cal1-input">
        <input type="text" value={but} readOnly />
      </div>
      <div className="cal1-buttons">
        {buttons.map((row, kr) => (
          <div className="cell" key={kr}>
            {row.map((cell, kc) => (
              <button key={kc} onClick={() => handle(cell)} className={cell}>
                {cell}
              </button>
            ))}
          </div>
        ))}
        
      </div>
    </div>
  );
}

function Cal2({ onCorrect }) {
  const [questions, setQuestions] = useState(Add());
  const [but, setBut] = useState("");
  const [pop, setPop] = useState(false)
  const [alert, setAlert] = useState("")

  function Add() {
    const la = Math.floor(Math.random() * 20);
    const lb = Math.floor(Math.random() * 20);
    const ops = ["+", "*", "-"];
    const choose = ops[Math.floor(Math.random() * ops.length)];

    let solution;
    switch (choose) {
      case "+":
        solution = la + lb;
        break;
      case "*":
        solution = la * lb;
        break;
      case "-":
        solution = la - lb;
        break;
      default:
        solution = la + lb;
    }

    return { question: `${la} ${choose} ${lb} = ?`, answer: solution };
  }

  function handle(cell) {
    if (cell === "C") {
      setBut("");
    } else if (cell === "Ans") {
      if (parseInt(but) === questions.answer) {
        onCorrect();
        setQuestions(Add());
        setBut(0);
      }else if (!parseInt(but)){
        setPop(true)
        setAlert("Enter your answer")
        setTimeout(() => {
          setPop(false)
        }, 3000)
      }
       else {
        setPop(true)
        setAlert("Team B wrong answer")
        setTimeout(() => {
          setPop(false)
        }, 3000)
      }
    } else {
      setBut((prev) => prev + cell);
    }
  }

  const buttons = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["C", 0, "Ans"],
    [".",  "-"],
  ];

  return (
    <div className="cal1-body">
      {pop && <div className="pop"><h5>{alert}</h5></div>}
      <div className="cal1-question">
        <p>{questions.question}</p>
      </div>
      <div className="cal1-input">
        <input type="text" value={but} readOnly />
      </div>
      <div className="cal1-buttons">
        {buttons.map((row, kr) => (
          <div className="cell" key={kr}>
            {row.map((cell, kc) => (
              <button key={kc} onClick={() => handle(cell)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
        
      </div>
    </div>
  );
}

const Main = () => {
  const [teamAProgress, setTeamAProgress] = useState(0);
  const [teamBProgress, setTeamBProgress] = useState(0);
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(true)

  
    useEffect(() => {
        if (teamAProgress === 80){
            setMessage("Team A Wins !! ")
            setVisible(true)
            
        }else if (teamBProgress === 80){
            setMessage("Team B wins !!")
            setVisible(true)
        }else{
            setMessage("Click Start to play")
        }
    }, [teamAProgress, teamBProgress])
  
    function reset(){
        setVisible(false)
        setTeamAProgress(0)
        setTeamBProgress(0)
    }

  return (
    <div className="ground">
      <h1>Mix Operation</h1>
      
        {visible && (
        <div className="win">
            
            <div className="win-content">
                <h1>Congratulations</h1>
                <p>{message}</p>
                <button onClick={() => reset()}>Start</button>
            </div>
        </div>
      )}
      
      <div className="inner-ground">
        <div className="left">
            <div className="percentage"><p>Team A Progress  {teamAProgress}/ 80%</p> </div>
          <Cal1 onCorrect={() => setTeamAProgress((prev) => prev + 10)} />
            
        </div>
        <div className="middle">
          <div className="race-ground">
            <div className="start"></div>
            <div className="a-car" style={{ right: `${teamAProgress}%` }}>
              🏎️<span>A</span>
            </div>
            <div className="b-car" style={{ right: `${teamBProgress}%` }}>
              🏎️<span>B</span>
            </div>
            <div className="end"></div>
          </div>
        </div>
        <div className="right">
            <div className="percentage"><p>Team B Progress {teamBProgress}/80%</p></div>
          <Cal2 onCorrect={() => setTeamBProgress((prev) => prev + 10)} />
        </div>
      </div>
    </div>
  );
};

export default Main;
