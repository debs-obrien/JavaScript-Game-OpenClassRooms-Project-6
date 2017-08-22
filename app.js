'use strict';
const boardSize = 90;
const squares = [];
const remainingSquares = squares;

function getRandom(num) {
    return Math.floor(Math.random() * num);
}

function addItem(itemClass, position) {
    let squares = $('.box');
    let empty = true;
    while (empty) {
        let item = getRandom(boardSize);
        let criteria;
        if(position === 1){
            criteria = (item % 10 === 0);
        }else if(position === 2){
            criteria = (item % 10 === 9);
        }else{
            criteria = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (criteria && remainingSquares.includes(item)) {
            squares.eq(item).addClass(itemClass);
            let index = remainingSquares.indexOf(item);
            remainingSquares.splice(index, 1);
            console.log(item + ' added');
            console.log(itemClass);
            empty = false;
        }
    }
}

function GameBoard(boardSize){
    this.boardSize = boardSize;
}

GameBoard.prototype.createBoard = function(){
      for (let x=1; x <= boardSize; x += 1) {
          $('#board-game').append('<li class="box"></li>');
          let numSquares = $('.box').length;
          squares.push(numSquares);
      }
};

GameBoard.prototype.obstacles = function(itemClass){
    addItem(itemClass)
};

function Weapon(type, value, itemClass){
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;
}

Weapon.prototype.add = function(){
    console.log(this.type, this.value, this.itemClass);
    addItem(this.itemClass);
};

function Player(name, score, itemClass, position){
    this.name = name;
    this.score = score;
    this.itemClass = itemClass;
    this.position = position;
}

Player.prototype.add = function(){
    addItem(this.itemClass, this.position);
};

let game = new GameBoard(boardSize);
game.createBoard();
for(let i=0; i < 10; i+=1){
    game.obstacles('obstacle');
}
let blackBelt = new Weapon('BlackBelt', 20, 'blackBelt');
let redBelt = new Weapon('RedBelt', 20, 'redBelt');
let blueBelt = new Weapon('BlueBelt', 20, 'blueBelt');
let greenBelt = new Weapon('GreenBelt', 20, 'greenBelt');
let yellowBelt = new Weapon('YellowBelt', 20, 'yellowBelt');
//let seminar = new Weapon('Seminar', 20, 'seminar');
let player1 = new Player('Player 1', 100, 'player1', 1);
let player2 = new Player('Player 2', 100, 'player2', 2);
blackBelt.add();
redBelt.add();
blueBelt.add();
greenBelt.add();
yellowBelt.add();
//seminar.add();
player1.add();
player2.add();
console.log(remainingSquares.length);