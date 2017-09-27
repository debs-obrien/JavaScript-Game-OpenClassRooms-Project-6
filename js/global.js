'use strict';
const boardSize = 89;
const numObstacles = 10;
let squares = [];

let maxMoves = 3;
let newPos;
let playerActive;
let playerNotActive;
let playerActiveDiv;
let playerNotActiveDiv;
let player1Active = true;
let move = true;
let attacked = false;
let defended = false;
let player1Defended = false;
let player2Defended = false;
let hover = false;
const attackButton = $('.attack');
const defendButton = $('.defend');
const startButton = $('#start');
const playAgainButton = $('#play-again');
const boardGameDiv = $('#board-game');
const gameOverDiv = $('#game-over');
const startGameDiv = $('#start-game');
const playerContainerDiv = $('.player-container');
const body = $('body');
const messageDiv = $('.message');
const playerNameDiv = $('.player-name');
const winnerDiv = $('.winner');
const player1AvatarDiv = $('#player-1-avatar');
const player2AvatarDiv = $('#player-2-avatar');
let computerPlay = false;
const alertMove = 'That square is not a valid move. You can only move a max of 3 spaces vertical or horizontal You cant land on a tree or jump over it. Is it even your go?';
const alertPlayer = 'you cant land on a player or pass over a player';
const alertAttackDefend ='you must attack or defend';
const alertMustMove = 'you must move';
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
'use strict';
/*--------------------------------------------------------------------------------------------
creates a Player class
creates a add method on the prototype Player
--------------------------------------------------------------------------------------------*/
function Player(name, score, itemClass, player, weapon, damage) {
    this.name = name;
    this.score = score;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
    this.damage = damage;
}

Player.prototype.add = function () {
    addItem(this.itemClass, this.player);
};
function Avatar(active, notActive, attack, win, dead) {
    this.active = active;
    this.notActive = notActive;
    this.attack = attack;
    this.win = win;
    this.dead = dead;
}
/*--------------------------------------------------------------------------------------------
Creates the players
--------------------------------------------------------------------------------------------*/
let player1 = new Player('Player 1', 100, 'player1', 1, 'whiteBelt', 10, 'avatar');
let player2 = new Player('Player 2', 100, 'player2', 2, 'whiteBelt', 10, 'avatar');
let player1Avatar = new Avatar('src/player1-active.png', 'src/player1-not-active.png', 'src/player1-attack.png', 'src/player1-win.png', 'src/player1-dead.png');
let player2Avatar = new Avatar('src/player2-active.png', 'src/player2-not-active.png', 'src/player2-attack.png', 'src/player2-win.png', 'src/player2-dead.png');

/*--------------------------------------------------------------------------------------------
Sets the player Data boxes
--------------------------------------------------------------------------------------------*/
function setPlayerData(playerDiv, player, weapon) {
    $(playerDiv + ' .player-name').text(player.name);
    $(playerDiv + ' .score').text(player.score);
    $(playerDiv + ' .belt').removeClass().addClass('belt ' + player.weapon);
    $(playerDiv + ' .weapon-value').text(player.damage);
    player1AvatarDiv.css('backgroundImage', 'url(' + player1Avatar.active + ')');
    player2AvatarDiv.css('backgroundImage', 'url(' + player2Avatar.notActive + ')');
}


/*--------------------------------------------------------------------------------------------
on click check if new between old position and new position there is an obstacle
if there is return - dont let player move
check horizontal move between old position and new position to a max number
and check vertical move
if move is possible:
change old position to equal new position remove the player class and add to the square clicked
change players and get their position
check if pass over a weapon and if so leave old weapon and take new weapon
call fight function to see if they can fight
--------------------------------------------------------------------------------------------*/

