import { Spring } from "../spring/spring.js"

export class Branch {

    constructor(x, y, length, angle, color) {

        this.x = x
        this.y = y
        this.length = length
        this.angle = angle
        this.color = color
        this.finished = false
        this.parent = null

        this.baseDX = this.length * Math.cos(this.angle)
        this.baseDY = this.length * Math.sin(this.angle)
        
        this.endX = this.x + this.baseDX
        this.endY = this.y + this.baseDY
        
        this.spring = new Spring(0, 0, 0, 0)
        
    }

    draw(ctx) {

        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.endX, this.endY)
        ctx.stroke()
        ctx.closePath()
    }

    addBranch() {

        let left = new Branch(this.endX, this.endY, this.length * .7, this.angle - Math.PI / 5 , this.color)
        let right = new Branch(this.endX, this.endY, this.length * .7, this.angle + Math.PI / 50 , this.color)
        return [left , right]
    }
}