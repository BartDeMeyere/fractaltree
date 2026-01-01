export class Renderer {

    constructor(canvas, ctx, branches) {

        this.canvas = canvas
        this.ctx = ctx
        this.branches = branches

    }

    render() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (let branch of this.branches) {

            branch.draw(this.ctx)

        }

        requestAnimationFrame(() => this.render())
    }
}