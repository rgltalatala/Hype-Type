    var canvas = document.querySelector('canvas');
    canvas.width = 900;
    canvas.height = 375;

    var ctx = canvas.getContext('2d'); // context

    function WordContainer(x, y, dx, dy, text) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.html = document.createElement('span')
        this.html.innerHTML = text
        this.text = text

    this.draw = function() {
        ctx.fillStyle = '#629677'
        var width = ctx.measureText(this.text).width;
        ctx.fillRect(this.x, this.y, width + 20, 50);  
        ctx.stroke()
        ctx.fillStyle = "#FFFFFF";
        ctx.font="20px Somatic-Rounded";
        ctx.textAlign="left"; 
        ctx.textBaseline = "top";
        ctx.fillText(this.text, this.x + 10, this.y + 15)
    }

    this.update = function() {
        this.x += this.dx
        this.y += this.dy;
        this.draw()
    }}

    var wordContainers = [];

    for (var i = 0; i < 10; i++){
        var x = Math.random() * (canvas.width - 100)
        var y = Math.random() * -1000
        var dx = 0;
        var dy = 0.5;
        wordContainers.push(new WordContainer(x, y, dx, dy, arrayWords[i]))
    }

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight)

        // wordContainer.update()
        for (var i = 0; i < wordContainers.length; i++){
            wordContainers[i].update()
        }
    }

    animate()

    export default 