import { SpaceGame } from '../game';

export class SpaceUnitEnemy {
    space: SpaceGame;

    constructor(space: SpaceGame) {
        this.space = space;
    }

    place() {
        const enemy = this.space.enemies.create(this.space.rand.between(0, 360), this.space.rand.between(0, 100), 'enemy');
        enemy.width = 50;
        enemy.height = 50;

        enemy.body.gravity.x = 0;
        enemy.body.gravity.y = 0;

        enemy.body.velocity.x = this.space.rand.between(-50, 50);
        this.space.game.time.events.add(this.space.rand.between(1000, 3000), this.changeEnemyVelocity, this, enemy);
    }


    changeEnemyVelocity(enemy: Phaser.Sprite) {
        if (enemy.x > 260) {
            enemy.body.velocity.x = this.space.rand.between(-100, -150);
        } else if (enemy.x < 100) {
            enemy.body.velocity.x = this.space.rand.between(100, 150);
        } else {
            enemy.body.velocity.x = this.space.rand.between(-150, 150);
        }
        this.space.game.time.events.add(this.space.rand.between(1000, 3000), this.changeEnemyVelocity, this, enemy);
    }
}

