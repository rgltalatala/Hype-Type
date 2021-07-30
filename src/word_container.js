import Zone from "./zone";

export default class WordContainer {
    constructor(text, ctx, canvas){
        this.x = Math.random() * (canvas.width - 100);
        this.y = Math.random() * -1000;
        this.dx = 0;
        this.dy = 0.25;
        this.height = 50
        this.html = document.createElement('span')
        this.html.innerHTML = text
        this.text = text
        this.ctx = ctx
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.width = 0
    }

    draw() {
        this.ctx.fillStyle = '#629677'
        var width = this.ctx.measureText(this.text).width;
        this.width = width
        this.ctx.fillRect(this.x, this.y, width + 20, this.height);  
        this.ctx.stroke()
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font="20px Somatic-Rounded";
        this.ctx.textAlign="left"; 
        this.ctx.textBaseline = "top";
        this.ctx.fillText(this.text, this.x + 10, this.y + 15)

    }

    destroy(){
        let width = this.ctx.measureText(this.text).width;
        this.ctx.clearRect(this.x, this.y, width + 20, 50);
         true
    }

    update() {
        this.x += this.dx
        this.y += this.dy;
        this.draw()
    }
}