import { Branch } from "./branch.js"
import { Renderer } from "./renderer.js"

export class Tree {

    constructor() {

        this.canvas = null
        this.ctx = null
        this.dpr = devicePixelRatio || 1
        this.branches = []
        this.animId = null
        this.growFinished = false
        this.init()
        this.renderer = new Renderer(this.canvas, this.ctx, this.branches)
        this.renderer.render()
    }

    init() {

        document.body.style.margin = 0
        document.body.style.overflow = "hidden"
        this.canvas = document.querySelector("canvas")
        if (!this.canvas) throw new Error("no canvas is set!")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = innerWidth * this.dpr
        this.canvas.height = innerHeight * this.dpr
        this.canvas.style.height = "100%"
        this.canvas.style.width = "100%"
    }

    grow(x, y) {

        if (this.branches.length === 0) {
            let root = new Branch(x, y, 500, -Math.PI / 2, 50)
            this.branches.push(root)
        }
    
        let growStep = () => {
            
            let newBranchesAdded = false
    
            for (let i = this.branches.length - 1; i >= 0; i--) {
                
                let currentBranch = this.branches[i]
    
                if (!currentBranch.finished) {
                    let newBranches = currentBranch.branch()
                    if (newBranches) {
                        for (let branch of newBranches) {
                            this.branches.push(branch)
                        }
                    }
                    newBranchesAdded = true
                    currentBranch.finished = true
                }
            }
    
            if (newBranchesAdded) {
                requestAnimationFrame(growStep) // volgende stap
            } else {
                this.growFinished = true
                console.log("we are done")
                //this.startShakeTree()
            }
        }
    
        requestAnimationFrame(growStep)
    }
    

    startShakeTree(amount) {

       //if(!this.growFinished)return

        let  animate = () => {

            for (let branch of this.branches) {
                if (branch.parent) {
                    branch.startX = branch.parent.endX
                    branch.startY = branch.parent.endY
                }
                branch.shake()
            }
    
            requestAnimationFrame(animate)
        }
    
       animate()

    }
}