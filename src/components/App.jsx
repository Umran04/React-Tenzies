import React from "react"
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./Die"

export default function App(){
    const [timer,setTimer] = useState(0)
    const [timerRunning,setTimerRunning] = useState(false) //creating states for the timer and to see when to start and stop the timer
    let [gameWon,setGameWon] = useState(false)// put gameWon in a state to again be able to start and stop the timer

    useEffect( () => {

        if(timerRunning === true){
            const intervalId = setInterval( () => {
                setTimer(prev => prev + 1)
            }, 1000)

            return()=>{
                clearInterval(intervalId)
            }
        }
        
    }, [timerRunning]) //creating the timer


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

    const [dice,setDice] = useState( () => generateNewDice() )


    function diceRoll(){
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld === false ? {...die, value: Math.floor(Math.random() * 6) + 1} : die
        }))

        if(gameWon){
            setDice(generateNewDice())
            setGameWon(false)
            setTimer(0) // checks to see if gameWon is now true, if so change the state back to false and set the timer back to 0 when user hits new game button
        }
    }

    function hold(id){

        if(gameWon === false && timerRunning === false){
            setTimer(0)
            setTimerRunning(true) // start the timer once the first dice has been clicked
        }
            
         setDice(prevDice => prevDice.map(die => {
            return die.id === id? {...die, isHeld : !die.isHeld} : die
        }))
    }

    useEffect(()=>{
        if(gameWon === false && (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))){
            setGameWon(true)
            setTimerRunning(false)   //useEffect checks to see if the 2 winning conditions have been met, 
                                     // if so then change the state of gameWon to true and set the timer to false  
        }
    },[dice])

    
    

    let roll = dice.map(diceObj =>
        <Die 
        key={diceObj.id}
        id={diceObj.id} 
        value={diceObj.value} 
        isHeld={diceObj.isHeld}
        hold={ () => hold(diceObj.id) } />)


    return(
    <>
    <div>{timer}</div>
     <div className="container">
        {gameWon && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls</p>

        <div className="die-grid">
            {roll}
        </div>

        <button onClick={diceRoll} className="roll-btn">{gameWon ? 'New Game' : 'Roll'}</button>


     </div>
    </>
    )
}