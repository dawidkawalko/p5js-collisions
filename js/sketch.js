let game = null;
let obstacleCreator = null;

const GRAVITY = 0.63;
const PLAYER_SIZE = 40;
const PLAYER_SPEED = 0.5;
const PLAYER_JUMP_FORCE = 10.0;
const PLAYER_FRICTION = 0.9;

function setup() {
    createCanvas(800, 600);

    obstacleCreator = new ObstacleCreator();

    game = new Game(GRAVITY);
    game.setPlayer(50, height / 5, PLAYER_SIZE, PLAYER_SPEED, PLAYER_JUMP_FORCE, PLAYER_FRICTION);

    // Ground
    game.addObstacle(0, height - 30, width, 30);

    // Text
    createDiv("Press and hold LMB to add an obstacle");
    createDiv("Press MMB to remove an obstacle");
}

function draw() {
    background(240);

    obstacleCreator.update(createVector(mouseX, mouseY));
    obstacleCreator.draw();

    game.update();
    game.draw();
}

function keyPressed() {
    game.setKey(key, true);
}

function keyReleased() {
    game.setKey(key, false);
}

function mousePressed() {
    if (mouseButton === LEFT) {
        obstacleCreator.setOrigin(mouseX, mouseY);
    } else if (mouseButton === CENTER) {
        game.removeObstacle(mouseX, mouseY);
    }
}

function mouseReleased() {
    if (mouseButton === LEFT) {
        const obstacle = obstacleCreator.create();

        if (obstacle.size.x > 0.0 && obstacle.size.y > 0.0 &&
            !game.player.collidesWith(game.player.pos.x, game.player.pos.y, obstacle))
        {
            game.obstacles.push(obstacle);
        }
    }
}