class Obstacle {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
    }

    draw() {
        stroke(0);
        strokeWeight(0.5);
        fill(100);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}