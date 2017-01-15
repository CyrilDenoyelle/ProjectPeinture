$(document).ready(function() {
  var incr;
  var incrcolor;
  arcenciel = ['#fe0000', '#f0cd44', '#fafa42', '#00cd34', '#00ccff', '#3332cb', '#9e15f9']
  var x, y, lastX, lastY, data;
  var c, x1, y1, x2, y2, rayon, init, pinceau, straight;
  var outil = "straight";
  var canvasE = document.getElementById("paper");
  c = canvasE.getContext('2d');

  function init() {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvasE.width, canvasE.height);
  }
  init();
  $('#paper').mousemove(function(event) {
    var textX = event.pageX - 11;
    var textY = event.pageY - 11;
    $("span").text("X: " + textX + ", Y: " + textY);
  });

  function initDraw(e, tool) {
    if (tool == "square") {
      square();
    } else if (tool == "pinceau") {
      paInt();
    } else if (tool == 'cercle') {
      cercle();
    } else if (tool == 'straight') {
      straight();
    } else {
      return false;
    }
  }
  $('.outil').click(function(e) {
    tool = $(this).attr('id');
    $("#paper").mousedown(function(e) {
      X = e.pageX - $(this).offset().left;
      Y = e.pageY - $(this).offset().top;
      z = true;
      $(this).mousemove(function(e) {
        duringX = e.pageX - 11;
        duringY = e.pageY - 11;

        initDraw(e, tool);
        prevX = e.pageX - 11;
        prevY = e.pageY - 11;
        $("#paper").mouseup(function(e) {
          lastX = e.pageX - 11;
          lastY = e.pageY - 11;
          z = false;
          $(this).unbind('mousemove');
        });
        $('#paper').mouseleave(function() {
          z = false;
          lastX = e.pageX - 11;
          lastY = e.pageY - 11;

          $(this).unbind('mousemove');
        });

      });
    });
    if (tool == "clear") {
      init();
    }
  });

  function paInt() {
    if (z) {
      if (incr < 280) {
        incr++;
        incrcolor = parseInt(incr / 40);
      } else {
        incr = 0;
      }
      if ($(':checkbox').is(':checked')) {
        color = arcenciel[Math.floor(incrcolor)]
      } else {
        color = $('#strokecolor').val();
      }
      c.beginPath();
      c.strokeStyle = color;
      c.lineWidth = $('#paintwidth').val();
      c.lineJoin = "round";
      c.moveTo(prevX, prevY);
      c.lineTo(duringX, duringY);
      c.closePath();
      c.stroke();
    }
  }

  function straight() {
    if (z) {
      //if (incr < 70) {
        //incr++;
        //incrcolor = parseInt(incr / 10);
      //} else {
        //incr = 0;
      //}
      if (incr < 10) {
        incr++;
      } else {
        incr = 0;
        incrcolor = parseInt(Math.random() * 7);
      }
      if ($(':checkbox').is(':checked')) {
        color = arcenciel[Math.floor(incrcolor)]
      } else {
        color = $('#strokecolor').val();
      }
      c.beginPath();
      c.lineWidth = $('#paintwidth').val();
      c.strokeStyle = color;
      c.lineJoin = "round";
      c.moveTo(lastX,lastY);
      
      c.lineTo(duringX, duringY);
      c.closePath();
      c.stroke();
    }
  }

  function cercle() {
    if (z) {
      if (incr < 70) {
        incr++;
        incrcolor = parseInt(incr / 10);
      } else {
        incr = 0;
      }
      if ($(':checkbox').is(':checked')) {
        color = arcenciel[Math.floor(incrcolor)]
      } else {
        color = $('#strokecolor').val();
      }
      c.strokeStyle = color;
      c.lineWidth = $('#paintwidth').val();
      c.beginPath();
      rayon = Math.sqrt(Math.pow(duringX - X, 2) + Math.pow(duringY - Y, 2));
      c.arc(X, Y, rayon, 0, Math.PI * 2, false);
      c.stroke();
    }
  }

  function square() {
    if (z) {
      if (incr < 70) {
        incr++;
        incrcolor = parseInt(incr / 10);
      } else {
        incr = 0;
      }
      if ($(':checkbox').is(':checked')) {
        color = arcenciel[Math.floor(incrcolor)]
      } else {
        color = $('#strokecolor').val();
      }
      c.beginPath();
      c.strokeStyle = color;
      c.lineWidth = $('#paintwidth').val();
      c.lineJoin = "round";

      c.strokeRect(X, Y, duringX - X, duringY - Y);
      c.closePath();
      c.stroke();
    }
  }

});

  /*
  function cercle() {
    if (z) {
      c.fillStyle = $('#fillcolor').val();
      c.beginPath();
      rayon = Math.sqrt(Math.pow(duringX - X, 2) + Math.pow(duringY - Y, 2));
      c.arc(X, Y, rayon, 0, Math.PI * 2, false);
      c.fill();
    }
  }
  function straight() {
    if (z) {
      c.beginPath();
      c.lineWidth = $('#paintwidth').val();
      c.strokeStyle = $('#strokecolor').val();
      c.lineJoin = "round";
      c.moveTo(X, Y);
    }
    c.lineTo(lastX, lastY);
    c.closePath();
    c.stroke();
  }
  function square() {
    if (z) {
      c.beginPath();
      c.fillStyle = $('#fillcolor').val();
      c.fillRect(X, Y, duringX - X, duringY - Y);
      c.closePath();
      c.stroke();
    }
  }

  function paInt() {
    if (z) {
      c.beginPath();
      c.strokeStyle = $('#strokecolor').val();
      c.lineWidth = $('#paintwidth').val();
      c.lineJoin = "round";
      c.moveTo(prevX, prevY);
      c.lineTo(duringX, duringY);
      c.closePath();
      c.stroke();
    }
  }
  
});

*/