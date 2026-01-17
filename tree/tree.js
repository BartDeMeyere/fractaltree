import { Branch } from "../objects/branch.js"

export class Tree {

    constructor(x, y, startlength, maxDepth) {

        this.x = x
        this.y = y
        this.startlength = startlength
        this.maxDepth = maxDepth
        this.depth = 0
        this.branches = []
        this.animId = null
        this.isGrowing = true
    }

    create() {

        if (this.depth > this.maxDepth) {
            this.isGrowing = false
            cancelAnimationFrame(this.animId)
            return
        }

        //draw first branch
        if (this.branches.length === 0) {

            this.branches.push(new Branch(this.x, this.y, this.startlength, -Math.PI / 2, "#000"))

        } else {

            for (let i = this.branches.length - 1; i >= 0; i--) {

                let current = this.branches[i]

                if (!current.finished) {

                    let left = current.addBranch()[0]
                    let right = current.addBranch()[1]
                    left.parent = current
                    right.parent = current
                    this.branches.push(left, right)
                }

                current.finished = true
            }
        }

        this.depth++

        this.animId = requestAnimationFrame(() => this.create())
    }

    
    shake() {
        if (this.isGrowing) return;
    
        this.branches.forEach(branch => {
    
            // startpunt komt ALTIJD van parent
            if (branch.parent) {
                branch.x = branch.parent.endX
                branch.y = branch.parent.endY
            }
    
            // spring update
            branch.spring.update()
    
            // eindpunt = basisvector + spring offset
            branch.endX = branch.x + branch.baseDX + branch.spring.position.x
            branch.endY = branch.y + branch.baseDY + branch.spring.position.y
        })
    }
    
    
}