import { Tree } from "./tree/tree.js";
let canvas = document.querySelector("canvas")
let tree = new Tree(20)
tree.grow(canvas.width/2 , canvas.height)
tree.startShakeTree()
