import React from "react"
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Die from "./Die"

export default function App(){

    function generateNewDice(){
        let diceArray = [ ]
        for (let i = 0; i < 10; i++){
            diceArray.push( 
                { 
                    value : Math.floor(Math.random() * 6) + 1,
                     isHeld: false,
                      id:nanoid()
                }
            )
        }
        
      return diceArray
    }

    const [diceRoll,setDiceRoll] = useState(generateNewDice())


    function reRoll(){
        setDiceRoll(generateNewDice())
    }

    function hold(id){
        console.log(id)
        setDiceRoll(prevDice => prevDice.map(die => {
            return die.id === id? {...die, isHeld : !die.isHeld} : die
        }))
    }

    let roll = diceRoll.map(diceObj =>
        <Die 
        key={diceObj.id}
        id={diceObj.id} 
        value={diceObj.value} 
        isHeld={diceObj.isHeld}
        hold={ () => hold(diceObj.id) } />)


    return(
    <>
     <div className="container">

        <div className="die-grid">
            {roll}
        </div>

        <button onClick={reRoll} className="roll-btn">Roll</button>


     </div>
    </>
    )
}