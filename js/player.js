class Player {
    constructor(x, y, size, speed, jumpForce, friction) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.size = createVector(size, size);
        this.speed = speed;
        this.jumpForce = jumpForce;
        this.onGround = true;
        this.friction = friction;
    }

    draw() {
        strokeWeight(0);
        fill(0);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    jump() {
        if (this.onGround) {
            this.vel.y = -this.jumpForce;
        }
    }

    applyGravity(gravityForce) {
        this.acc.y += gravityForce;
    }

    update(obstacles) {
        this.vel.add(this.acc);
    
        // Horizontal velocity dampening (friction simulation)
        this.vel.x *= this.friction;
        if (Math.abs(this.vel.x) < 0.1) {
            this.vel.x = 0.0;
        }

        this.handleCollisions(obstacles);

        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    handleCollisions(obstacles) {
        this.onGround = false;

        for (let obstacle of obstacles) {
            if (this.collidesWith(this.pos.x + this.vel.x, this.pos.y, obstacle)) {
                const dir = Math.sign(this.vel.x);

                if (dir > 0.0) {
                    this.pos.x = obstacle.pos.x - this.size.x;
                } else if (dir < 0.0) {
                    this.pos.x = obstacle.pos.x + obstacle.size.x;
                }

                this.vel.x = 0;
            }

            if (this.collidesWith(this.pos.x, this.pos.y + this.vel.y, obstacle)) {
                const dir = Math.sign(this.vel.y);

                if (dir > 0.0) {
                    this.pos.y = obstacle.pos.y - this.size.y;
                    this.onGround = true;
                } else if (dir < 0.0) {
                    this.pos.y = obstacle.pos.y + obstacle.size.y;
                }

                this.vel.y = 0;
            }
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    move(dir) {
        this.applyForce(dir.mult(this.speed));
    }

    collidesWith(x, y, o) {
        const x1 = x, x2 = x1 + this.size.x, ox1 = o.pos.x, ox2 = ox1 + o.size.x;
        const y1 = y, y2 = y1 + this.size.y, oy1 = o.pos.y, oy2 = oy1 + o.size.y;
        
        return (x2 > ox1 && x1 < ox2 && y2 > oy1 && y1 < oy2);
    }
}