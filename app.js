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
let blackBelt = new Weapon('BlackBelt', 20, 'blackBelt weapon');
let redBelt = new Weapon('RedBelt', 20, 'redBelt weapon');
let blueBelt = new Weapon('BlueBelt', 20, 'blueBelt weapon');
let greenBelt = new Weapon('GreenBelt', 20, 'greenBelt weapon');
let yellowBelt = new Weapon('YellowBelt', 20, 'yellowBelt weapon');
let player1 = new Player('Player 1', 100, 'player1', 1, 'whiteBelt');
let player2 = new Player('Player 2', 100, 'player2', 2, 'whiteBelt');
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
*/
$('.box').on('click', function (e) {


    let sqClicked = $(this).attr('boxID');
    let newPos = getXYPosition(sqClicked);
    for(let i=Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++){
        let num = getSquareValue(i, oldPos.y);

        if($('.box[boxID = '+ num +']').hasClass('obstacle')){
            return;
        }
    }
    for(let i=Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++){
        let num = getSquareValue(oldPos.x, i);

        if($('.box[boxID = '+ num +']').hasClass('obstacle')){
            return;
        }
    }

    function changeWeapon(num, player, belt){
        $('.box[boxID = '+ num +']').removeClass(belt).addClass(player.weapon);
        player.weapon = belt;
    }

    if(newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
    || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves){
        for(let i=Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++){
            let num = getSquareValue(i, oldPos.y);
            if($('.box[boxID = '+ num +']').hasClass('weapon')){
                if($('.box[boxID = '+ num +']').hasClass('yellowBelt')){


                    if(player1Active){
                        changeWeapon(num, player1, 'yellowBelt');
                        //$('.box[boxID = '+ num +']').removeClass('yellowBelt').addClass(player1.weapon);
                        //player1.weapon = 'yellowBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('yellowBelt').addClass(player2.weapon);
                        player2.weapon = 'yellowBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('greenBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('greenBelt').addClass(player1.weapon);
                        player1.weapon = 'greenBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('greenBelt').addClass(player2.weapon);
                        player2.weapon = 'greenBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('blueBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('blueBelt').addClass(player1.weapon);
                        player1.weapon = 'blueBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('blueBelt').addClass(player2.weapon);
                        player2.weapon = 'blueBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('redBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('redBelt').addClass(player1.weapon);
                        player1.weapon = 'redBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('redBelt').addClass(player2.weapon);
                        player2.weapon = 'redBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('blackBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('blackBelt').addClass(player1.weapon);
                        player1.weapon = 'blackBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('blackBelt').addClass(player2.weapon);
                        player2.weapon = 'blackBelt';
                    }
                }
            }

        }
        for(let i=Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++){
            let num = getSquareValue(oldPos.x, i);
            if($('.box[boxID = '+ num +']').hasClass('weapon')){
                if($('.box[boxID = '+ num +']').hasClass('yellowBelt')){

                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('yellowBelt').addClass(player1.weapon);
                        player1.weapon = 'yellowBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('yellowBelt').addClass(player2.weapon);
                        player2.weapon = 'yellowBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('greenBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('greenBelt').addClass(player1.weapon);
                        player1.weapon = 'greenBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('greenBelt').addClass(player2.weapon);
                        player2.weapon = 'greenBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('blueBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('blueBelt').addClass(player1.weapon);
                        player1.weapon = 'blueBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('blueBelt').addClass(player2.weapon);
                        player2.weapon = 'blueBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('redBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('redBelt').addClass(player1.weapon);
                        player1.weapon = 'redBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('redBelt').addClass(player2.weapon);
                        player2.weapon = 'redBelt';
                    }
                }
                if($('.box[boxID = '+ num +']').hasClass('blackBelt')){
                    if(player1Active){

                        $('.box[boxID = '+ num +']').removeClass('blackBelt').addClass(player1.weapon);
                        player1.weapon = 'blackBelt';
                    }else{

                        $('.box[boxID = '+ num +']').removeClass('blackBelt').addClass(player2.weapon);
                        player2.weapon = 'blackBelt';
                    }
                }
            }

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

