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
let maxMoves = 3;

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
function Player(name, score, itemClass, player, weapon){
    this.name = name;
    this.score = score;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
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
let blackBelt = new Weapon('BlackBelt', 70, 'blackBelt weapon');
let redBelt = new Weapon('RedBelt', 60, 'redBelt weapon');
let blueBelt = new Weapon('BlueBelt', 40, 'blueBelt weapon');
let greenBelt = new Weapon('GreenBelt', 30, 'greenBelt weapon');
let yellowBelt = new Weapon('YellowBelt', 20, 'yellowBelt weapon');
let whiteBelt = new Weapon('WhiteBelt', 10, 'whiteBelt weapon');
let player1 = new Player('Player 1', 10, 'player1', 1, 'whiteBelt');
let player2 = new Player('Player 2', 10, 'player2', 2, 'whiteBelt');
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


//$('#player-1').text('Weapon: ' + player1.weapon +' Score: ' +player1.score);
//$('#player-2').text(player2.weapon);

/*
get x,y value for each square
*/
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
/*
convert x y to square value
*/
function getSquareValue(xPos, yPos) {
    return yPos * 10 + xPos;
}
/*
get starting positions starting with player 1
*/
let playerPosition = getPosition('.player1');
let oldPos = getXYPosition(playerPosition);

/*
on click check if new between old position and new position there is an obstacle
if there is return - dont let player move
check horizontal move between old position and new position to a max number
and check vertical move
change old position to equal new position remove the player class and add to the square clicked
change players and get their position
check if pass over a weapon and if so leave old weapon and take new weapon
*/
$('.box').on('click', function (e) {


    let sqClicked = $(this).attr('boxID');
    let newPos = getXYPosition(sqClicked);

    function cantMove(num){
        let square = $('.box[boxID = ' + num + ']');
        if(square.hasClass('obstacle')){
            return;
        }
        if(player1Active){
            if(square.hasClass('player2')){
                return;
            }
        }else{
            if(square.hasClass('player1')){
                return;
            }
        }
    }
    for(let i=Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++){
        let num = getSquareValue(i, oldPos.y);
        cantMove(num);
    }
    for(let i=Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++){
        let num = getSquareValue(oldPos.x, i);
        cantMove(num);
    }
    function changeScore(playerDiv, player, weapon){
        player.score = weapon.value;
        $(playerDiv + ' .score').text(player.score);
    }

    function changeWeapon(num, belt, weapon){
        let square = $('.box[boxID = ' + num + ']');
        if(player1Active) {
            square.removeClass(belt).addClass(player1.weapon);
            $('#player-1 .belt').removeClass(belt);
            console.log(belt)
            player1.weapon = belt;
            changeScore('#player-1', player1, weapon)
            //$('#player-1 .belt').addClass(player1.weapon);

        }else{
            square.removeClass(belt).addClass(player2.weapon);
            $('#player-2 .belt').removeClass(belt);
            player2.weapon = belt;
            changeScore('#player-2', player2, weapon)
            //$('#player-1 .belt').addClass(player1.weapon);

        }
    }
    function checkWeapon(num){
        let square = $('.box[boxID = ' + num + ']');
        if(square.hasClass('weapon')){
            if(square.hasClass('whiteBelt')){
                changeWeapon(num, 'whiteBelt', whiteBelt);
                return;
            }
            if(square.hasClass('yellowBelt')){
                changeWeapon(num, 'yellowBelt', yellowBelt);
                return;
            }
            if(square.hasClass('greenBelt')){
                changeWeapon(num, 'greenBelt', greenBelt);
                return;
            }
            if(square.hasClass('blueBelt')){
                changeWeapon(num, 'blueBelt', blueBelt);
                return;
            }
            if(square.hasClass('redBelt')){
                changeWeapon(num, 'redBelt', redBelt);
                return;
            }
            if(square.hasClass('blackBelt')){
                changeWeapon(num, 'blackBelt', blackBelt);
                return;
            }
        }
    }

    if(newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
    || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves){
        for(let i=Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++){
            let num = getSquareValue(i, oldPos.y);
            checkWeapon(num);
        }
        for(let i=Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++){
            let num = getSquareValue(oldPos.x, i);
            checkWeapon(num);
        }
        if(player1Active){
            playerPosition = getPosition('.player2');
            oldPos = getXYPosition(playerPosition);
            $('.player1').removeClass('player1');
            $(this).addClass( "player1" );
            player1Active = false;
        }else{
            playerPosition = getPosition('.player1');
            oldPos = getXYPosition(playerPosition);
            $('.player2').removeClass('player2');
            $(this).addClass( "player2" );
            player1Active = true;
        }


    }
});

