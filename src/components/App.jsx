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
        setDiceRoll(prevDice => prevDice.map(die => {
            return die.isHeld === false ? {...die, value: Math.floor(Math.random() * 6) + 1} : die
        }))
    }

    function hold(id){
        
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

        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls</p>

        <div className="die-grid">
            {roll}
        </div>

        <button onClick={reRoll} className="roll-btn">Roll</button>


     </div>
    </>
    )
}