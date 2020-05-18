abstract class GameObject extends HTMLElement {
    // Fields
    protected x:number
    protected y:number
    protected speed:number

    // Properties
    public get width():number { return this.clientWidth }
    public get height():number { return this.clientHeight }

    public get Speed():number { return this.speed }
    public set Speed(value:number) { this.speed = value }

	public get X():number { return this.x }
	public set X(value:number) { this.x = value }

	public get Y():number { return this.y }
    public set Y(value:number) { this.y = value }

    // Contructor
    constructor() {
        super()
    }

    // Methods
    public hasCollision(gameObject:GameObject):boolean {
        return(
            this.X < gameObject.X + gameObject.width &&
            this.X + this.width > gameObject.X &&
            this.Y < gameObject.Y + gameObject.height &&
            this.Y + this.height > gameObject.Y
        )
    }

    public move():void {
        this.draw()
    }

    private draw():void {
        this.style.transform =`translate(${this.x}px,${this.y}px)`
    }

    abstract onCollision(GameObject:GameObject):void
}