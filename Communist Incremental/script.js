const ExpantaNum = OmegaNum
var game = {
  location: "world",
  potatoes: ExpantaNum(0),
  multimultipeople: ExpantaNum(1),
  mult: ExpantaNum(1),
  multmult: ExpantaNum(1),
  multmultmult: ExpantaNum(1),
  multithreepeople: ExpantaNum(1),
  multifourpeople: ExpantaNum(0),
  multifivepeople: ExpantaNum(1),
  carrots: ExpantaNum(0),
  beetroots: ExpantaNum(0),
  aarexpoints: ExpantaNum(1),
  aarexesripped: ExpantaNum(0),
  ascension: {
    AP: ExpantaNum(0),
    times: 0,
    potatoWorlds: 0,
    upgrades: {}
  },
  //potatoStorageFacilities: ExpantaNum(0)
  //carrots : ExpantaNum(0)
  //carrots = prestige resource
  automation: {
    multiplier: {
      one: {
        bought: false,
        active: false
      },
      two: {
        bought: false,
        active: false
      },
      three: {
        bought: false,
        active: false
      },
      four: {
        bought: false,
        active: false
      },
      five: {
        bought: false,
        active: false
      }
    },
    mini_prestige: {
      infinity: {
        bought: false,
        active: false
      },
      meta_infinity: {
        bought: false,
        active: false
      },
      ripaarex: {
        bought: false,
        active: false
      }
    }
  }
}; //we really need autoclickers

function farmPotatoes() {
  game.potatoes = game.potatoes.add(game.mult);
  showpotatoes();
}
function multiplier() {
  //you misspelled multiplayer
  if (game.potatoes.gte(10)) {
    let bulk = ExpantaNum.floor(game.potatoes.div(10));
    game.potatoes = game.potatoes.sub(ExpantaNum(10).mul(bulk));
    game.mult = game.mult.add(
      game.multmult
        .times(bulk)
        .times(game.multimultipeople.add(1))
        .tetr(game.aarexpoints)
    );
    showpotatoes();
    //not sure if >= is in expantanum
    // or do we have >= ?
    // currently you need at least 11 potatoes to buy this even though it costs 10s
    //dang
    //fixed
  }
}

function multimultiplier() {
  if (game.potatoes.gt(1e8)) {
    game.multimultipeople = game.multimultipeople.add(
      game.multithreepeople
        .pow(game.carrots.add(1))
        .times(game.potatoes.div(1e8).add(1))
        .tetr(game.aarexpoints)
        .round()
    );
    game.potatoes = ExpantaNum(0);
    showpotatoes();
  }
}

//I'm gonna copy the multimultiplier to get a multimultimultiplier -- moooosey

function multimultimultiplier() {
  if (game.potatoes.gt("1e1000")) {
    game.multithreepeople = game.multithreepeople.add(
      game.beetroots
        .add(1)
        .pow(game.multifourpeople)
        .times(game.potatoes.div("1e1000"))
        .tetr(game.aarexpoints)
        .round()
    );
    game.potatoes = ExpantaNum(0);
    showpotatoes();
  }
}

function multimultimultimultiplier() {
  if (game.potatoes.gt("ee10")) {
    game.multifourpeople = game.multifourpeople.add(
      game.potatoes
        .div("ee10")
        .times(game.multifivepeople)
        .tetr(game.aarexpoints)
        .round()
    );
    game.potatoes = ExpantaNum(0);
    showpotatoes();
  }
}

function multimultimultimultimultiplier() {
  if (game.potatoes.gt("ee10000")) {
    game.multifivepeople = game.multifivepeople.add(
      game.potatoes
        .div("ee10000")
        .tetr(game.aarexpoints)
        .round()
    );
    game.potatoes = ExpantaNum(0);
    showpotatoes();
  }
}
//unfortunately I'm not very good at coding so I don't know how to implement it very well
//at least I got a useless button into the game

function infinity() {
  if (game.potatoes.gt(ExpantaNum(Number.MAX_VALUE))) {
    game.carrots = game.carrots
      .add(game.potatoes.log10().tetr(game.aarexpoints))
      .round();
    game.potatoes = ExpantaNum(0);
    document.getElementById("newline").innerHTML += "communism" + "<br>";
    showpotatoes();
    showcarrots();
  }
}

function metainfinity() {
  if (game.carrots.gt(ExpantaNum("ee10"))) {
    game.beetroots = game.beetroots
      .add(
        game.carrots
          .log10()
          .log10()
          .log10()
      )
      .tetr(game.aarexpoints)
      .ceil();
    game.potatoes = ExpantaNum(0);
    game.carrots = ExpantaNum(0);
    document.getElementById("newline").innerHTML = document
      .getElementById("newline")
      .innerHTML.split("<br>communism")
      .join("");
    document.getElementById("newline").innerHTML += "metacommunism" + "<br>";
    showpotatoes();
    showcarrots();
    showbeetroots();
  }
}

