import { Spring } from "./spring/spring.js"
import { Tree } from "./tree/tree.js"

document.body.style.margin = 0

let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio
canvas.style.width = "100%"
canvas.style.height = "100%"

let tree = new Tree(canvas.width / 2, canvas.height, 500, 15)
tree.create()

canvas.addEventListener("click", (e) => {
    
    if(!tree.isGrowing){

        tree.branches.forEach(branch => {

            branch.spring.kick(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            )
    
        })

    }
 
})


function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    tree.shake()
    tree.branches.forEach(branch => { branch.draw(ctx) })

    requestAnimationFrame(render)

}

render() 
