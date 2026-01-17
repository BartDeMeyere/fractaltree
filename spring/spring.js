export class Spring {

    constructor(x = 0, y = 0, targetX, targetY) {

        this.position = { x, y }
        this.spring = .03
        this.friction = .94
        this.acceleration = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.target = { x: targetX, y: targetY }
    }

    setTarget(x, y) {

        this.target.x = x
        this.target.y = y
    }

    kick(vx, vy) {

        this.velocity.x = vx
        this.velocity.y = vy
    }

    update() {


        this.acceleration.x = (this.target.x - this.position.x) * this.spring
        this.acceleration.y = (this.target.y - this.position.y) * this.spring

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y

        this.velocity.x *= this.friction
        this.velocity.y *= this.friction

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}