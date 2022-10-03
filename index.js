let totalStars = [];
let fixedStars = [];
let speed = 3;
let maxSpeed = 10;
let minSpeed = 1;
let canvas;
let ctx;
let center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
let pastLoc;

let isKeyPressed = false;

function canvasHW() {
    canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");

    window.addEventListener("keydown", onKeyPressed);
    window.addEventListener("keyup", onKeyReleased);


    for (let i = 0; i < 100; i++) {
        let loc = {
            r: (Math.random() * 2) + 1,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }

        pastLoc = {
            pX: loc.x,
            pY: loc.y
        }
        totalStars.push(loc);
        stars(ctx, loc);
    }

    for (let i = 0; i < 50; i++) {
        let fixedLoc = {
            r: (Math.random() * 2) + 1,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }
        fixedStars.push(fixedLoc);
        stars(ctx, fixedLoc);
    }
    animate();
}


function onKeyPressed(e) {
    if (e.keyCode === 87) {
        isKeyPressed = true;
    }
}

function onKeyReleased() {

        isKeyPressed = false;

}


function onArrowClicked(e) {
    console.log("Clicked");
    if (e.keyCode === 38) {
        console.log("JSDKLKLDFJ");
        isKeyDown = true;
    }
}


function stars(ctx, location) {
    // console.log("hello");
    ctx.beginPath();

    ctx.moveTo(location.x, location.y);

    pastLoc = {
        pX: (9 * location.x + center.x) / 10,
        pY: (9 * location.y + center.y) / 10
    }
    ctx.lineTo(pastLoc.pX, pastLoc.pY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = location.r;
    ctx.stroke();

}

function updateStars(location) {

    let angle = Math.atan2(
        location.y - center.y,
        location.x - center.x
    );




    location.x += speed * Math.cos(angle);
    location.y += speed * Math.sin(angle);

    // console.log(pastLoc.pX, location.x);

    if (location.x > window.innerWidth ||
        location.x < 0 || location.y < 0 ||
        location.y > window.innerHeight) {
        location.x = Math.random() * window.innerWidth;
        location.y = Math.random() * window.innerHeight;

        pastLoc = {
            pX: location.x,
            pY: location.Y
        }
    }

    let distanceFromCenter = Math.sqrt(
        Math.pow(location.x - center.x, 2) +
        Math.pow(location.y - center.y, 2)
    )

    location.r = 1 + 3 * distanceFromCenter / window.innerWidth;
}

function animate() {

    if (isKeyPressed) {
        speed++;
    } else {
        speed--;
    }

    speed = Math.min(speed, maxSpeed);
    speed = Math.max(minSpeed, speed);


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(fixedStars[i].x, fixedStars[i].y, fixedStars[i].r, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }
    for (let i = 0; i < 100; i++) {
        // console.log(i);
        updateStars(totalStars[i]);
        stars(ctx, totalStars[i]);
    }

    window.requestAnimationFrame(animate);
}

