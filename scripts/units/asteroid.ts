import { SpaceGame } from '../game';

export class SpaceUnitAsteroid {
    space: SpaceGame;

    constructor(space: SpaceGame) {
        this.space = space;
    }

    place() {
        const asteroid = this.space.asteroids.create(this.space.rand.between(0, 800), this.space.rand.between(-50, -200), 'asteroid');
        asteroid.body.gravity.x = 0;
        asteroid.body.gravity.y = 0;

        asteroid.body.velocity.y = this.space.rand.between(50, 200);
        asteroid.body.velocity.x = this.space.rand.between(-50, 50);

        asteroid.angle = this.space.rand.between(0, 360);

        asteroid.width = 25;
        asteroid.height = 25;

        this.space.game.time.events.add(1000, this.check, this, asteroid);
    }

    check(asteroid: Phaser.Sprite) {
        if (asteroid.y > 700) {
            asteroid.destroy(true);
        } else {
            this.space.game.time.events.add(1000, this.check, this, asteroid);
        }
    }
}

