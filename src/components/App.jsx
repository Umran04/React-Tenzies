import React from "react"
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./Die"

export default function App(){
    const [timer,setTimer] = useState(0)
    const [timerRunning,setTimerRunning] = useState(false)
    let [gameWon,setGameWon] = useState(false)

    useEffect( () => {

        if(timerRunning === true){
            const intervalId = setInterval( () => {
                setTimer(prev => prev + 1)
            }, 1000)

            return()=>{
                clearInterval(intervalId)
            }
        }
        
    }, [timerRunning])


    


    

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

        // if (timerRunning === false){
        //     setTimer(0)
        //     setTimerRunning(true)
        // }

        if(gameWon){
            setDice(generateNewDice())
            setGameWon(false)
            setTimer(0)
        }
    }

    function hold(id){

        if(gameWon === false && timerRunning === false){
            setTimer(0)
            setTimerRunning(true)
        }
            
         setDice(prevDice => prevDice.map(die => {
            return die.id === id? {...die, isHeld : !die.isHeld} : die
        }))
    }

    useEffect(()=>{
        if(gameWon === false && (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))){
            setGameWon(true)
            setTimerRunning(false)
            
    
    
    
            console.log('Game Won')
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