function movePlayer() {
    //mouseover the square to see if you want to go there
    let boxClass = $('.box');
    boxClass.hover(
        function () {
            hover = true;
            let sqHovered = $(this).attr('boxID');
            newPos = getXYPosition(sqHovered);

            for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
                let num = getSquareValue(i, oldPos.y);
                let square = $('.box[boxID = ' + num + ']');
                if (square.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (square.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (square.hasClass('player1')) {
                        return;
                    }
                }
            }
            for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
                let num = getSquareValue(oldPos.x, i);
                let square = $('.box[boxID = ' + num + ']');
                if (square.hasClass('obstacle')) {
                    return;
                }
                if (player1Active) {
                    if (square.hasClass('player2')) {
                        return;
                    }
                } else {
                    if (square.hasClass('player1')) {
                        return;
                    }
                }
            }
            if (!attacked) {
                if (newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
                    || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves) {

                    if (player1Active) {
                        $(this).css('backgroundImage', 'url(' + player1Avatar.active + ')');

                    } else {
                        $(this).css('backgroundImage', 'url(' + player2Avatar.active + ')');
                    }
                }

            }
        }, function () {
            hover = false;
            $(this).css('backgroundImage', '');
        }
    );

    function alertMessage(message){
        if(move){
            alert(message);
        }else{
            alert(alertAttackDefend);
        }
    }


    boxClass.on('click', function (e) {
        hover = false;
        let sqClicked = $(this).attr('boxID');
        newPos = getXYPosition(sqClicked);

        for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
            let num = getSquareValue(i, oldPos.y);
            let square = $('.box[boxID = ' + num + ']');
            if (square.hasClass('obstacle')) {
                alertMessage(alertMove);
                return;
            }
            if (player1Active) {
                if (square.hasClass('player2')) {
                    alertMessage(alertPlayer);
                    return;
                }
            } else {
                if (square.hasClass('player1')) {
                    alertMessage(alertPlayer);
                    return;
                }
            }
        }
        for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
            let num = getSquareValue(oldPos.x, i);
            let square = $('.box[boxID = ' + num + ']');
            if (square.hasClass('obstacle')) {
                alertMessage(alertMove);
                return;
            }

            if (player1Active) {
                if (square.hasClass('player2')) {
                    alertMessage(alertPlayer);
                    return;
                }
            } else {
                if (square.hasClass('player1')) {
                    alertMessage(alertPlayer);
                    return;
                }
            }
        }
        if (player1Active) {
            if ($(this).hasClass('player1')){
                alertMessage(alertMustMove);
                return;
            }
        }else{
            if ($(this).hasClass('player2')){
                alertMessage(alertMustMove);
                return;
            }
        }


        if (move) {
            if (newPos.y === oldPos.y && newPos.x <= oldPos.x + maxMoves && newPos.x >= oldPos.x - maxMoves
                || newPos.x === oldPos.x && newPos.y <= oldPos.y + maxMoves && newPos.y >= oldPos.y - maxMoves) {
                for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
                    let num = getSquareValue(i, oldPos.y);
                    checkWeapon(num);
                }
                for (let i = Math.min(oldPos.y, newPos.y); i <= Math.max(oldPos.y, newPos.y); i++) {
                    let num = getSquareValue(oldPos.x, i);
                    checkWeapon(num);
                }
                whoIsActive();
                if (player1Active) {
                    playerPosition = getPosition('.player2');
                    oldPos = getXYPosition(playerPosition);
                    $('.player1').removeClass('player1').removeClass('active');
                    $(this).addClass("player1");
                    $('.player2').addClass('active');
                    fight(newPos, oldPos);
                    player1Active = false;

                }else if(computerPlay){
                    //call function for computers turn.
                    //while squreclaimed is false
                    //if square is not valid return
                    //while square is not claimed claim square
                    //once its claimed change player
                    //to calculate move - if square has weapon take square
                    //else randomly move 3 spaces
                    //set squareclaimed to true
                    player1Active = true;
                }else {
                    playerPosition = getPosition('.player1');
                    oldPos = getXYPosition(playerPosition);
                    $('.player2').removeClass('player2').removeClass('active');
                    $(this).addClass("player2");
                    $('.player1').addClass('active');
                    fight(newPos, oldPos);
                    player1Active = true;
                }
            }
        }
    });
}
/*--------------------------------------------------------------------------------------------
get the player that is active
--------------------------------------------------------------------------------------------*/
function GetPlayerActive(Active, NotActive, ActiveDiv, NotActiveDiv, activeAvatar, notActiveAvatar) {
    playerActive = Active;
    playerNotActive = NotActive;
    playerActiveDiv = ActiveDiv;
    playerNotActiveDiv = NotActiveDiv;
    $(NotActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + activeAvatar + ')');
    $(ActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + notActiveAvatar + ')');
}

