var x, y, paint, lastX, lastY, outil, data, c, paintwidth, paintcolor;
$("button").click(function() {
  outil = $(this).attr(data);
  console.log(outil);
});

/*$('input').on('keyup', function(e) {
    $(this).attr('data') = $(this).val();
    $(this).attr('data') = $(this).val();
});*/

/*$('.outil').click(function(){
alert(paintwidth + " " +paintcolor)
})*/

var canvasE = document.getElementById("paper");
c = canvasE.getContext('2d');
c.fillStyle = "white";
c.fillRect(0, 0, canvasE.width, canvasE.height);

$('#paper').mousemove(function(E) { //on select paper, et application de mousemove pour capter la position de la souris
  x = E.pageX - 11; //on utilise .pageX sur la variable de l'attribut de mousemove pour récupérer les coordonnées en X
  y = E.pageY - 11; // et ici pareil pour les coordonées en Y
  $("span").text("X: " + x + ", Y: " + y); // ici on les affiche dans un span
});

function downUpLeav() {
  $("#paper").mousedown(function() {
    paint = true;
  });
  $('#paper').mouseup(function() { //si on vise document c'est le bug marrant
    paint = false;
  });
  $('#paper').mouseleave(function() { //pareil pour le doc
    paint = false;
  });
}

function paInt() {
  downUpLeav();
  $('#paper').mousemove(function() { //quand on bouge on applique ça
    if (paint) {
      c.beginPath();
      c.strokeStyle = $('#paintcolor').val();
      c.lineWidth = $('#paintwidth').val();
      c.lineJoin = "round";
      c.moveTo(lastX, lastY);
      c.lineTo(x, y);
      c.closePath();
      c.stroke();
    }
    lastX = x;
    lastY = y;
  });
}

function square() {
  downUpLeav();
  var x1, y1, x2, y2;
  $("#paper").mousedown(function() {
    x1 = x;
    y1 = y;
  });
  $('#paper').mouseup(function() {
    x2 = x;
    y2 = y;
    c.beginPath();
    c.beginPath();
    c.fillStyle = $('#paintcolor').val(); // 1 petit carré
    c.fillRect(x1, y1, x2 - x1, y2 - y1);
  });
}
paInt();
square();
