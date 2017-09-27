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