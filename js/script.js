let difficultyElem = document.getElementById("difficulty");
let playBtn = document.getElementById("playBtn");
let text = document.querySelector(".text");
let field = document.querySelector(".field");
let cellNumber = [100,81,49];
let bombs;
let bombsAround;
let cells;
let popup = document.getElementById("popup"); 
let userScore;

// Genero la griglia, assegno una x e una y ad ogni casella tramite gli 
// attr data-x e data-y, le salvo all'interno di cells.
function generateGrid(n){
    for(let y = 0; y < Math.sqrt(cellNumber[difficultyElem.value]); y++){
        for (let x = 0; x < Math.sqrt(cellNumber[difficultyElem.value]); x++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", checkAround);
            cell.dataset.x = x;
            cell.dataset.y = y;
            field.append(cell);
        }
    }
    cells = document.getElementsByClassName("cell");
}

// Mostro le bombe aggiungendo la classe .bomb a tutte
// le caselle che hanno coordinate uguali contenute nell'array bombs.
function showBombs(){
    for (let i = 0; i < cells.length; i++) {
        if(isBomb(cells[i].dataset.x,cells[i].dataset.y)){
            cells[i].classList.add("bomb");
        }
    }
}

// Popolo l'array bombs con le coordinate generate randomicamente 
// (un numero compreso tra 0 e la radice del numero di celle totali)
function generateBombs(){
    bombs = [];
    while(bombs.length < 16){
        let randX = Math.floor(Math.random() * Math.sqrt(cellNumber[difficultyElem.value]));
        let randY =  Math.floor(Math.random() * Math.sqrt(cellNumber[difficultyElem.value]));
        if(!isBomb(randX,randY)) bombs.push([randX, randY]);
    }
    console.log(bombs);
}

// Controllo se la casella cliccata è una bomba
function checkAround(){
        console.log("click: " + this.dataset.x + ", " + this.dataset.y);
        if(isBomb(this.dataset.x, this.dataset.y)){
            // Se è una bomba aggiungo la classe, disabilito i click, mostro le bombe e il popup.
            this.classList.add("bomb");
            gameDisable();
            showBombs();
            popup.innerHTML = "Mi dispiace, Hai perso. </br> Punteggio: " + userScore;
            popup.style.display = "block"; 
        }else{
            // Se non è una bomba aggiungo la classe clicked, aggiungo 1 al punteggio (solo se non è già stata clickata)
            // corrente, conto le bombe che si trovano nelle celle circostanti e controllo 
            // che il match non sia ancora terminato.
            if(!this.classList.contains("clicked")){
                userScore += 1;
            }
            this.classList.add("clicked");
            bombsAround = 0;
            for(let y = parseInt(this.dataset.y) - 1; y <= parseInt(this.dataset.y) + 1; y++ ){
                for(let x = parseInt(this.dataset.x) - 1; x <= parseInt(this.dataset.x) + 1; x++){
                    if(isBomb(x,y)) bombsAround++;
                }
            }
            this.innerHTML = bombsAround;
            if(matchEnded()){
                //Se il match è terminato mostro il popup e disabilito i click.
                popup.style.display = "block";
                popup.innerHTML = "Complimenti, Hai vinto.";
                gameDisable();
            }
        }
        
}

//Controllo se la partita è terminata, controllo se ogni casella è stata clickata o è una bomba.
function matchEnded(){
    let ended = true;
    for(let i = 0; i < cells.length - 1; i++){
        if(!cells[i].classList.contains("clicked") && !isBomb(cells[i].dataset.x ,cells[i].dataset.y)){
            ended  = false;
        }
    }
    return ended;
}

//Verifico se le coordinate fornite corrispondono a quelle di una bomba.
function isBomb(x,y){
    check = false;
    for(let i = 0; i < bombs.length; i++){
        if(bombs[i][0] == x && bombs[i][1] == y) check = true;
    }
    return check;
}

//Disabilito i click rimuovendo gli event listener dalle caselle.
function gameDisable(){
    for(let i = 0; i < cells.length - 1; i++){
        cells[i].removeEventListener("click", checkAround);
    }
}

//Main
playBtn.addEventListener("click",function(){
    // Resetto punteggio, campo e il Popup
    userScore = 0;
    field.innerHTML = "";
    popup.style.display = "none";
    // Aggiungo i bordi al campo
    field.classList.add("field-borders");
    // Nascondo il messaggio iniziale
    text.style.display = "none";
    // Aggiungo al campo (.field) l'attr data-diff
    field.dataset.diff = difficultyElem.value;
    // Genero la griglia e le bombe
    generateGrid(cellNumber[difficultyElem.value]);
    generateBombs();
});