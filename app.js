window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

const spansSlow = document.querySelectorAll(".spanSlow");
const spansFast = document.querySelectorAll(".spanFast");

let width = window.innerWidth;

function handleMouseMove(e) {
  let normalizedPosition = e.pageX / (width / 2) - 1;
  let speedSlow = 100 * normalizedPosition;
  let speedFast = 200 * normalizedPosition;
  spansSlow.forEach((span) => {
    span.style.transform = `translate(${speedSlow}px)`;
  });
  spansFast.forEach((span) => {
    span.style.transform = `translate(${speedFast}px)`;
  });
}
//we need to recalculate width when the window is resized
function handleWindowResize() {
  width = window.innerWidth;
}

(function () {
  const link = document.querySelectorAll(".hover-this");
  const cursor = document.querySelector(".cursor");

  const animateit = function (e) {
    const span = this.querySelector("span");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === "mouseleave") span.style.transform = "";
  };

  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };

  link.forEach((b) => b.addEventListener("mousemove", animateit));
  link.forEach((b) => b.addEventListener("mouseleave", animateit));
  window.addEventListener("mousemove", editCursor);
})();

$(document).ready(function () {
  $("#btn-home").click(function () {
    $("#content").load("/pages/home.html");
  });

  $("#btn-projects").click(function () {
    $("#content").load("/pages/projects/projects.html");
  });

  $("#btn-about").click(function () {
    $("#content").load("/pages/about.html");
  });
  $("#btn-contact").click(function () {
    $("#content").load("/pages/contact.html");
  });
});

// background

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 40;
let mouse = {
  x: undefined,
  y: undefined,
  radius: 100,
};

function init() {
  resizeReset();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  particles = [];
  for (
    let y =
      (((h - particleDistance) % particleDistance) + particleDistance) / 2;
    y < h;
    y += particleDistance
  ) {
    for (
      let x =
        (((w - particleDistance) % particleDistance) + particleDistance) / 2;
      x < w;
      x += particleDistance
    ) {
      particles.push(new Particle(x, y));
    }
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();
  requestAnimationFrame(animationLoop);
}

function drawScene() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  drawLine();
}

function drawLine() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleDistance * 1.5) {
        opacity = 1 - distance / (particleDistance * 1.5);
        ctx.strokeStyle = "rgba(255,255,255," + opacity + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function mouseout() {
  mouse.x = undefined;
  mouse.y = undefined;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 4;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 25 + 5;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let directionX = forceDirectionX * force * this.speed;
    let directionY = forceDirectionY * force * this.speed;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

init();
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
