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