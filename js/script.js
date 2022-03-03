let difficultyElem = document.getElementById("difficulty");
let playBtn = document.getElementById("playBtn");
let text = document.querySelector(".text");
let field = document.querySelector(".field");
let cellNumber = [49,81,100];
let bombs;

function generateBombs(){
    bombs = [];
    while(bombs.length < 16){
        let randN = Math.floor(Math.random() * cellNumber[difficultyElem.value] + 1);
        if(!bombs.includes(randN)) bombs.push(randN);
    }
    console.log(bombs);
}

function clickCell(){
    this.classList.add("clicked");
    if(this.dataset.bomb){
        console.log("Game Over");
        let bombCells = document.querySelectorAll('[data-bomb="true"]');
        for(let i = 0; i < bombs.length - 1; i++){
            bombCells[i].classList.add("bomb");
        }
        let cells = document.querySelectorAll(".cell");
        for(let i = 0; i < cells.length - 1; i++){
            cells[i].removeEventListener("click", clickCell);
        }
    }
}

playBtn.addEventListener("click",function(){
    field.innerHTML = "";
    field.classList.add("field-borders");
    text.style.display = "none";
    field.dataset.diff = difficultyElem.value;
    generateBombs();
    
    for(let i = 0; i < cellNumber[difficultyElem.value]; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", clickCell);
        if(bombs.includes(i)) cell.dataset.bomb = true;
        field.append(cell);
    }
});