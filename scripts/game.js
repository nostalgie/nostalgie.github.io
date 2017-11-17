(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./units/asteroid", "./units/enemy"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var asteroid_1 = require("./units/asteroid");
    var enemy_1 = require("./units/enemy");
    var SpaceGame = (function () {
        function SpaceGame() {
            this.game = new Phaser.Game(360, 640, Phaser.AUTO, 'content', {
                preload: this.preload,
                update: this.update,
                create: this.create,
                addEnemy: this.addEnemy,
                checkCollide: this.checkCollide,
                checkCollideBullet: this.checkCollideBullet,
                addAsteroid: this.addAsteroid
            });
        }
        SpaceGame.prototype.addAsteroid = function () {
            if (this.asteroids.countLiving() < 10) {
                var asteroid = new asteroid_1.SpaceUnitAsteroid(this);
                asteroid.place();
            }
        };
        SpaceGame.prototype.addEnemy = function () {
            var enemy = new enemy_1.SpaceUnitEnemy(this);
            enemy.place();
        };
        SpaceGame.prototype.preload = function () {
            this.game.load.image('asteroid', 'images/asteroid.png');
            this.game.load.image('enemy', 'images/enemy.png');
            this.game.load.image('background', 'images/background.png');
            this.game.load.image('ship', 'images/ship.png');
            this.game.load.image('bullet', 'images/bullet.png');
            this.game.load.spritesheet('explosion', 'images/explosion.png', 64, 64);
        };
        SpaceGame.prototype.create = function () {
            this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background').anchor.set(0.5);
            this.life = 100;
            var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
            this.lifeText = this.game.add.text(this.game.world.centerX, 5, this.life + "%", style);
            this.bullets = this.game.add.physicsGroup();
            this.bullets.createMultiple(32, 'bullet', false);
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bulletTime = 0;
            this.explosions = this.game.add.group();
            this.explosions.createMultiple(30, 'explosion');
            this.explosions.forEach(function (explosion) {
                explosion.animations.add('boom');
            }, this);
            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.asteroids = this.game.add.group();
            this.asteroids.enableBody = true;
            this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
            this.rand = new Phaser.RandomDataGenerator();
            this.addEnemy();
            this.addEnemy();
            this.game.time.events.loop(Phaser.Timer.SECOND, this.addAsteroid, this);
            this.player = this.game.add.sprite(150, 550, 'ship');
            this.player.width = 47;
            this.player.height = 74;
            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        };
        SpaceGame.prototype.checkCollideBullet = function (asteroid, bullet) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(asteroid.body.x - 20, asteroid.body.y);
            explosion.play('boom', 30, false, true);
            bullet.kill();
            asteroid.kill();
        };
        SpaceGame.prototype.checkCollide = function (player, asteroid) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(asteroid.body.x - 20, asteroid.body.y);
            explosion.play('boom', 30, false, true);
            asteroid.kill();
            this.life = this.life - this.rand.between(1, 15);
        };
        SpaceGame.prototype.update = function () {
            this.game.physics.arcade.overlap(this.asteroids, this.player, this.checkCollide, null, this);
            this.game.physics.arcade.overlap(this.asteroids, this.bullets, this.checkCollideBullet, null, this);
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.asteroids.forEachDead(function (asteroid) {
                asteroid.destroy(true);
            });
            if (this.life < 0) {
                this.life = 0;
                this.lifeText.setStyle({ font: "30px Arial", fill: "#ff0000", align: "center" });
            }
            this.lifeText.text = this.life + "%";
            var y = this.player.y;
            if (y <= 300) {
                this.player.y = 300;
            }
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -600;
            }
            if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 600;
            }
            if (this.cursors.up.isDown) {
                if (y > 300) {
                    this.player.body.velocity.y = -300;
                }
            }
            if (this.cursors.down.isDown) {
                this.player.body.velocity.y = 300;
            }
            if (this.fireButton.isDown) {
                if (this.game.time.time > this.bulletTime) {
                    var bullet = this.bullets.getFirstExists(false);
                    if (bullet) {
                        bullet.width = 10;
                        bullet.height = 20;
                        bullet.enableBody = true;
                        bullet.reset(this.player.x + 18, this.player.y - 12);
                        bullet.body.velocity.y = -600;
                        this.bulletTime = this.game.time.time + 200;
                    }
                }
            }
        };
        return SpaceGame;
    }());
    exports.SpaceGame = SpaceGame;
    (function run() {
        if (document.readyState === "complete") {
            new SpaceGame();
        }
        else {
            setTimeout(run, 50);
        }
    })();
});
//# sourceMappingURL=game.js.map