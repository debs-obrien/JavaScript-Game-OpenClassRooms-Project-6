'use strict';
/*
Game is created by a fixed size of 800px and each square being 75px so it will always
have 10 squares across but it can have any amount of squares so the game can be longer if needed
however it should always be in multiples of 10
For this demo we have chosen to have 90 squares but feel free to change the number
The squares array is empty but will be filled later once the board is created with the amount of squares
The remainingSquares array is equal to the squares array and will be modified every time we fill a square
*/
const boardSize = 89;
const numObstacles = 10;
const squares = [];
const remainingSquares = squares;
let player1Active = true;

function getRandom(num) {
    return Math.floor(Math.random() * num);
}
/*
Squares array is equal to all the squares (all have class box)
While the square is empty
item gets a random number between 1 and the boardsize
Add an item based on criteria, position 1 is player 1 and position 2 is player 2
player 1 must be placed on the far left of the game and player 2 on the far right
the rest of things to be placed not on the far right or far left of the board
then check that the criteria(square) is ok and the remaining squares available includes the square
if it does take it out of the remaining squares array and add the correct class to the square
then make empty equal to false to stop the while loop
*/
function addItem(itemClass, player) {
    let squares = $('.box');
    let empty = true;
    while (empty) {
        let item = getRandom(boardSize);
        let criteria;
        if(player === 1){
            criteria = (item % 10 === 0);
        }else if(player === 2){
            criteria = (item % 10 === 9);
        }else{
            criteria = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (criteria && remainingSquares.includes(item)) {
            squares.eq(item).addClass(itemClass);
            let index = remainingSquares.indexOf(item);
            remainingSquares.splice(index, 1);
            //console.log(item + ' added');
            //console.log(itemClass);

            empty = false;
        }
    }
}


/*
creates a GameBoard class
*/
function GameBoard(boardSize){
    this.boardSize = boardSize;
}
/*
Creates a createBoard method on the Gameboard prototype
Adds the html and css as needed by the size of the board defined above
The squares are then pushed to an array so we can later use for calculating positions.
*/
GameBoard.prototype.createBoard = function(){
      for (let i=0; i <= boardSize; i += 1) {
          $('#board-game').append('<li class="box" boxID="' + i +'"></li>');
          let numSquares = $('.box').length;
          squares.push(numSquares);
      }
};
/*
creates an obstacle method on the prototype GameBoard
*/

GameBoard.prototype.obstacles = function(itemClass){
    addItem(itemClass)
};
/*
creates a Weapon class
*/
function Weapon(type, value, itemClass){
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;
}
/*
creates a add method on the prototype Weapon
*/
Weapon.prototype.add = function(){
    //console.log(this.type, this.value, this.itemClass);
    addItem(this.itemClass);
};
/*
creates a Player class
*/
function Player(name, score, itemClass, player){
    this.name = name;
    this.score = score;
    this.itemClass = itemClass;
    this.player = player;
}
/*
creates a add method on the prototype Player
*/
Player.prototype.add = function(){
    addItem(this.itemClass, this.player);
};
/*
Creates the board game
*/
let game = new GameBoard(boardSize);
game.createBoard();
/*
This adds the obstacles the number of times defined at the start
*/
for(let i=0; i < numObstacles; i+=1){
    game.obstacles('obstacle');
}
/*
Creates the weapons and players
*/
let blackBelt = new Weapon('BlackBelt', 20, 'blackBelt');
let redBelt = new Weapon('RedBelt', 20, 'redBelt');
let blueBelt = new Weapon('BlueBelt', 20, 'blueBelt');
let greenBelt = new Weapon('GreenBelt', 20, 'greenBelt');
let yellowBelt = new Weapon('YellowBelt', 20, 'yellowBelt');
let player1 = new Player('Player 1', 100, 'player1', 1);
let player2 = new Player('Player 2', 100, 'player2', 2);
/*
calls the add method to add the weapons then the players last
*/
blackBelt.add();
redBelt.add();
blueBelt.add();
greenBelt.add();
yellowBelt.add();
player1.add();
player2.add();
//console.log(remainingSquares.length);



function getXYPosition(square){
    return{
        x: (square) % 10
        ,
        y: Math.floor((square)/10)
    }
}

/*
get position of the player
*/
const getPosition = (itemClass) =>{
    let currentPosition = $(itemClass).attr('boxID');
    return currentPosition;
};

function orthoToCard(ortho) {
    return ortho.y * 10 + ortho.x + 1;
}


let playerPosition = getPosition('.player1');
let oldPos = getXYPosition(playerPosition);

$('.box').on('click', function (e) {
    let sqClicked = $(this).attr('boxID');
    let newPos = getXYPosition(sqClicked);

    for(let i=Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++){
        let num = oldPos.y * 10 + i;
        if($('.box[boxID = '+ num +']').hasClass('obstacle')){
            return;
        }
    }
    for(let i=Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++){
        let num = i * 10 + oldPos.x;
        if($('.box[boxID = '+ num +']').hasClass('obstacle')){
            return;
        }
    }
    if(newPos.y === oldPos.y && newPos.x <= oldPos.x + 3 && newPos.x >= oldPos.x - 3){
        oldPos = newPos;
        $('.player1').removeClass('player1');
        $(this).addClass( "player1" );
    }else if(newPos.x === oldPos.x && newPos.y <= oldPos.y + 3 && newPos.y >= oldPos.y - 3){
        oldPos = newPos;
        $('.player1').removeClass('player1');
        $(this).addClass( "player1" );
    }
    

});
const isEmpty= ()=>{

};
//mouseover the square to see if you want to go there
/*$('.box').on('mouseover', function (e) {
    if (isEmpty(e.target)) {
        if (player1Active) {
            e.target.style.backgroundColor = 'red';
            //e.target.style.backgroundImage = "url(player1_bw.png)";
        } else {
            e.target.style.backgroundImage = "url(img/x.svg)";
        }
    }
});
//remove mouseover when not on the square
$('.box').off('mouseover', function (e) {
    e.target.style.backgroundImage = "";
});*/

//current position = 31 or {x: 0, y: 3}
//get x coord then get y coord with splice for example

//check if valid
// if newPosition = x+1 or newPosition = x+2 or newPosition=x+3
// or newPosition =x-1 or newPosition=x-2 or newPosition=x-3
//      if newPosition > 0  && newPosition < 9
//         if square has obstacle return
                //return
    //  return valid

//check if valid y same as above
//if valid player can move



/*
get current position of player and transform it to xy coords
*/


//get xy position
//valid move is x +3 or y +3
/*function validMove(){
    let move = false;
    let valid = false;
    let newPosition;
    //while (!move){
        //if havent moved check if valid
    let x = xyPosition;
        if(x <= x +3 || x >= x-3){
            console.log('ok');
            valid = true;
        }

{
            newPosition = currentPosition;
            valid = true;
        }

    //}
    //console.log(newPosition)
    //valid moves is x +3 or x -3
    //valid moves is y +3 or y -3
    //valid moves if obstacle return
    //valid moves if x = 9
}
validMove();

function sameLineHor(ortho1, ortho2) {
    return ortho1.y === ortho2.y;
}*/
//console.log(sameLineHor(4,5));

//if square is valid move

//square is valid if
//square is empty
//if square has obstacle end turn

//end turn