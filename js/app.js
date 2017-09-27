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
                    attacked = true;
                    attack(newPos, oldPos);
                    return;
                }

            } else {
                if (square.hasClass('player1')) {
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
    $(playerActiveClass).removeClass('active');
    $(playerNotActiveClass).addClass('active');
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

