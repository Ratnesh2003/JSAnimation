let totalStars = [];

function canvasHW() {
    let canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    

    for (let i = 0; i < 100; i++) {
        let loc = {
            r: (Math.random()*2) + 1,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }
        stars(ctx, loc);
    }
}

function stars(ctx, loc) {
        console.log("hello");
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, loc.r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
}

