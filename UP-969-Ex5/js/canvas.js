"use strict";

function GaugeCanvas(value, name)
{
    this.canvas = document.createElement("canvas");

    this.canvas.setAttribute("class", "myCanvas");
    this.canvas.gauge = this;

    this.value = value;

    this.name = name;

    this.draw();

    //window.addEventListener("resize", ()=>{this.draw();})
}


GaugeCanvas.prototype.draw = function() {

  var value = this.value;
  var name = this.name;

  // document.getElementById("button-monitor").style.display = "none";
  // document.getElementById("button-gauge").style.display = "none";
  var c = this.canvas;
  c.width = window.innerWidth / 7;
  c.height = window.innerHeight / 7;
  c.style.width = c.width + "px";
  c.style.height = c.height + "px";

  var ctx = c.getContext("2d");

  function arcLineGrey() {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 15;
    ctx.strokeStyle = "#e9ecf1";
    // First Major arc
    var myRadius = c.height;
    ctx.arc(
      c.width / 2.0,
      c.height / 1.1,
      myRadius / 1.3,
      -1 * Math.PI,
      0 * Math.PI
    );
    ctx.stroke();
  }

  function arcLineGradient(value, name) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 15;
    // Get gradient
    var my_gradient = ctx.createLinearGradient(0, 0, 700, 0);
    my_gradient.addColorStop(0, "#51FF00");
    my_gradient.addColorStop(0.4, "#FFFE00");
    my_gradient.addColorStop(0.5, "#FFBB00");
    my_gradient.addColorStop(0.6, "#FF5200");
    my_gradient.addColorStop(1, "#FF0000");
    ctx.strokeStyle = my_gradient;
    var myRadius = c.height;
    // First Major arc
    ctx.arc(
      c.width / 2.0,
      c.height / 1.1,
      myRadius / 1.3,
      -1 * Math.PI,
      -(1 - (value/100)) * Math.PI
    );
    ctx.stroke();
    if (value >= 0.1) {
      if (value == 1) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(value, c.width / 2.5, c.height / 1.1);
        ctx.font = "10px Arial";
        ctx.fillText("%", c.width, c.heigh);
      } else {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(value, c.width / 2.4, c.height /2);
        ctx.font = "15px Arial";
        ctx.fillText("%",  c.width / 1.75, c.height /2);
      }
    } else {
      ctx.font = "30px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(value, c.width / 2.4, c.height /2);
      ctx.font = "15px Arial";
      ctx.fillText("%", c.width, c.height);
    }
    if (name) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(name, c.width / 2.9, c.height / 1.2);
    }
  }

  function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = ctx.lineWidth + 3;
    this.draw = function(value) {
      arcLineGrey();
      arcLineGradient(value, name);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.stroke();
    };
  }

  function drawGraph(value) {
    ctx.clearRect(0, 0, c.width, c.height);
    var myRadius = c.height / 1.3;
    var gaugeRadius = myRadius;
    var angle = ((value/100) - 1 / 2) * Math.PI;
    var x = gaugeRadius * Math.sin(angle) + c.width / 2.0;
    var y = gaugeRadius * Math.cos(Math.PI - angle) + c.height / 1.1;
    var circle = new Circle(x, y);
    circle.draw(value);
  }


  var v = 0;

  function animate() {
    drawGraph(v);

    if (v < value) {
      v += 1;
      setTimeout(animate, 2);
    }
  }

  animate();

  return c;
}

// function clearGauge(value, name, x, y, radius) {
//     ctx.beginPath();
//     ctx.lineCap = "round";
//     ctx.lineWidth = 1;
//     // Get gradient
//     var my_gradient = ctx.createLinearGradient(0, 0, 700, 0);
//     my_gradient.addColorStop(0, "#51FF00");
//     my_gradient.addColorStop(0.4 ,"#FFFE00");
//     my_gradient.addColorStop(0.5, "#FFBB00");
//     my_gradient.addColorStop(0.6, "#FF5200");
//     my_gradient.addColorStop(1, "#FF0000");
//     ctx.fillStyle = my_gradient;
//     ctx.strokeStyle = 'rgba(255,255,255,0)'

