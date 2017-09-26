'use strict';
/*--------------------------------------------------------------------------------------------
Creates a createBoard method on the Gameboard prototype
Adds the html and css as needed by the size of the board defined above
The squares are then pushed to an array so we can later use for calculating positions.
creates an obstacle method on the prototype GameBoard
--------------------------------------------------------------------------------------------*/
function GameBoard(boardSize) {
    this.boardSize = boardSize;
}

GameBoard.prototype.createBoard = function () {
    for (let i = 0; i <= boardSize; i += 1) {
        boardGameDiv.append('<li class="box" boxID="' + i + '"></li>');
        let numSquares = $('.box').length;
        squares.push(numSquares);
    }
};
GameBoard.prototype.obstacles = function (itemClass) {
    addItem(itemClass)
};

/*--------------------------------------------------------------------------------------------
Creates the game
--------------------------------------------------------------------------------------------*/
let game = new GameBoard(boardSize);