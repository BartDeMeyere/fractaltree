class Point{
    constructor(x,y){
       this.x = x;
       this.y = y;
       return {x:this.x , y:this.y}
    }
 }

 class Branch{

    constructor(start , end , angle , len , color , width){

        this.start = start 
        this.end = end
        this.angle = angle
        this.finished = false
        this.len = len
        this.color = color
        this.width = width
    
    }

    render(){

        c.beginPath()
        c.strokeStyle = this.color
        c.lineWidth = this.width
        c.moveTo(this.start.x , this.start.y)
        c.lineTo(this.end.x , this.end.y)
        c.stroke()
        c.closePath()
    
    }

    addBranch(color){

        var subangle = random(-Math.PI/3,Math.PI/3)
    
        var newangle = this.angle +  subangle
        var x = this.end.x + Math.cos(newangle) * this.len
        var y = this.end.y + Math.sin(newangle) * this.len
        var newEnd = new Point(x,y)
        var right = new Branch(this.end , newEnd , newangle , this.len * .8 , color , this.width * .8)
        
        subangle = random(-Math.PI/3,Math.PI/3)
        
        var newangle = this.angle - subangle
        var x = this.end.x + Math.cos(newangle) * this.len
        var y = this.end.y + Math.sin(newangle) * this.len
        var newEnd = new Point(x,y)
        var left = new Branch(this.end , newEnd , newangle , this.len * .5 , color , this.width * .6)
    
        return [right,left]
    
       
    }

 }


