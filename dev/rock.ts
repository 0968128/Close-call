/// <reference path="gameobject.ts"/>

class Rock extends GameObject {
    // Fields 
    private g: number = 0
    
    private rotation: number = 0
    private rotationSpeed: number = 0

    // Properties
    x = 0
    y = 0
    speed: number = 0

    public get Speed():number { return this.speed }
    public set Speed(value:number) { this.speed = value }     

	public get X():number { return this.x }
	public set X(value:number) { this.x = value }

	public get Y():number { return this.y }
	public set Y(value:number) { this.y = value }

    constructor(index) {
        super()
        this.X = Math.random() * 400 + 400
        this.Y = (70 * index) + 80

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    // Methods
    move():void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.X += this.speed
        this.Y += this.g
        this.speed *= 0.98
        this.rotation += this.rotationSpeed

        if (this.Y + this.clientHeight > document.getElementById("container").clientHeight){
            this.speed = 0
            this.g = 0
            this.rotationSpeed = 0
        }

        //teken de div op de juiste positie
        super.move()
    }

    onCollision(gameObject:GameObject):void {
        if(gameObject instanceof Car) {
            this.crash(gameObject.Speed)
        }
    }

    public crash(carSpeed:number) {
        this.g = 9.81
        this.speed = carSpeed
        this.rotationSpeed = 5
    }
}

window.customElements.define("rock-component", Rock as any)