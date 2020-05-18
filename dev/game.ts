class Game {
    // Fields
    private gameObjects: GameObject[] = []
    private score: number = 0
    private gameover: boolean = false

    constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        // Gameloop starten
        this.gameLoop()
    }

    private addCarWithRock(index:number) {
        this.gameObjects.push(new Car(index, this))
        this.gameObjects.push(new Rock(index))
    }

    private gameLoop() {
        for(let gameObject of this.gameObjects) {
            gameObject.move()
        }

        this.checkCollision()

        // Gameloop aan de gang houden
        requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision():void {
        for(let gameObject1 of this.gameObjects) {
            for(let gameObject2 of this.gameObjects) {
                if(gameObject1.hasCollision(gameObject2)) {
                    gameObject1.onCollision(gameObject2)
                }
            }
        }
    }

    public gameOver():void {
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(requestAnimationFrame(() => this.gameLoop()))
    }

    public addScore(score:number):void {
        if(!this.gameover) {
            this.score += Math.floor(score)
            document.getElementById("score").innerHTML = "Score : "+this.score
        }
    }
}

window.addEventListener("load", () => new Game())