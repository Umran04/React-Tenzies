import React from "react"
import { useState } from 'react'
import Die from "./Die"

export default function App(){

    function generateNewDice(){
        let diceArray = [ ]
        for (let i = 0; i < 10; i++){
            diceArray.push(Math.floor(Math.random() * 6) + 1)
        }
        
      return diceArray
    }

    const [diceRoll,setDiceRoll] = useState(generateNewDice())

    let roll = diceRoll.map(num => <Die value={num}/>)

    return(
    <>
     <div className="container">

        <div className="die-grid">
            {roll}
        </div>


     </div>
    </>
    )
}