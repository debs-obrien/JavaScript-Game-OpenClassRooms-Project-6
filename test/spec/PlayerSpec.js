describe("positions", function() {
  it("checks if the square is equal to correct x y positions", function() {
    expect(getXYPosition(64)).toEqual({x:4, y:6});
    expect(getSquareValue(4, 6)).toEqual(64);
  });

});
describe("Players", function() {

    let player1;
    let player2;
    let player1Avatar;
    let whiteBelt;
    let redBelt;
    let playerNotActive;
    let playerActive;
    let combat3;

    beforeAll(function() {
        player1 = new Player('Player 1', 100, 'player1', 1, 'whiteBelt', 10, 'avatar');
        player2 = new Player('Player 2', 100, 'player2', 2, 'whiteBelt', 10, 'avatar');
        whiteBelt = new Weapon('WhiteBelt', 10, 'whiteBelt weapon');
        redBelt = new Weapon('RedBelt', 60, 'redBelt weapon');
        combat3 = new Weapon('combat3', 30, 'combat3 weapon');
        player1Avatar = new Avatar('src/player1-active.png', 'src/player1-not-active.png', 'src/player1-attack.png', 'src/player1-win.png', 'src/player1-dead.png');
        player1Active = true;
        playerActive = player1;
        playerActive = player2;

    });
describe("checks player values are defined", function() {

    it("players should have values", function() {
        expect(player1.name).toBeDefined();
        expect(player1.score).toBeDefined();
        expect(player1.itemClass).toBeDefined();
        expect(player1.player).toBeDefined();
        expect(player1.weapon).toBeDefined();
        expect(player1.damage).toBeDefined();
    });
    it("avatars should have values", function() {
        expect(player1Avatar.active).toBeDefined();
        expect(player1Avatar.notActive).toBeDefined();
        expect(player1Avatar.attack).toBeDefined();
        expect(player1Avatar.win).toBeDefined();
        expect(player1Avatar.dead).toBeDefined();
    });
    it("weapon should have values", function() {
        expect(whiteBelt.type).toBeDefined();
        expect(whiteBelt.value).toBeDefined();
        expect(whiteBelt.itemClass).toBeDefined();
    });
});
    describe("the player movements", function() {
        let newPos;
        let oldPos;

        it("players can move", function() {
            newPos = {x:6, y:4};
            oldPos = {x:6, y:2};
            fight(newPos, oldPos);
            expect(move).toEqual(true);
        });

        it("players cant move and must fight as they are next to each other on y axis", function() {
            newPos = {x:6, y:4};
            oldPos = {x:7, y:4};
            fight(newPos, oldPos);
            expect(move).toEqual(false);
        });
        it("players cant move and must fight as they are next to each other on x axis", function() {
            newPos = {x:6, y:3};
            oldPos = {x:6, y:4};
            fight(newPos, oldPos);
            expect(move).toEqual(false);
        });
});
    describe("Attack", function() {
        attacked = true;
        beforeAll(function() {
            changeWeaponValue('player1', player1, whiteBelt);
        });
        it("should minus 50% of the other players damage points if player defends", function() {
            defended = true;
            changeScore(playerNotActiveDiv, player1, player2);
            expect(player2.score).toEqual(95);
        });
        it("should minus 100% of the other players damage points if player attacks", function() {
            defended = false;
            changeScore(playerNotActiveDiv, player1, player2);
            expect(player2.score).toEqual(85);

        });
    });
    describe("Extra Points", function() {
        beforeEach(function() {
            playerActive = player1
        });
        it("should add to players score if he beats a penguin", function() {
            extraPoints(playerActive, playerActiveDiv, combat3, 'combat3', true, 'You just beat the penguin and ', 'got');
            expect(player1.score).toEqual(130);
        });

        it("should decrease from the players score if he loses against a penguin", function() {
            extraPoints(playerActive, playerActiveDiv, combat3, 'combat3', false, 'You just beat the penguin and ', 'got');
            expect(player1.score).toEqual(100);
        });
    });
});
