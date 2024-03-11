const inputDOM= document.getElementById("userInput")
const countdownDOM= document.getElementById("countdown")
const resultDOM= document.getElementById("result")
const restartDOM= document.getElementById("restart")


countdownDOM.innerHTML="<p id='countdownWait'>Escoja un número para iniciar la cuenta atrás</p>"
resultDOM.innerHTML=`<p id='resultWait'>Esperando Resultado</p>
<p id="numberCompare">⌛</p>`

//Mete los dos posibles eventos que pueden activar el juego
const events= ["focusout", "keypress"]
//Meter una varialbe de control para que al clickar enter y se haga un focusout, no se vuelva a ejecutar otra vez el código por hacer focusout
let control= true

//addEventListener con dos posibles eventos
events.forEach((event)=>{
    inputDOM.addEventListener(event, (keyPressed)=>{
        //Asegura que el valor está entre 1 y 3 incluidos
        if (inputDOM.value >= 1 && inputDOM.value <= 3){
            if(event==="keypress" && keyPressed.key === 'Enter' && control){
                control= false
                //Haz que se deje de estar enfocado en el text input al pulsar enter. Sirve tanto focusout como blur
                inputDOM.blur()
                gameStart()
            }
            else if(event==="focusout" && control){
                control= false
                gameStart()
            }
        }
    })
})


//Función que empieza el juego
function gameStart(){
    //Resetea la variable de control
    //control = true

    //Usa el Math.floor en el input del jugador para evitar valores como 00000001 o 1.8
    const chosenNum = Math.floor(inputDOM.value)

    const randomNum = Math.floor(Math.random() * 3) + 1

    console.log("Tu número escogido es:", chosenNum)
    console.log("El número de la máquina es:", randomNum)

    for (let i=0; i<=5; i++){
        cuentaAtras(i)
    }

    //Se ejecuta cuando el tiempo del contador termina
    setTimeout(()=>{
        if(chosenNum === randomNum){
            resultDOM.innerHTML=`<p id='resultWin'>👑 Enhorabuena, has salvado el mundo 👑</p>
            <p id="numberCompare">Tu número escogido ${chosenNum} es igual que ${randomNum}</p>`
        } else {
            resultDOM.innerHTML=`<p id='resulLose'>💥 ¡Oh, no! el mundo ha explotado 💥</p>
            <p id="numberCompare">Tu número escogido ${chosenNum} es distinto que ${randomNum}</p>`
        }
    }, 5000)
}
function cuentaAtras(i){
    const segundos = i * 1000
    //Contador
    setTimeout(() => {
        countdownDOM.innerHTML=`<p id="countdownP">Cuenta atrás: ${5 - i} segundos<p>`
    }, segundos);
    
}

//Resetear el juego
restartDOM.addEventListener("click", ()=> {
    countdownDOM.innerHTML="<p id='countdownWait'>Escoja un número para iniciar la cuenta atrás</p>"
    resultDOM.innerHTML=`<p id='resultWait'>Esperando Resultado</p>
    <p id="numberCompare">⌛</p>`
    control = true
})