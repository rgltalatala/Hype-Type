import WordContainer from "./word_container";

export default class Zone {
    constructor(ctx, canvas){
        this.ctx = ctx;
        this.canvas = canvas;
        this.x = 0;
        this.y = 350;
    }

    draw() {
        this.ctx.fillStyle = '#653239'
        var width = this.canvas.width;
        this.ctx.fillRect(this.x, this.y, width, 25);  
        this.ctx.stroke()
        this.ctx.fillStyle = "#FFFFFF";
        
    }

    // collision(first, second){
    //     if ( !(first.x > second.x + second.width ||
    //             first.x  + first.width < second.x || 
    //             first.y > second.y + second.height ||
    //             first.y + first.height < second.y)
    //     ){
    //         return true
    //     }
    // }


}