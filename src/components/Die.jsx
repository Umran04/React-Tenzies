export default function Die(props){
    

    
    function generateNewDice(){
        let diceArray = [ ]
        for (let i = 0; i < 10; i++){
            diceArray.push(Math.floor(Math.random() * 6) + 1)
        }
        
      return diceArray
    }

    console.log(generateNewDice())

    

   
    return(
        <>
        
            <button onClick={generateNewDice} className="die">{props.value}</button>
        
        </>
    )
}