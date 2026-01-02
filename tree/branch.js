export class Branch {

    constructor(startX, startY, len, angle, width) {

        this.startX = startX
        this.startY = startY
        this.len = len
        this.angle = angle
        this.width = width
        this.endX = this.startX + this.len * Math.cos(this.angle)
        this.endY = this.startY + this.len * Math.sin(this.angle)
        this.baseEndX = this.endX
        this.baseEndY = this.endY
        this.finished = false
        this.minLen = 15
        this.velocity = { 
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 30 
        }
        this.damping = .98
        this.parent = null
    }


    branch() {

        if (this.len < this.minLen) return

        let left = new Branch(this.endX, this.endY, this.len * .75, this.randomAngle(this.angle, 1), this.width * .7)
        let right = new Branch(this.endX, this.endY, this.len * .75, this.randomAngle(this.angle, -1), this.width * .7)
        left.parent = this
        right.parent = this
        return [left, right]

    }

    randomAngle(baseAngle, direction) {

        let spread = Math.PI / 3   // 60°
        // direction = 1 (rechts) of -1 (links)
        return baseAngle + direction * Math.random() * spread
    }

    draw(ctx) {

        ctx.beginPath()
        ctx.strokeStyle = (this.len < this.minLen + 50) ? ctx.strokeStyle = "green" : ctx.strokeStyle = "#000"
        ctx.lineWidth = Math.max(this.len / 15, 1)
        ctx.lineCap = "round"
        ctx.moveTo(this.startX, this.startY)
        ctx.lineTo(this.endX, this.endY)
        ctx.stroke()
        ctx.closePath()

    }

    shake() {

        this.velocity.x += (this.baseEndX - this.endX) * .1
        this.velocity.y += (this.baseEndY - this.endY) * .1

        this.velocity.x *= this.damping
        this.velocity.y *= this.damping

        this.endX += this.velocity.x
        this.endY += this.velocity.y
    }

}