// 3)  La tombola magica
//     Scrivi un programma che dato:
//      - un array di 10 elementi di numeri casuali interi (compresi tra 1 e 90 senza ripetizioni),
//      - un array di 10 numeri interi a tuo piacimento (compresi tra 1 e 90 senza ripetizioni)
//     Verifichi quanti numeri scelti da te sono presenti nell'array principale e restituisca un risultato del tipo:
//      2 numeri uguali => ambo
//      3 numeri uguali => terna
//      4 numeri uguali => quaterna
//      5 numeri uguali => cinquina
//      tutti i numeri uguali => tombola
//   In caso di vittoria dovrà essere stampato un messaggio "Hai fatto X",
//   in caso di perdita dovrà essere mostrato il messaggio "Mi dispiace, hai perso!".

const computerNumbers = [];
const userNumbers = [];
let numberFound = 0;
let userWannaLeave = false;

while(computerNumbers.length < 10 || userNumbers.length < 10){

    const computerCurrentNumber = Math.floor(Math.random() * 90) + 1;
    if(!(computerNumbers.includes(computerCurrentNumber)) && computerNumbers.length < 10){
        computerNumbers.push(computerCurrentNumber);
    }

    let userCurrentNumber;
    while(isNaN(userCurrentNumber) && userNumbers.length < 10){
        userCurrentNumber = prompt(`Dammi un numero`);
        if(!(userCurrentNumber === null)){
            userCurrentNumber = parseInt(userCurrentNumber);
            if(!(userNumbers.includes(userCurrentNumber)) && userCurrentNumber >= 1 && userCurrentNumber <= 90 && !isNaN(userCurrentNumber)){
                userNumbers.push(userCurrentNumber);
            }
        } else{
            userWannaLeave = true;
            alert(`Hai annullato l'operazione`);
            break;
        }
    }

    if(userWannaLeave){
        break;
    }

}

if(!userWannaLeave){
    for(let i = 0; i < computerNumbers.length; i++){
        userCurrentNumber = userNumbers[i]
        if(computerNumbers.includes(userCurrentNumber)) {
            numberFound++;
        }
    }
    
    let userScore;
    let userWon = false;
    switch(numberFound){
        case 2:
            userScore = `ambo`;
            userWon = true;
            break;
        case 3:
            userScore = `terna`;
            userWon = true;
            break;
        case 4:
            userScore = `quaterna`;
            userWon = true;
            break;
        case 5:
            userScore = `cinquina`;
            userWon = true;
            break;
        case computerNumbers.length:
            userScore = `tombola`;
            userWon = true;
            break;                 
    }
    
    let userMessage = `Mi dispiace, hai perso!`;
    if(userWon){
        userMessage = `Hai fatto ${userScore}!`;
    }
    
    alert(`
    I tuoi numeri: ${userNumbers}
    I numeri del computer: ${computerNumbers}
    ${userMessage}
    `);
}


