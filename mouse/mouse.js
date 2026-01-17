export class Mouse {

    constructor(element , dpr) {

        this.element = element
        this.dpr = dpr || 1
        this.position = { x: 0, y: 0 }
        this.isDown = false
        this.init()
    }

    init() {

        this.element.addEventListener("mousemove", (e) => {

            this.position.x = e.clientX * this.dpr
            this.position.y = e.clientY * this.dpr

        })

        this.element.addEventListener("mousedown", (e) => {

            this.isDown = true

        })

        this.element.addEventListener("mouseup", (e) => {

            this.isDown = false

        })
    }
}