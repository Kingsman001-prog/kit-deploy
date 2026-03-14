import Calmath from "./components/style/mixoperation.jsx";
import Math from "./components/style/Add.jsx";
import Sub from './components/style/Sub.jsx'
import Multy from "./components/style/Multipl.jsx";
import Divid from './components/style/division.jsx';
import ScienceQuiz from "./components/style/science.jsx";

import "./App.css"
import { useEffect, useState } from "react"
import { FaHome, FaGamepad, FaTrophy, FaUser } from "react-icons/fa";
import { MdSettings } from "react-icons/md";


export default function App(){
  const [page, setPage] = useState("Home")
  const [show, setShow] = useState(true)
  const links = [
    ["Addition", "Subtraction", "Multiplication", "Division", "Mix Operation"],
    ['Science', 'English', 'Coding', 'S.E.S', 'More']
    
  ]
  

  function renderPage(){
    switch(page){
      case 'Mix Operation':
        return <Calmath/>;
      case 'Addition':
        return <Math/>
      case 'Subtraction':
        return <Sub/>;
      case 'Multiplication':
        return <Multy/>
      case "Division": 
        return <Divid/>
      case "Science": 
        return <ScienceQuiz/>
      
    }
  }
  return(
    <div className="main">
      <div className="top">
          <nav>
            <h2 style={{color: 'white'}}>Kids In Technology</h2>
            <ul>
              <li><a href=""><FaHome style={{color: 'skyblue'}}/></a></li>
              <li><a href=""><FaGamepad style={{color: 'green'}}/></a></li>
              <li><a href=""><FaTrophy style={{color:'gold'}}/></a></li>
              <li><a href=""><MdSettings style={{color: 'gray'}}/></a></li>
            </ul>
            <button style={{background: 'transparent', border: 'none', color: 'white',
              fontSize: '2rem'
            }}><FaUser/></button>
          </nav>
      </div>
      <div className="top-para">
        <p>Welcome to Kids In Technology! <br/>Learn and have fun with technology!</p>
      </div>
      <div className="menu">
        {links.map((row, rk) => (
          <div className="row" key={rk}>
            {row.map((cell, ck) => (
              <li key={ck} className={cell}><a href="" onClick={(e) =>{
                e.preventDefault()
                 setPage(cell)
              }} className={cell}>{cell}</a></li>
            ))}
          </div>
        ))}
      </div>
      {show && <div className="pages">{renderPage()}</div>}
      
    </div>
  )
}