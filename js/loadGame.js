'use strict';
/*--------------------------------------------------------------------------------------------
Squares array is equal to all the squares (all have class box)
While the square is empty
item gets a random number between 1 and the boardsize
Add an item based on criteria, position 1 is player 1 and position 2 is player 2
player 1 must be placed on the far left of the game and player 2 on the far right
the rest of things to be placed not on the far right or far left of the board
then check that the criteria(square) is ok and the remaining squares available includes the square
if it does take it out of the remaining squares array and add the correct class to the square
then make empty equal to false to stop the while loop
--------------------------------------------------------------------------------------------*/
function addItem(itemClass, player) {
    let remainingSquares = squares;
    let boxes = $('.box');
    let empty = true;
    while (empty) {
        let item = getRandom(boardSize);
        let criteria;
        if (player === 1) {
            criteria = (item % 10 === 0);
        } else if (player === 2) {
            criteria = (item % 10 === 9);
        } else {
            criteria = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (criteria && remainingSquares.includes(item)) {
            boxes.eq(item).addClass(itemClass);
            let index = remainingSquares.indexOf(item);
            remainingSquares.splice(index, 1);
            empty = false;
        }
    }
}

/*--------------------------------------------------------------------------------------------
loads everything needed to make the game
--------------------------------------------------------------------------------------------*/
function loadGame() {
    game.createBoard();
    for (let i = 0; i < numObstacles; i += 1) {
        game.obstacles('obstacle');
    }

    blackBelt.add();
    redBelt.add();
    blueBelt.add();
    greenBelt.add();
    yellowBelt.add();
    player1.add();
    player2.add();
    combat1.add();
    combat2.add();
    combat3.add();
    combat4.add();
    scroll.add();
    setPlayerData('#player-1', player1);
    setPlayerData('#player-2', player2);
    $('.player1').addClass('active');
}