function ripaarex() {
  if (game.beetroots.gt(ExpantaNum("10^^10"))) {
    game.aarexpoints = game.aarexpoints.add(
      game.beetroots
        .slog()
        .sub(10)
        .max(10)
        .log()
        .floor()
        .min(game.aarexesripped.gte(100) ? ExpantaNum(Infinity) : 1)
    );
    (game.potatoes = ExpantaNum(0)),
      (game.multimultipeople = ExpantaNum(1)),
      (game.mult = ExpantaNum(1)),
      (game.multmult = ExpantaNum(1)),
      (game.multmultmult = ExpantaNum(1)),
      (game.multithreepeople = ExpantaNum(1)),
      (game.carrots = ExpantaNum(0)),
      (game.beetroots = ExpantaNum(0));

    game.aarexesripped = game.aarexesripped.add(1);
    showpotatoes();
    showcarrots();
    showbeetroots();
    showprestige();
  }
}
//Gain more aarex points based on beetroot

//I'm going to set up for meta2infinity --moooosey
/*function meta2infinity() {
  if (game.beetroots.gt(ExpantaNum("(10^)^50 1"))) {
    game.potatoStorageFacilities = game.potatoStorageFacilities.add(game.beetroots.slog()).round()
    game.beetroots = ExpantaNum(0)
    game.potatoes = ExpantaNum(0)
    game.carrots = ExpantaNum(0)
    document.getElementById('newline').innerHTML += "communismception" + '<br>';
    showpotatoes()
    showcarrots()
    showbeetroots()
    showPSFs()
  }
}*/
function showpotatoes() {
  document.getElementById("display").innerHTML = "Potatoes: " + game.potatoes;
  document.getElementById("multi1").innerHTML = "Multiplier: " + game.mult;
  document.getElementById("multi2").innerHTML =
    "Multi-multiplier: " + game.multimultipeople;
  document.getElementById("multi3").innerHTML =
    "Multi-multi-multiplier: " + game.multithreepeople;
}
function showcarrots() {
  document.getElementById("display2").innerHTML = "Carrots: " + game.carrots;
}

function showbeetroots() {
  document.getElementById("display3").innerHTML =
    "Beetroots: " + game.beetroots;
}
function showprestige() {
  document.getElementById("prestige1").innerHTML =
    "Aarexes Ripped: " + game.aarexpoints;
}
//ya boi crimson is here to tell you this is gonna die in a day
//ya boi not crimson(!crimson) is here to tell you this is not gonna die in a day
//Nah, it'll die in two days. - NGC Man.
//ya boi crimson is here to tell you he's suprised it's not dead yet
//ya boi crimson is here to tell you it's dead now
//This is moooosey. It has undied, because I added more
//okay so also I kinda temporarily screwed up the game with multithree
//also many thanks for helping - moooosey
//np, just a comma was missing

function playMusic() {
  document.getElementById("music").play();
}

let auto = 0; //Thanks to whoever added this. - NGC Man.
let x = 0;
window.setInterval(function() {
  if (auto == 1) {
    x++;
    if (x >= 8) x = 0;
    if (x == 0 || game.automation.multiplier.one.active) multiplier();
    if (x == 1 || game.automation.multiplier.two.active) multimultiplier();
    if (x == 2 || game.automation.multiplier.three.active)
      multimultimultiplier();
    if (x == 3 || game.automation.multiplier.four.active)
      multimultimultimultiplier();
    if (x == 4 || game.automation.multiplier.five.active)
      multimultimultimultimultiplier();
    if (x == 5 || game.automation.mini_prestige.infinity.active) infinity();
    if (x == 6 || game.automation.mini_prestige.meta_infinity.active)
      metainfinity();
    if (x == 7 || game.automation.mini_prestige.ripaarex.active) ripaarex();
    farmPotatoes();
  }
  playMusic();
}, 50);
function hide(id) {
  document.getElementById(id).classList.add("invisible")
}
function show(id) {
  document.getElementById(id).classList.remove("invisible")
}
function switchGameTab(tab) {
  switch (tab) {
    case "game":
      show("game");
      hide("automation");
      hide("aarexMilestones");
      break;
    case "automation":
      show("automation");
      hide("game");
      hide("aarexMilestones");
      break;
    case "aarexMilestones":
      show("aarexMilestones");
      hide("game");
      hide("automation");
      break;
    default:
      break;
  }
} // AAAAAAAAAA WHY DO TABS NOT WORK
//you need default case dont you

switchGameTab("game");
setInterval(() => {
  save();
  console.log("savecommunism");
}, 10000);

function hardreset() {
  (game.potatoes = ExpantaNum(0)),
    (game.multimultipeople = ExpantaNum(1)),
    (game.mult = ExpantaNum(1)),
    (game.multmult = ExpantaNum(1)),
    (game.multmultmult = ExpantaNum(1)),
    (game.multithreepeople = ExpantaNum(1)),
    (game.multifourpeople = ExpantaNum(0)),
    (game.multifivepeople = ExpantaNum(1)),
    (game.carrots = ExpantaNum(0)),
    (game.beetroots = ExpantaNum(0)),
    (game.aarexpoints = ExpantaNum(1));

  farmPotatoes();
}
