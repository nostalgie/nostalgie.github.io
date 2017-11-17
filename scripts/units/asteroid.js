(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpaceUnitAsteroid = (function () {
        function SpaceUnitAsteroid(space) {
            this.space = space;
        }
        SpaceUnitAsteroid.prototype.place = function () {
            var asteroid = this.space.asteroids.create(this.space.rand.between(0, 800), this.space.rand.between(-50, -200), 'asteroid');
            asteroid.body.gravity.x = 0;
            asteroid.body.gravity.y = 0;
            asteroid.body.velocity.y = this.space.rand.between(50, 200);
            asteroid.body.velocity.x = this.space.rand.between(-50, 50);
            asteroid.angle = this.space.rand.between(0, 360);
            asteroid.width = 25;
            asteroid.height = 25;
            this.space.game.time.events.add(1000, this.check, this, asteroid);
        };
        SpaceUnitAsteroid.prototype.check = function (asteroid) {
            if (asteroid.y > 700) {
                asteroid.destroy(true);
            }
            else {
                this.space.game.time.events.add(1000, this.check, this, asteroid);
            }
        };
        return SpaceUnitAsteroid;
    }());
    exports.SpaceUnitAsteroid = SpaceUnitAsteroid;
});
//# sourceMappingURL=asteroid.js.map