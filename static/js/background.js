// polyfill for `requestAnimationFrame`
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
}());

function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

class Circle {
  constructor(ctx, pos, radius) {
    this.ctx = ctx;
    this.pos = pos;
    this.radius = radius;
    this.active = 1;
  }

  draw () {
    if (!this.active) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(95,205,255,${this.active})`;
    this.ctx.fill();
  }
}

class Point {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.active = 1;
    this.setCircle();
  }

  shift() {
    const ox = this.originX - 50 + Math.random() * 50;
    const oy = this.originY - 50 + Math.random() * 50;
    this.x = ox;
    this.y = oy;
  }

  setClosest(closest) {
    this.closest = closest;
  }

  setCircle() {
    const c = new Circle(this.ctx, this, 2 + Math.random() * 2);
    this.circle = c;
  }

  drawLines() {
    if (!this.active) return;
    this.closest.forEach(p => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = `rgba(95,205,255,${this.active})`;
      this.ctx.stroke();
    });
  }
}

class Background {
  constructor(canvas) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.target = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.points = [];
    this.genPoints();
    this.getClosest();
  }

  genPoints() {
    const ox = this.width / 30;
    const oy = this.height / 30;
    for (let x = 0; x < this.width; x = x + ox) {
      for (let y = 0; y < this.height; y = y + oy) {
        const px = x + Math.random() * ox;
        const py = y + Math.random() * oy;
        const p = new Point(this.ctx, px, py);
        this.points.push(p);
      }
    }
  }

  getClosest() {
    for (let i = 0; i < this.points.length; i++) {
      const closest = [];
      const p1 = this.points[i];

      for (let j = 0; j < this.points.length; j++) {
        const p2 = this.points[j];

        if (!(p1 === p2)) {
          let placed = false;

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.setClosest(closest);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.points.forEach((point) => {
      if (Math.abs(getDistance(this.target, point)) < 4000) {
        point.active = 0.3;
        point.circle.active = 0.6;
      } else if (Math.abs(getDistance(this.target, point)) < 20000) {
        point.active = 0.1;
        point.circle.active = 0.3;
      } else if (Math.abs(getDistance(this.target, point)) < 40000) {
        point.active = 0.02;
        point.circle.active = 0.1;
      } else {
        point.active = 0;
        point.circle.active = 0;
      }

      point.drawLines();
      point.circle.draw();
    });
  }
}

window.onload = function() {
  const canvas = document.querySelector('#background');
  const bg = new Background(canvas);
  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }

    window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
    let posx = 0;
    let posy = 0;
    let target = bg.target;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
    bg.target = target;
    bg.animate();
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    bg.canvas.width = width;
    bg.canvas.height = height;
    bg.width = width;
    bg.height = height;
  }

  // animation
  function initAnimation() {
    bg.animate();
    for (var i in bg.points) {
      bg.points[i].shift();
    }
  }

  // for lower cpu usage, this function should be disabled
  // function animate() {
  //   bg.animate();
  //   requestAnimationFrame(animate);
  // }

  addListeners();
  initAnimation();
}