/*--------------------------------------------------------------------------------------------
if player 1 is active set values else set player 2 values
--------------------------------------------------------------------------------------------*/
function whoIsActive() {
    if (player1Active) {
        GetPlayerActive(player1, player2, '#player-1', '#player-2', player2Avatar.active, player1Avatar.notActive);
    } else {
        GetPlayerActive(player2, player1, '#player-2', '#player-1', player1Avatar.active, player2Avatar.notActive);
    }
}
'use strict';
/*--------------------------------------------------------------------------------------------
creates a Weapon class
creates a add method on the prototype Weapon
--------------------------------------------------------------------------------------------*/
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;
}

Weapon.prototype.add = function () {
    addItem(this.itemClass);
};

/*--------------------------------------------------------------------------------------------
Creates the weapons and players
--------------------------------------------------------------------------------------------*/

let blackBelt = new Weapon('BlackBelt', 70, 'blackBelt weapon', 'avatarWin');
let redBelt = new Weapon('RedBelt', 60, 'redBelt weapon');
let blueBelt = new Weapon('BlueBelt', 40, 'blueBelt weapon');
let greenBelt = new Weapon('GreenBelt', 30, 'greenBelt weapon');
let yellowBelt = new Weapon('YellowBelt', 20, 'yellowBelt weapon');
let whiteBelt = new Weapon('WhiteBelt', 10, 'whiteBelt weapon');
let combat1 = new Weapon('combat1', 40, 'combat1 weapon');
let combat2 = new Weapon('combat2', 20, 'combat2 weapon');
let combat3 = new Weapon('combat3', 30, 'combat3 weapon');
let combat4 = new Weapon('combat4', 30, 'combat3 weapon');
let scroll = new Weapon('scroll', 20, 'scroll weapon');

/*--------------------------------------------------------------------------------------------
Change players weapon value
--------------------------------------------------------------------------------------------*/
function changeWeaponValue(playerDiv, player, weapon) {
    player.damage = weapon.value;
    $(playerDiv + ' .weapon-value').text(player.damage);
}

function removePlayerWeapon(playerActiveDiv, playerActive) {
    $(playerActiveDiv + ' .belt').removeClass(playerActive.weapon);
}

function addPlayerWeapon(playerActiveDiv, playerActive) {
    $(playerActiveDiv + ' .belt').addClass(playerActive.weapon);
}
/*--------------------------------------------------------------------------------------------
Find out who is active, remove the weapon from the square, remove players old weapon
set players weapon = to weapon from square, add the player weapon and new weapon value
--------------------------------------------------------------------------------------------*/
function changeWeapon(num, belt, weapon) {
    let square = $('.box[boxID = ' + num + ']');
    whoIsActive();
    square.removeClass(belt).addClass(playerActive.weapon);
    removePlayerWeapon(playerActiveDiv, playerActive);
    playerActive.weapon = belt;
    addPlayerWeapon(playerActiveDiv, playerActive);
    changeWeaponValue(playerActiveDiv, playerActive, weapon, weapon.value);
}

