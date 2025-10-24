let D = x => {
  return new Decimal(x);
};

var game = {
  money: D(0),
  money_per_click: D(1),
  miniInfinityCost: D(308),
  upgrade1Cost: D(10000),
  upgrade2Cost: D(200000),
  multiplier: D(1),
  miniInfinityGain: D(1)
};
var defaultGame = { ...game };
function getMoney() {
  game.money = game.money.plus(game.money_per_click.times(game.multiplier));
  updateText();
}

function updateText() {
  document.getElementById("text").innerHTML = "<text>You have $" + game.money;
  document.getElementById("upgrade1Button").innerHTML =
    "Multiply progress by 2 for $" + game.upgrade1Cost;
  document.getElementById("upgrade2Button").innerHTML =
    "Quintuple the mini-infinity gain for $" + game.upgrade2Cost;
}

function reset() {
  game = defaultGame;
  updateText();
}

function mini_inf() {
  if (game.money.gte(game.miniInfinityCost)) {
    game.money = D(0);
    game.money_per_click = game.money_per_click.add(game.miniInfinityGain);
    document.getElementById("text").innerHTML = "<text>You have $" + game.money;
  }
}

function upgrade1() {
  if (game.money.gte(game.upgrade1Cost)) {
    game.money = game.money.minus(game.upgrade1Cost);
    game.multiplier = game.multiplier.mul(2);
    game.upgrade1Cost = game.upgrade1Cost.pow(1.3);
    game.upgrade1Cost = game.upgrade1Cost.ceil();
    updateText();
  }
}

function upgrade2() {
  if (game.money.gte(game.upgrade2Cost)) {
    game.money = game.money.minus(game.upgrade2Cost);
    game.miniInfinityGain = game.miniInfinityGain.mul(5);
    game.upgrade2Cost = game.upgrade2Cost.pow(1.6);
    game.upgrade2Cost = game.upgrade2Cost.ceil();
    updateText();
  }
}

function init() {
  load();
  setInterval(loop, 50);
}

init();

function loop() {
  save();
}

function save() {
  // var saveThing=confirm("Would you like to save your game?")
  // if (saveThing == true) {
  let str = btoa(JSON.stringify(game));
  localStorage.setItem("tbsave", str);
  // }
}

function load() {
  let obj = JSON.parse(atob(localStorage.getItem("tbsave")));
  if (!obj) return false;
  game.money = D(obj.money);
  game.money_per_click = D(obj.money_per_click);
  game.miniInfinityCost = D(obj.miniInfinityCost);
  game.multiplier = D(obj.multiplier);
  game.upgrade1Cost = D(obj.upgrade1Cost);
  updateText();
  return true;
}
