let D = x => {
  return new Decimal(x); //Ignore the error, Glitch just doesn't like us. (You could say it's a glitch with Glitch, haha comedy) not funny at all
};

var Dc = Decimal; //just so i dont need to write Decimal.function() every time I need to do an operation

var game = {
  stars: D(0),
  starPowder: D(0)
}

var progress = 0;
function queueCreate() {
  if (progress == 0) {
    progress = 1;
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        game.stars = game.stars.plus(1);
        document.getElementById("starDisplay").innerHTML = "You have " + game.stars + " star(s)."
        clearInterval(id);
        progress = progress % 100;
        progress = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}

var progress1 = 0;
function queuePulverise() {
  if (game.stars.gte(10)) {
  if (progress1 == 0) {
    game.stars = game.stars.minus(10)
    document.getElementById("starDisplay").innerHTML = "You have " + game.stars + " star(s)."
    progress1 = 1;
    var elem1 = document.getElementById("myBar1");
    var width1 = 0;
    var id1 = setInterval(frame1, 40);
    function frame1() {
      if (width1 >= 100) {
        game.starPowder = game.starPowder.plus(1);
        document.getElementById("starPowderDisplay").innerHTML = "You have " + game.starPowder + " star powder."
        clearInterval(id1);
        progress1 = progress1 % 100;
        progress1 = 0;
      } else {
        width1++;
        elem1.style.width1 = width1 + "%";
        elem1.innerHTML = width1 + "%";
      }
    }
  }
}
}

function queueConversion() {
  if (game.stars.gte(25) && game.starPowder.gte(1)) {
  if (progress2 == 0) {
    document.getElementById("starmachine").innerHTML = "<h1>Starmachine</h1><p>Starmachine here. How may I help you?</p>" + document.getElementById("myBar2")
    progress2 = 1;
    var elem2 = document.getElementById("myBar2");
    var width1 = 0;
    var id2 = setInterval(frame2, 40);
    function frame2() {
      if (width2 >= 100) {
        game.starPowder = game.starPowder.plus(1);
        document.getElementById("starPowderDisplay").innerHTML = "You have " + game.starPowder + " star powder."
        clearInterval(id1);
        progress1 = progress1 % 100;
        progress1 = 0;
      } else {
        width1++;
        elem1.style.width1 = width1 + "%";
        elem1.innerHTML = width1 + "%";
      }
    }
  }
}}