/// <reference path="gameobject.ts"/>

class Wheel extends GameObject {
    constructor(parent:HTMLElement, offsetCarX:number) {
        super()
        this.style.transform = `translate(${offsetCarX}px, 30px)`
        parent.appendChild(this)
    }

    move():void {
        return
    }

    onCollision(gameObject:GameObject):void {
        return
    }
}

window.customElements.define("wheel-component", Wheel as any)