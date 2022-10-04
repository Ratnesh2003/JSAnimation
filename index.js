let totalStars = [];
let fixedStars = [];
let asteroids = [];
let sizeX = 20;
let sizeY = 20;

let speed = 3;
const maxSpeed = 10;
const minSpeed = 1;

let asteroidSpeed = 3;
let maxAsteroidSpeed = 12;
let minAsteroidSPeed = 2;

const speedChangeRate = 0.3;

let canvas;
let ctx;
let center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
let pastLoc;

let isKeyPressed = false;

let asteroidImage1 = new Image();
asteroidImage1.src = "images/asteroids/ast1.png";

let asteroidImage2 = new Image();
asteroidImage2.src = "images/asteroids/ast2.png";

let asteroidImage3 = new Image();
asteroidImage3.src = "images/asteroids/ast3.png";

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

    // Adding asteroids positions in array.
    for (let i = 0; i < 10; i++) {
        let loc = {
            sizeX: 20 + Math.random() * 20,
            sizeY: 20 + Math.random() * 20,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }
        asteroids.push(loc);
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



function stars(ctx, location) {
    // console.log("hello");
    ctx.beginPath();

    ctx.moveTo(location.x, location.y);

    let weight = 50 - 45 * (speed / maxSpeed);

    pastLoc = {
        pX: (weight * location.x + center.x) / (weight + 1),
        pY: (weight * location.y + center.y) / (weight + 1)
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

function updateAsteroids(location) {

    let angle = Math.atan2(
        location.y - center.y,
        location.x - center.x
    );
    location.x += asteroidSpeed * Math.cos(angle);
    location.y += asteroidSpeed * Math.sin(angle);

    if (location.x > window.innerWidth + 100 ||
        location.x < -150 || location.y < -150 ||
        location.y > window.innerHeight + 100) {
        location.x = Math.random() * window.innerWidth;
        location.y = Math.random() * window.innerHeight;

        pastLoc = {
            pX: location.x,
            pY: location.Y
        }
        location.sizeX = 0.1;
        location.sizeY = 0.1;
    }
    let distanceFromCenter = Math.sqrt(
        Math.pow(location.x - center.x, 2) +
        Math.pow(location.y - center.y, 2)
    )
    location.r = 1 + 3 * distanceFromCenter / window.innerWidth;
}

function animateAsteroids(j, asteroidImageNum, size) {
    updateAsteroids(asteroids[j]);
    ctx.drawImage(asteroidImageNum, asteroids[j].x, asteroids[j].y, asteroids[j].sizeX, asteroids[j].sizeY);
    asteroids[j].sizeX += size;
    asteroids[j].sizeY += size;
    // Add asteroids size increase condition on pressing w
}

function animate() {

    if (isKeyPressed) {
        speed += speedChangeRate;
        asteroidSpeed += speedChangeRate;
    } else {
        speed -= speedChangeRate;
        asteroidSpeed -= speedChangeRate;
    }

    speed = Math.min(speed, maxSpeed);
    speed = Math.max(minSpeed, speed);

    asteroidSpeed = Math.min(asteroidSpeed, maxAsteroidSpeed);
    asteroidSpeed = Math.max(minAsteroidSPeed, asteroidSpeed);

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

    for (let i=0; i < 10; i++) {
        if (i < 3)
            animateAsteroids(i, asteroidImage1, 0.6);
        else if (i < 6)
            animateAsteroids(i, asteroidImage2, 0.5);
        else 
            animateAsteroids(i, asteroidImage3, 0.4);        
    }

    window.requestAnimationFrame(animate);
}

