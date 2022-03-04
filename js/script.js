let difficultyElem = document.getElementById("difficulty");
let playBtn = document.getElementById("playBtn");
let text = document.querySelector(".text");
let field = document.querySelector(".field");
let cellNumber = [49,81,100];
let bombs;
let bombsAround;
let cells;
let popup = document.getElementById("popup"); 
let userScore;
function generateGrid(n){
    for(let y = 0; y <= Math.sqrt(cellNumber[difficultyElem.value] - 1); y++){
        for (let x = 0; x <= Math.sqrt(cellNumber[difficultyElem.value] - 1); x++){
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

function showBombs(){
    for (let i = 0; i < cells.length; i++) {
        if(isBomb(cells[i].dataset.x,cells[i].dataset.y)){
            cells[i].classList.add("bomb");
        }
        
    }
}

function generateBombs(){
    bombs = [];
    while(bombs.length < 16){
        let randX = Math.floor(Math.random() * Math.sqrt(cellNumber[difficultyElem.value]));
        let randY =  Math.floor(Math.random() * Math.sqrt(cellNumber[difficultyElem.value]));
        if(!isBomb(randX,randY)) bombs.push([randX, randY]);
    }
    console.log(bombs);
}

function checkAround(){
        console.log("click: " + this.dataset.x + ", " + this.dataset.y);
        if(isBomb(this.dataset.x, this.dataset.y)){
            this.classList.add("bomb");
            gameDisable();
            showBombs()
            popup.innerHTML = "Mi dispiace, Hai perso. </br> Punteggio: " + userScore;
            popup.style.display = "block"; 
        }else{
            this.classList.add("clicked");
            userScore += 1;
            bombsAround = 0;
            for(let y = parseInt(this.dataset.y) - 1; y <= parseInt(this.dataset.y) + 1; y++ ){
                for(let x = parseInt(this.dataset.x) - 1; x <= parseInt(this.dataset.x) + 1; x++){
                    if(isBomb(x,y)) bombsAround++;
                }
            }
            this.innerHTML = bombsAround;
            if(matchEnded()){
                popup.style.display = "block";
                popup.innerHTML = "Complimenti, Hai vinto.";
                gameDisable();
            }
        }
        
}

function matchEnded(){
    let ended = true;
    for(let i = 0; i < cells.length - 1; i++){
        if(!cells[i].classList.contains("clicked") && !isBomb(cells[i].dataset.x ,cells[i].dataset.y)){
            ended  = false;
        }
    }
    console.log("End " + ended);
    return ended;
}

function isBomb(x,y){
    check = false;
    for(let i = 0; i < bombs.length; i++){
        if(bombs[i][0] == x && bombs[i][1] == y) check = true;
    }
    return check;
}

function gameDisable(){
    for(let i = 0; i < cells.length - 1; i++){
        cells[i].removeEventListener("click", checkAround);
    }
}

playBtn.addEventListener("click",function(){
    userScore = 0;
    field.innerHTML = "";
    popup.style.display = "none";
    field.classList.add("field-borders");
    text.style.display = "none";
    field.dataset.diff = difficultyElem.value;

    generateGrid(cellNumber[difficultyElem.value]);
    generateBombs();
});