function extraPoints(playerActive, playerActiveDiv, item, itemClass, gain, text1, text2) {
    if (gain) {
        playerActive.score = playerActive.score + item.value;
    } else {
        playerActive.score = playerActive.score - item.value;
    }
    $(playerActiveDiv + ' .score').text(playerActive.score);
    $('.' + itemClass).removeClass(itemClass + ' weapon');
    $(playerActiveDiv + ' .message').text(text1 + text2 + ' ' + item.value);
}
/*--------------------------------------------------------------------------------------------
if there is a weapon see which one and call change Weapon function
--------------------------------------------------------------------------------------------*/
function checkWeapon(num) {
    let square = $('.box[boxID = ' + num + ']');
    if (square.hasClass('weapon')) {
        if (square.hasClass('combat1')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat1, 'combat1', true, 'You just beat the penguin and ', 'got');
            return;
        }
        if (square.hasClass('combat2')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat2, 'combat2', false, 'You just lost against the penguin and ', 'lost');
            return;
        }
        if (square.hasClass('combat3')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat3, 'combat3', true, 'You just beat the penguin and ', 'got');
            return;
        }
        if (square.hasClass('combat4')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, combat4, 'combat4', false, 'You just lost against the penguin and ', 'lost');
            return;
        }
        if (square.hasClass('scroll')) {
            whoIsActive();
            extraPoints(playerActive, playerActiveDiv, scroll, 'scroll', true, 'You just did a seminar and ', 'got');
            return;
        }
        if (square.hasClass('whiteBelt')) {
            changeWeapon(num, 'whiteBelt', whiteBelt);
            return;
        }
        if (square.hasClass('yellowBelt')) {
            changeWeapon(num, 'yellowBelt', yellowBelt);
            return;
        }
        if (square.hasClass('greenBelt')) {
            changeWeapon(num, 'greenBelt', greenBelt);
            return;
        }
        if (square.hasClass('blueBelt')) {
            changeWeapon(num, 'blueBelt', blueBelt);
            return;
        }
        if (square.hasClass('redBelt')) {
            changeWeapon(num, 'redBelt', redBelt);
            return;
        }
        if (square.hasClass('blackBelt')) {
            changeWeapon(num, 'blackBelt', blackBelt);
            return;
        }
    }
}
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
'use strict';
/*--------------------------------------------------------------------------------------------
Game is created by a fixed size of 800px and each square being 75px so it will always
have 10 squares across but it can have any amount of squares so the game can be longer if needed
however it should always be in multiples of 10
For this demo we have chosen to have 90 squares but feel free to change the number
The squares array is empty but will be filled later once the board is created with the amount of squares
The remainingSquares array is equal to the squares array and will be modified every time we fill a square
*/

attackButton.hide();
defendButton.hide();
playerContainerDiv.hide();
boardGameDiv.hide();
gameOverDiv.hide();

startButton.on('click', function () {
    playerContainerDiv.show();
    playerContainerDiv.css('display', 'flex');
    boardGameDiv.show();
    startGameDiv.hide();
    body.css("background-color", "white")
});


function getRandom(num) {
    return Math.floor(Math.random() * num);
}


loadGame();
movePlayer();


/*--------------------------------------------------------------------------------------------
get x,y value for each square
get position of the player
convert x y to square value
--------------------------------------------------------------------------------------------*/
function getXYPosition(square) {
    return {
        x: (square) % 10
        ,
        y: Math.floor((square) / 10)
    }
}

const getPosition = (itemClass) => {
    return $(itemClass).attr('boxID');
};
let playerPosition = getPosition('.player1');
let oldPos = getXYPosition(playerPosition);

function getSquareValue(xPos, yPos) {
    return yPos * 10 + xPos;
}

function flipImage(playerClass){
    playerClass.addClass('flip-image')
}

/*--------------------------------------------------------------------------------------------
if player can attack and defend show buttons depending on which player is active
--------------------------------------------------------------------------------------------*/
function CanAttackAndDefend(playerActiveDiv, playerNotActiveDiv) {
    $(playerNotActiveDiv + ' .attack').show();
    $(playerNotActiveDiv + ' .defend').show();
    $(playerActiveDiv + ' .attack').hide();
    $(playerActiveDiv + ' .defend').hide();
}

