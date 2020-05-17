class GameObject extends HTMLElement {
    constructor() {
        super();
    }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    hasCollision(rect1, rect2) {
        return (rect1.X < rect2.X + rect2.width &&
            rect1.X + rect1.width > rect2.X &&
            rect1.Y < rect2.Y + rect2.height &&
            rect1.Y + rect1.height > rect2.Y);
    }
    draw() {
        this.style.transform = `translate(${this.x}px,${this.y}px)`;
    }
}
class Wheel extends GameObject {
    constructor(parent, offsetCarX) {
        super();
        this.style.transform = `translate(${offsetCarX}px, 30px)`;
        parent.appendChild(this);
    }
    move() {
        return;
    }
    onCollision(gameObject) {
        return;
    }
}
window.customElements.define("wheel-component", Wheel);
class Car extends GameObject {
    constructor(yIndex, game) {
        super();
        this.speed = Math.random() * 2 + 1;
        this.braking = false;
        this.stopped = false;
        this.y = 0;
        this.x = 0;
        this.game = game;
        this.X = 0;
        this.Y = (70 * yIndex) + 80;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    get Speed() { return this.speed; }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    handleMouseClick(e) {
        this.braking = true;
        this.changeColor(80);
    }
    handleKeyDown(e) {
        if (e.key == 'spacebar') {
            this.braking = true;
        }
    }
    move() {
        this.X += this.speed;
        if (this.braking)
            this.speed *= 0.9;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.game.addScore(this.X);
            this.braking = false;
            this.stopped = true;
        }
        this.draw();
    }
    onCollision(GameObject) {
        return;
    }
    crash() {
        this.speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.gameObjects = [];
        this.score = 0;
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
        }
        this.gameLoop();
    }
    addCarWithRock(index) {
        this.gameObjects.push(new Car(index, this));
        this.gameObjects.push(new Rock(index));
    }
    gameLoop() {
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof Car) {
                gameObject.move();
            }
            if (gameObject instanceof Rock) {
                gameObject.move();
            }
        }
        this.checkCollision();
        requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        let cars = [];
        let rocks = [];
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof Car) {
                cars.push(gameObject);
            }
            if (gameObject instanceof Rock) {
                rocks.push(gameObject);
            }
            for (let car of cars) {
                for (let rock of rocks) {
                    if (gameObject.hasCollision(car, rock)) {
                        rock.crash();
                        car.crash();
                        this.gameOver();
                    }
                }
            }
        }
    }
    gameOver() {
        this.gameover = true;
        document.getElementById("score").innerHTML = "Game Over";
        cancelAnimationFrame(requestAnimationFrame(() => this.gameLoop()));
    }
    addScore(score) {
        if (!this.gameover) {
            this.score += Math.floor(score);
            document.getElementById("score").innerHTML = "Score : " + this.score;
        }
    }
}
window.addEventListener("load", () => new Game());
class Rock extends GameObject {
    constructor(index) {
        super();
        this.x = 0;
        this.y = 0;
        this.g = 0;
        this.speed = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.X = Math.random() * 400 + 400;
        this.Y = (70 * index) + 80;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    set Speed(s) { this.speed = s; }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    move() {
        this.X += this.speed;
        this.Y += this.g;
        this.speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.Y + this.clientHeight > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        this.draw();
    }
    onCollision(GameObject) {
        return;
    }
    crash() {
        this.g = 9.81;
        this.rotationSpeed = 5;
    }
}
window.customElements.define("rock-component", Rock);
//# sourceMappingURL=main.js.map