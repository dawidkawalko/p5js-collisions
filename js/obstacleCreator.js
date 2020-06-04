class ObstacleCreator {
    constructor() {
        this.origin = createVector();
        this.size = createVector();

        this.isCreating = false;
    }

    update(mousePos) {
        this.size = mousePos.sub(this.origin);
    }

    setOrigin(x, y) {
        if (!this.isCreating) {
            this.origin = createVector(x, y);
            this.isCreating = true;
        }
    }

    create() {
        this.isCreating = false;
        
        if (this.size.x < 0.0 && this.size.y < 0.0) {
            this.origin.add(this.size);
            this.size.mult(-1.0);
        } else if (this.size.x < 0.0) {
            this.origin.x += this.size.x;
            this.size.x *= -1.0;
        } else if (this.size.y < 0.0) {
            this.origin.y += this.size.y;
            this.size.y *= -1.0;
        }

        return new Obstacle(this.origin.x, this.origin.y, this.size.x, this.size.y);
    }

    draw() {
        if (this.isCreating) {
            stroke(0);
            strokeWeight(1);
            fill(0, 0, 0, 0);
            rect(this.origin.x, this.origin.y, this.size.x, this.size.y);
        }
    }
}