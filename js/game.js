class Game {
    constructor(gravityForce) {
        this.obstacles = [];
        this.keys = {};
        this.gravityForce = gravityForce;
    }

    setPlayer(x, y, size, speed, jumpForce, friction) {
        this.player = new Player(x, y, size, speed, jumpForce, friction);
    }

    setKey(key, state) {
        this.keys[key] = state;
    }

    update() {
        if (this.keys['a']) this.player.move(createVector(-1.0,  0.0));
        if (this.keys['d']) this.player.move(createVector( 1.0,  0.0));
        if (this.keys['w']) this.player.jump();

        this.player.applyGravity(this.gravityForce);
        this.player.update(this.obstacles);
    }

    draw() {
        for (let obstacle of this.obstacles) {
            obstacle.draw();
        }

        this.player.draw();
    }

    addObstacle(x, y, w, h) {
        this.obstacles.push(new Obstacle(x, y, w, h));
    }

    removeObstacle(x, y) {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            if (this.pointInside(x, y, this.obstacles[i])) {
                this.obstacles.splice(i, 1);

                // Only remove one
                break;
            }
        }
    }

    pointInside(x, y, o) {
        const ox1 = o.pos.x, ox2 = ox1 + o.size.x;
        const oy1 = o.pos.y, oy2 = oy1 + o.size.y;
        
        return (x >= ox1 && x <= ox2 && y >= oy1 && y <= oy2);
    }
}