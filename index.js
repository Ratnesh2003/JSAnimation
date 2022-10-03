let totalStars = [];
let speed = 5;
let canvas;
let ctx;
let center;

function canvasHW() {
    canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    

    for (let i = 0; i < 100; i++) {
        let loc = {
            r: (Math.random()*2) + 1,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }
        totalStars.push(loc);
        stars(ctx, loc);
    }
    animate();
}

function stars(ctx, loc) {
        console.log("hello");
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, loc.r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
}

function updateStars(loc) {
    center = {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    }
    let angle = Math.atan2(
        loc.y - center.y,
        loc.x - center.x
    );
    loc.x += speed*Math.cos(angle);
    loc.y += speed*Math.sin(angle);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<100; i++) {
        console.log(i);
        updateStars(totalStars[i]);
        stars(ctx, totalStars[i]);
    }

    window.requestAnimationFrame(animate);
}

