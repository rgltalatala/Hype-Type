class Word {
    constructor(canvas, ctx, x) {
        this.y = canvas.height - 100;
        this.x = x || canvas.width/2;
        this.completed = false;
        this.gameOver = false;
        this.canvas = canvas;
        this.ctx = ctx;
    }

}

export default Word