/*--------------------------------------------------------------------------------------------
print message depending on which player is active
--------------------------------------------------------------------------------------------*/
function message(playerActiveDiv, playerNotActiveDiv, playerActive, playerNotActive) {
    $(playerNotActiveDiv + ' .message').text(playerActive.name + ' just hit you  - ' + playerActive.damage + ' points');
    $(playerActiveDiv + ' .message').text('You just attacked');
}



/*--------------------------------------------------------------------------------------------
if player can only attack show attack button and hide defend depending on which player is active
--------------------------------------------------------------------------------------------*/
function CanOnlyAttack(playerActiveDiv, playerNotActiveDiv) {
    $(playerNotActiveDiv + ' .attack').show();
    $(playerActiveDiv + ' .attack').show();
    $(playerNotActiveDiv + ' .defend').hide();
    $(playerActiveDiv + ' .defend').hide();
}

/*--------------------------------------------------------------------------------------------
once fight begins set move to false so player can't move and can only fight
--------------------------------------------------------------------------------------------*/
function fight(newPos, oldPos) {

    if (newPos.y === oldPos.y && newPos.x <= oldPos.x + 1 && newPos.x >= oldPos.x - 1
        || newPos.x === oldPos.x && newPos.y <= oldPos.y + 1 && newPos.y >= oldPos.y - 1) {
        move = false;
        hover = false;
        $('.box').css('cursor', 'not-allowed');
        $(this).css('backgroundImage', '');

        for (let i = Math.min(oldPos.x, newPos.x); i <= Math.max(oldPos.x, newPos.x); i++) {
            let num = getSquareValue(i, oldPos.y);
            let square = $('.box[boxID = ' + num + ']');
            if (player1Active) {
                if (square.hasClass('player2')) {
                    let player1Square = $('.player1');
                    if($('.player2').attr('boxId') < player1Square.attr('boxId')){
                        flipImage(square);
                        flipImage(player1Square);
                    }
                    attacked = true;
                    attack(newPos, oldPos);
                    return;
                }

            } else {
                if (square.hasClass('player1')) {
                    let player2Square = $('.player2');
                    if($('.player1').attr('boxId') > player2Square.attr('boxId')){
                        flipImage(square);
                        flipImage(player2Square);
                    }
                    attacked = true;
                    attack(newPos, oldPos);
                    return;
                }
            }
        }
    }
}

/*--------------------------------------------------------------------------------------------
Change the score when attacked or defended
--------------------------------------------------------------------------------------------*/
function changeScore(playerNotActiveDiv, playerActive, playerNotActive) {
    if (defended) {
        playerNotActive.score = playerNotActive.score - playerActive.damage * .5;
        defended = false;
    } else {
        playerNotActive.score = playerNotActive.score - playerActive.damage;
    }

    $(playerNotActiveDiv + ' .score').text(playerNotActive.score);
}

/*--------------------------------------------------------------------------------------------
if attacked is true, see who is active and change score, show buttons and call message
then set player to inactive and defended to false incase they defended last time giving them
the possibility to defend again
--------------------------------------------------------------------------------------------*/
function attack() {
    if (attacked) {
        whoIsActive();
        changeScore(playerNotActiveDiv, playerActive, playerNotActive);
        CanAttackAndDefend(playerActiveDiv, playerNotActiveDiv);
        message(playerActiveDiv, playerNotActiveDiv, playerActive, playerNotActive);
        player1AvatarDiv.css('backgroundImage', 'url(' + player1Avatar.attack + ')');
        player2AvatarDiv.css('backgroundImage', 'url(' + player2Avatar.attack + ')');
        if (player1Active) {
            activeClass('.player1', '.player2');
            player1Defended = false;
            player1Active = false;
        } else {
            activeClass('.player2', '.player1');
            player2Defended = false;
            player1Active = true;
        }
        if (playerNotActive.score <= 0) {
            gameOver(playerActiveDiv, playerNotActiveDiv, playerActive, playerNotActive)
        }
    }
}
function activeClass(playerActiveClass, playerNotActiveClass){
    $(playerNotActiveClass).removeClass('active');
    $(playerActiveClass).removeClass('attack');
    $(playerNotActiveClass).addClass('attack');
}

