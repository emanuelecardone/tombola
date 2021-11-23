// RIEMPIO HEADER
document.querySelector('header').innerHTML = `
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <div class="left_header_img_box w-100 h-100 d-flex justify-content-center align-items-center">
                    <img class="left_header_img w_200p" src="img/png-transparent-bingo-billiards-ball-online-casino-billiards-game-sports-lottery-removebg.png" alt="Scritta 'Bingo'">
                </div>
            </div>
            <div class="col-6">
                <div class="header_middle_box w-100 h-100 d-flex justify-content-center align-items-center">
                    <h1 class="header_title text-light text-uppercase mb-0">bingo</h1>
                </div>
            </div>
            <div class="col-3">
                <div class="right_header_img_box w-100 h-100 d-flex justify-content-center align-items-center">
                    <img class="right_header_img w_200p" src="img/bingo_right-removebg-preview.png" alt="Scritta 'Bingo'">
                </div>
            </div>
        </div>
    </div>
`;

// RIEMPIO MAIN
document.querySelector('main').innerHTML = `
    <div class="game_main_wrapper w-50 h-50 flex-wrap border-end border-top border-5 border-light">
                
    </div>
    <div class="user_numbers_wrapper w-50 h-25 flex-wrap border-end border-top border-5 border-light">

    </div>
    <div class="win_loss_overlay w-100 vh-100 position-fixed justify-content-center align-items-center border-end border-top border-5 border-light">
        <h2 class="win_loss_title text-light text-uppercase mb-0"></h2>
    </div>
    <button type="submit" class="active start_button btn btn-primary border border-3 border-light bg-transparent p-3 text-uppercase fs-2">start game</button>
    <div class="active rules_paragraph flex-column align-items-center text-light text-uppercase">
        <span class="fs-3">Scores</span>
        <ul class="fs-6 ps-0">
            <li>1: Hai perso</li>
            <li>2: Ambo</li>
            <li>3: Terna</li>
            <li>4: Quaterna</li>
            <li>5: Cinquina</li>
            <li>9: Tombola</li>
        </ul>
        <span class="fs-4 text-light text-center">Se ci sono numeri uguali, verranno evidenziati</span>    
    </div>        
`;

// Riempio il contenitore dei numeri del computer e dell'utente
for(i = 0; i < 9; i++){
    document.querySelector('.game_main_wrapper').innerHTML += `
        <div class="game_number_wrapper d-flex justify-content-center align-items-center border-start border-bottom border-5 border-light">

        </div>
    `;
    document.querySelector('.user_numbers_wrapper').innerHTML += `
        <div class="user_number_wrapper d-flex justify-content-center align-items-center border-start border-bottom border-5 border-light">

        </div>
    `;
}

// RIEMPIO FOOTER
document.querySelector('footer').innerHTML = `
    <h2 class="footer_title text-light text-uppercase text-center mb-0">thanks for playing!</h2>
`;

// Variabile tasto start
const startButton = document.querySelector('.start_button');
// Evento click
startButton.addEventListener('click', function(){
    
    // Scomparsa tasto button, rules, comparsa box numeri computer e utente
    startButton.classList.remove('active');
    document.querySelector('.rules_paragraph').classList.remove('active');
    document.querySelector('.game_main_wrapper').classList.add('active');
    document.querySelector('.user_numbers_wrapper').classList.add('active');

    // Devo generare ora dei numeri random 1-90 per computer e utente, i numeri non devono ripetersi
    const computerNumbers = [];
    const userNumbers = [];

    // Il ciclo va avanti finché entrambi gli array non hanno 9 numeri
    while(computerNumbers.length < 9 || userNumbers.length < 9){
        // Aggiunta all'array del computer se i numeri non vengono ripetuti
        const computerCurrentNumber = Math.floor(Math.random() * 90) + 1;
        if(!(computerNumbers.includes(computerCurrentNumber)) && computerNumbers.length < 9){
            computerNumbers.push(computerCurrentNumber);
        }
        // Aggiunta all'array dell'utente se i numeri non vengono ripetuti
        const userCurrentNumber = Math.floor(Math.random() * 90) + 1;
        if(!(userNumbers.includes(userCurrentNumber)) && userNumbers.length < 9){
            userNumbers.push(userCurrentNumber);
        }
    }

    // Ora che ho i numeri, li inserisco nel DOM
    for(let i = 0; i < computerNumbers.length; i++){
        document.getElementsByClassName('game_number_wrapper')[i].innerHTML = `<span class="text-light computer_number computer_number${i}">${computerNumbers[i]}</span>`;
        document.getElementsByClassName('user_number_wrapper')[i].innerHTML = `<span class="text-light user_number${i}">${userNumbers[i]}</span>`;
    }

    // Conto ora quanti numeri il computer e l'utente hanno in comune
    // Più assegno una classe ai numeri corrispondenti in pagina per evidenziarli
    // Per evidenziare i numeri del computer corrispondenti a quelli dell'utente
    // utilizzo .innerText e nel caso li trova uguali a quelli dell'utente, li evidenzia
    let numberFound = 0;
    for(let i = 0; i < computerNumbers.length; i++){
        userCurrentNumber = userNumbers[i]
        if(computerNumbers.includes(userCurrentNumber)) {
            numberFound++;
            document.querySelector(`.user_number${i}`).classList.add('same_number');
        }
        for(let j = 0; j < computerNumbers.length; j++){
           if(document.getElementsByClassName('computer_number')[j].innerText === document.querySelector(`.user_number${i}`).innerText){
            document.getElementsByClassName('computer_number')[j].classList.add('same_number');
           }
        }
    }

    // Definisco se l'utente vince o perde
    // E se vince, definisco il suo punteggio
    // in base a quanti numeri ha in comune col computer
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

    // Definisco un messaggio finale di output
    let userMessage = `Mi dispiace, hai perso!`;
    if(userWon){
        userMessage = `Hai fatto ${userScore}!`;
    }

    // Comparsa overlay per output in pagina (ritardo di 2s)
    setTimeout(function(){document.querySelector('.win_loss_overlay').classList.add('active')}, 2000);

    // Output in pagina 
    document.querySelector('.win_loss_title').innerHTML += userMessage;

});



