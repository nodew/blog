(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// polyfill for `requestAnimationFrame`
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

var Circle =
/*#__PURE__*/
function () {
  function Circle(ctx, pos, radius) {
    _classCallCheck(this, Circle);

    this.ctx = ctx;
    this.pos = pos;
    this.radius = radius;
    this.active = 1;
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      if (!this.active) {
        return;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = "rgba(95,205,255,".concat(this.active, ")");
      this.ctx.fill();
    }
  }]);

  return Circle;
}();

var Point =
/*#__PURE__*/
function () {
  function Point(ctx, x, y) {
    _classCallCheck(this, Point);

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.active = 1;
    this.setCircle();
  }

  _createClass(Point, [{
    key: "shift",
    value: function shift() {
      var ox = this.originX - 50 + Math.random() * 50;
      var oy = this.originY - 50 + Math.random() * 50;
      this.x = ox;
      this.y = oy;
    }
  }, {
    key: "setClosest",
    value: function setClosest(closest) {
      this.closest = closest;
    }
  }, {
    key: "setCircle",
    value: function setCircle() {
      var c = new Circle(this.ctx, this, 2 + Math.random() * 2);
      this.circle = c;
    }
  }, {
    key: "drawLines",
    value: function drawLines() {
      var _this = this;

      if (!this.active) return;
      this.closest.forEach(function (p) {
        _this.ctx.beginPath();

        _this.ctx.moveTo(_this.x, _this.y);

        _this.ctx.lineTo(p.x, p.y);

        _this.ctx.strokeStyle = "rgba(95,205,255,".concat(_this.active, ")");

        _this.ctx.stroke();
      });
    }
  }]);

  return Point;
}();

var Background =
/*#__PURE__*/
function () {
  function Background(canvas) {
    _classCallCheck(this, Background);

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

  _createClass(Background, [{
    key: "genPoints",
    value: function genPoints() {
      var ox = this.width / 30;
      var oy = this.height / 30;

      for (var x = 0; x < this.width; x = x + ox) {
        for (var y = 0; y < this.height; y = y + oy) {
          var px = x + Math.random() * ox;
          var py = y + Math.random() * oy;
          var p = new Point(this.ctx, px, py);
          this.points.push(p);
        }
      }
    }
  }, {
    key: "getClosest",
    value: function getClosest() {
      for (var i = 0; i < this.points.length; i++) {
        var closest = [];
        var p1 = this.points[i];

        for (var j = 0; j < this.points.length; j++) {
          var p2 = this.points[j];

          if (!(p1 === p2)) {
            var placed = false;

            for (var k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (var _k = 0; _k < 5; _k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[_k])) {
                  closest[_k] = p2;
                  placed = true;
                }
              }
            }
          }
        }

        p1.setClosest(closest);
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      this.ctx.clearRect(0, 0, this.width, this.height);
      this.points.forEach(function (point) {
        if (Math.abs(getDistance(_this2.target, point)) < 4000) {
          point.active = 0.3;
          point.circle.active = 0.6;
        } else if (Math.abs(getDistance(_this2.target, point)) < 20000) {
          point.active = 0.1;
          point.circle.active = 0.3;
        } else if (Math.abs(getDistance(_this2.target, point)) < 40000) {
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
  }]);

  return Background;
}();

window.onload = function () {
  var canvas = document.querySelector('#background');
  var bg = new Background(canvas);

  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }

    window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
    var posx = 0;
    var posy = 0;
    var target = bg.target;

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
    var width = window.innerWidth;
    var height = window.innerHeight;
    bg.canvas.width = width;
    bg.canvas.height = height;
    bg.width = width;
    bg.height = height;
  } // animation


  function initAnimation() {
    bg.animate();

    for (var i in bg.points) {
      bg.points[i].shift();
    }
  } // for lower cpu usage, this function should be disabled
  // function animate() {
  //   bg.animate();
  //   requestAnimationFrame(animate);
  // }


  addListeners();
  initAnimation();
};

},{}]},{},[1]);