/*--------------------------------------------------------------------------------------------
if player clicks defend see who is active and set values
if both players choose to defend hide defend option and make them attack
--------------------------------------------------------------------------------------------*/
function defend() {
    defended = true;
    whoIsActive();
    if (player1Active) {
        activeClass('.player1', '.player2');
        player1Defended = true;
        player1Active = false;
    } else {
        activeClass('.player2', '.player1');
        player2Defended = true;
        player1Active = true;
    }
    if (player1Defended && player2Defended) {
        CanOnlyAttack(playerActiveDiv, playerNotActiveDiv)
    } else {
        CanAttackAndDefend(playerActiveDiv, playerNotActiveDiv)
    }
    $(playerActiveDiv + ' .message').text('you just defended');
}


/*--------------------------------------------------------------------------------------------
click buttons for attack and defend
--------------------------------------------------------------------------------------------*/
attackButton.on('click', function () {
    attack(newPos, oldPos);
    attacked = true;
});
defendButton.on('click', function () {
    defend(newPos, oldPos);
    defended = true;
});


'use strict';
/*--------------------------------------------------------------------------------------------
When game is over click play again and reset values to create new board and play again
--------------------------------------------------------------------------------------------*/
playAgainButton.on('click', function () {
    squares = [];
    messageDiv.removeClass('win');
    body.css('background-color', '#fff');
    gameOverDiv.hide();
    boardGameDiv.show();
    player1 = new Player('Player 1', 100, 'player1', 1, 'whiteBelt', 10);
    player2 = new Player('Player 2', 100, 'player2', 2, 'whiteBelt', 10);
    player1Active = true;
    move = true;
    attacked = false;
    defended = false;
    player1Defended = false;
    player2Defended = false;
    $(playerNotActiveDiv + ' .message').text('');
    $(playerActiveDiv + ' .message').text('');
    playerNameDiv.css('color', '');
    $('.player-avatar').css('width', '75px').css('height', '75px');
    loadGame();
    playerPosition = getPosition('.player1');
    oldPos = getXYPosition(playerPosition);
    movePlayer();
});

/*--------------------------------------------------------------------------------------------
if game is over set values depending on which player is active
--------------------------------------------------------------------------------------------*/
function gameOver(playerActiveDiv, playerNotActiveDiv, playerActive, playerNotActive,) {
    $(playerNotActiveDiv + ' .score').text('0');
    $(playerActiveDiv + ' .message').text('You Win');
    $(playerNotActiveDiv + ' .message').text('You Lose');
    $(playerNotActiveDiv + ' .attack').hide();
    $(playerNotActiveDiv + ' .defend').hide();
    if (player1Active) {
        $(playerNotActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + player1Avatar.dead + ')');
        $(playerActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + player2Avatar.win + ')').css('width', '150px').css('height', '150px');
    } else {
        $(playerNotActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + player2Avatar.dead + ')');
        $(playerActiveDiv + ' .player-avatar').css('backgroundImage', 'url(' + player1Avatar.win + ')').css('width', '150px').css('height', '150px');
    }
    $('.box').remove();
    boardGameDiv.hide();
    gameOverDiv.show();
    body.css('background-color', '#ff6666');
    playerNameDiv.css('color', '#fff');
    messageDiv.addClass('win');
    winnerDiv.text(playerActive.name + ' you are the WINNER');
}
//# sourceMappingURL=global.js.map