//     // First Major arc
//     console.log("myX",x)
//     console.log("myY", y)

//     ctx.arc(300, 291, 200, -1 * Math.PI , 0 * Math.PI);
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     //  Second Minor arc
//     ctx.beginPath();
//     ctx.lineCap = "round";
//     ctx.lineWidth = 1;
//     ctx.fillStyle = 'rgba(255,255,255,1)'
//     ctx.strokeStyle = 'rgba(255,255,255,0)'
//     ctx.arc(300, 300, 150, -1.02 * Math.PI , 0.02* Math.PI);
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     // Left Mini arc
//     ctx.beginPath();
//     ctx.arc(125, 297, 25, 0 * Math.PI , 2* Math.PI);
//     ctx.moveTo(500, 300);
//     ctx.fillStyle = my_gradient;
//     ctx.stroke();
//     ctx.fill();

//     // Right Mini arc
//     ctx.beginPath();
//     ctx.arc(475, 295, 25, 0 * Math.PI , 2 * Math.PI);
//     ctx.fillStyle = my_gradient;
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     // fillGrey();

//     // #e9ecf1 GRAY GRADIENT
//     if (value > 0.1) {
//         ctx.font = "55px Arial";
//         ctx.fillStyle = "black";
//         ctx.fillText(Math.ceil(value*100), 262, 245);
//         ctx.font = "25px Arial";
//         ctx.fillText("%", 330, 245);
//     } else  {
//         ctx.font = "55px Arial";
//         ctx.fillStyle = "black";
//         ctx.fillText(Math.ceil(value*100), 283, 245);
//         ctx.font = "25px Arial";
//         ctx.fillText("%", 320, 245);
//     }

//     if (name) {
//         ctx.font = "35px Arial";
//         ctx.fillStyle = "black";
//         ctx.fillText(name, 245, 305);
//     }
// }

// function fillGrey(value, name) {
//     // Grey background on Major arc
//     ctx.beginPath();
//     ctx.fillStyle = "#e9ecf1";
//     ctx.strokeStyle = 'rgba(255,255,255,0)'
//     ctx.arc(300, 291, 200, -1 * Math.PI , 0 * Math.PI);
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     // White background on Minor arc (outside)
//     ctx.beginPath();
//     ctx.lineCap = "round";
//     ctx.lineWidth = 1;
//     ctx.fillStyle = 'rgba(255,255,255,1)'
//     ctx.strokeStyle = 'rgba(255,255,255,0)'
//     ctx.arc(300, 300, 150, -1.02 * Math.PI , 0.02* Math.PI);
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     // Grey Background on left mini Arc
//     ctx.beginPath();
//     ctx.arc(125, 298, 25, 0 * Math.PI , 2* Math.PI);
//     ctx.moveTo(500, 300);
//     ctx.fillStyle = "#e9ecf1";
//     ctx.stroke();
//     ctx.fill();

//     // Grey Background on right mini Arc
//     ctx.beginPath();
//     ctx.fillStyle = "#e9ecf1";
//     ctx.strokeStyle = 'rgba(255,255,255,0)'
//     ctx.arc(475, 296, 25, 0 * Math.PI , 2 * Math.PI);
//     ctx.moveTo(150, 300);
//     ctx.stroke();
//     ctx.fill();

//     // if (value > 0.1) {
//     //     ctx.font = "55px Arial";
//     //     ctx.fillStyle = "black";
//     //     ctx.fillText(Math.ceil(value*100), 262, 245);
//     //     ctx.font = "25px Arial";
//     //     ctx.fillText("%", 330, 245);
//     // } else  {
//     //     ctx.font = "55px Arial";
//     //     ctx.fillStyle = "black";
//     //     ctx.fillText(Math.ceil(value*100), 283, 245);
//     //     ctx.font = "25px Arial";
//     //     ctx.fillText("%", 320, 245);
//     // }

//     // if (name) {
//     //     ctx.font = "35px Arial";
//     //     ctx.fillStyle = "black";
//     //     ctx.fillText(name, 245, 305);
//     // }
// }
