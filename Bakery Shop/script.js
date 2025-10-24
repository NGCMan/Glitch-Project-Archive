let D = x => {
  return new Decimal(x);
};

var Dc = Decimal;

var gameLoop = setInterval(gameTimer, 100)

var game = {
money: D(0),
moneyCooldown: 0,
bread: D(0),
breadCost: D(10)
}

function PrintMoney() {
  if (game.moneyCooldown == 0) {
  game.money = game.money.add(1)
  document.getElementById("display").innerHTML = "Money: " + game.money
  game.moneyCooldown = Math.round(game.moneyCooldown)
  game.moneyCooldown += 5
  }
}

function gameTimer() {
  if (game.moneyCooldown >= 0.1) {
  game.moneyCooldown -= 0.1
  game.moneyCooldown = game.moneyCooldown.toFixed(1)
  }
document.getElementById("moneyCooldownDisplay").innerHTML = "Cooldown: " + game.moneyCooldown + "s"
  }