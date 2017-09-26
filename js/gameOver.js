'use strict';
/*--------------------------------------------------------------------------------------------
When game is over click play again and reset values to create new board and play again
--------------------------------------------------------------------------------------------*/
playAgainButton.on('click', function (e) {
    messageDiv.removeClass('win');
    body.css('background-color', '#fff');
    gameOverDiv.hide();
    playerContainerDiv.show().css('background-color', '#fff');
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