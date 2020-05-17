abstract class GameObject extends HTMLElement {
    // Fields
    protected x:Number
    protected y:Number

    // Properties
    public get width():number { return this.clientWidth }
    public get height():number { return this.clientHeight }

    // Contructor
    constructor() {
        super()
    }

    // Methods
    public hasCollision(rect1:Car, rect2:Rock):boolean {
        return(
            rect1.X < rect2.X + rect2.width &&
            rect1.X + rect1.width > rect2.X &&
            rect1.Y < rect2.Y + rect2.height &&
            rect1.Y + rect1.height > rect2.Y
        )
    }

    abstract move():void

    protected draw():void {
        this.style.transform =`translate(${this.x}px,${this.y}px)`
    }

    abstract onCollision(GameObject:GameObject):void
}