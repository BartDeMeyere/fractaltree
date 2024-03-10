//select canvas and init properties
let canvas = $("canvas")

let c = $("canvas")[0].getContext("2d")

$("body").css("margin" , 0)
$("body").css("backgroundColor" , "black")

canvas.attr("width" , innerWidth * devicePixelRatio)
canvas.attr('height' , innerHeight * devicePixelRatio)

canvas.css("width" , 100 + "%")
canvas.css("height" , 100 + "%")

let len = 400
let pointA = new Point(canvas[0].width/2 , canvas[0].height)
let pointB = new Point(canvas[0].width/2 , canvas[0].height - len)
let tree = []
let counter = 0
let maxorder = 0//18
let done = false
let startWidth = 15


renderCanvas()

$("#renderfractal").on("click" , function(){

    done = false;
    tree = [];
    startWidth = 15 
    counter = 0
    len = 400
    pointA = new Point(canvas[0].width/2 , canvas[0].height)
    pointB = new Point(canvas[0].width/2 , canvas[0].height - len)
    CreateBranches()
    renderCanvas()
    $("#renderfractal").prop("disabled", true)

})

$("#maxorder").on("change" , function(){

    maxorder = parseInt(this.value)

})

function random(min,max){

    return min + Math.random() * (max-min)
}

function CreateBranches(){

    //end fractal tree drawing
    if(counter > maxorder){

        console.log("we are done")
        $("#renderfractal").prop("disabled", false)
        done = true
        return
    }

    //create the first branch
    if(tree.length === 0){

        tree.push(new Branch(pointA , pointB , -Math.PI/2 , len , "grey" , startWidth))

    }else{


        for(var i = tree.length - 1 ; i >= 0 ; i--){

            if(!tree[i].finished){

              if(counter === maxorder){

                  //create next branches
                  tree.push(tree[i].addBranch("lime")[0])
                  tree.push(tree[i].addBranch("lime")[1])
                 

              }else{

                  //create next branches
                  tree.push(tree[i].addBranch("Chocolate")[0])
                  tree.push(tree[i].addBranch("Chocolate")[1])
                
              
              }
         

            }

            tree[i].finished = true
        }

    }

    counter++

    setTimeout(CreateBranches,100)

}

function renderCanvas(){

    c.clearRect(0 , 0 , canvas[0].width , canvas[0].height)

    //render tree
    for(var i = 0 ; i < tree.length ; i++){

        tree[i].render()
    }

    if(!done){

        requestAnimationFrame(renderCanvas)
    }

 

}