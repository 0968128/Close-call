/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts"/>

class Car extends GameObject {
    // Fields
    private braking: boolean = false
    private stopped: boolean = false
    private game: Game

    // Constructor
    constructor(yIndex:number, game:Game) {
        super()

        this.game = game
        this.X = 0
        this.Y = (70 * yIndex) + 80
        this.Speed = (Math.random() * 2 + 1)
        
        new Wheel(this, 105)
        new Wheel(this, 20)

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e : KeyboardEvent) => this.handleKeyDown(e))
        this.addEventListener("click", (e : MouseEvent) => this.handleMouseClick(e))

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    private handleMouseClick(e:MouseEvent):void {
        this.braking = true
        this.changeColor(80)
    }

    private handleKeyDown(e:KeyboardEvent):void {
        if(e.key == 'spacebar') {
            // Brake
            this.braking = true
        }
    }

    public move():void {
        // de snelheid bij de x waarde optellen
        this.X += this.speed

        // hier de snelheid verlagen als we aan het afremmen zijn
        if (this.braking) this.speed *= 0.9
        if (this.speed < 0.5) this.speed = 0
        
        if(this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80)
            this.game.addScore(this.X)
            this.braking = false
            this.stopped = true
        }
        super.move()
    }

    onCollision(gameObject:GameObject):void {
        if(gameObject instanceof Rock) {
            this.crash()
            this.game.gameOver()
        }
    }

    public crash():void {
        this.speed = 0
        this.braking = false
        this.changeColor(300)
    }

    public changeColor(deg:number):void {
        this.style.filter = `hue-rotate(${deg}deg)`
    }
}

window.customElements.define("car-component", Car as any)