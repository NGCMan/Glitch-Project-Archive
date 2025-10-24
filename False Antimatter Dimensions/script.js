let D = x => {
  return new Decimal(x);
};

var Dc = Decimal;

var game = {
  antimatter: D(10),
  dimensionAmounts: [NaN,D(0),D(0),D(0),D(0)],
  dimensionsBought: [NaN,D(0),D(0),D(0),D(0)],
  dimensionMultipliers: [NaN,D(1),D(1),D(1),D(1)],
  dimensionCosts: [NaN,D(10),D(100),D(10000),D(1000000)]
}

function buyFirstDimension() {
  if (game.antimatter.greaterThanOrEqualTo(game.dimensionCosts[1])) {
  game.dimensionAmounts[1] = game.dimensionAmounts[1].add(1)
  game.dimensionsBought[1] = game.dimensionsBought[1].add(1)
  game.antimatter = game.antimatter.minus(game.dimensionCosts[1])
  if (game.dimensionsBought[1] % 10 == 0) {
    game.dimensionCosts[1] = game.dimensionCosts[1].mul(1e3)
    game.dimensionMultipliers[1] = game.dimensionMultipliers[1].mul(2)
  }
}
}

function buySecondDimension() {
  if (game.antimatter.greaterThanOrEqualTo(game.dimensionCosts[2])) {
  game.dimensionAmounts[2] = game.dimensionAmounts[2].add(1)
  game.dimensionsBought[2] = game.dimensionsBought[2].add(1)
  game.antimatter = game.antimatter.minus(game.dimensionCosts[2])
  if (game.dimensionsBought[2] % 10 == 0) {
    game.dimensionCosts[2] = game.dimensionCosts[2].mul(1e4)
    game.dimensionMultipliers[2] = game.dimensionMultipliers[2].mul(2)
  }
}
}

function buyThirdDimension() {
  if (game.antimatter.greaterThanOrEqualTo(game.dimensionCosts[3])) {
  game.dimensionAmounts[3] = game.dimensionAmounts[3].add(1)
  game.dimensionsBought[3] = game.dimensionsBought[3].add(1)
  game.antimatter = game.antimatter.minus(game.dimensionCosts[3])
  if (game.dimensionsBought[3] % 10 == 0) {
    game.dimensionCosts[3] = game.dimensionCosts[3].mul(1e5)
    game.dimensionMultipliers[3] = game.dimensionMultipliers[3].mul(2)
  }
}
}

function buyFourthDimension() {
  if (game.antimatter.greaterThanOrEqualTo(game.dimensionCosts[4])) {
  game.dimensionAmounts[4] = game.dimensionAmounts[4].add(1)
  game.dimensionsBought[4] = game.dimensionsBought[4].add(1)
  game.antimatter = game.antimatter.minus(game.dimensionCosts[4])
  if (game.dimensionsBought[4] % 10 == 0) {
    game.dimensionCosts[4] = game.dimensionCosts[4].mul(1e6)
    game.dimensionMultipliers[4] = game.dimensionMultipliers[4].mul(2)
  }
}
}

function reset() {
  game = {
  antimatter: D(10),
  dimensionAmounts: [NaN,D(0),D(0),D(0),D(0)],
  dimensionsBought: [NaN,D(0),D(0),D(0),D(0)],
  dimensionMultipliers: [NaN,D(1),D(1),D(1),D(1)],
  dimensionCosts: [NaN,D(10),D(100),D(10000),D(1000000)]
}
}

window.setInterval(function() {
  game.antimatter = game.antimatter.add(game.dimensionAmounts[1].mul(game.dimensionMultipliers[1]).div(10))
  game.dimensionAmounts[1] = game.dimensionAmounts[1].add(game.dimensionAmounts[2].mul(game.dimensionMultipliers[2]).div(10))
  game.dimensionAmounts[2] = game.dimensionAmounts[2].add(game.dimensionAmounts[3].mul(game.dimensionMultipliers[3]).div(10))
  game.dimensionAmounts[3] = game.dimensionAmounts[3].add(game.dimensionAmounts[4].mul(game.dimensionMultipliers[4]).div(10))
  document.getElementById("antimatterDisplay").innerHTML = "Antimatter: " + game.antimatter
  document.getElementById("firstDimensionAmount").innerHTML = "" + game.dimensionAmounts[1] + " (" + (game.dimensionsBought[1] % 10) + ")"
  document.getElementById("firstDimensionCost").innerHTML = "Cost: " + game.dimensionCosts[1]
  document.getElementById("firstDimensionMultiplier").innerHTML = "x" + game.dimensionMultipliers[1]
  document.getElementById("secondDimensionAmount").innerHTML = "" + game.dimensionAmounts[2] + " (" + (game.dimensionsBought[2] % 10) + ")"
  document.getElementById("secondDimensionCost").innerHTML = "Cost: " + game.dimensionCosts[2]
  document.getElementById("secondDimensionMultiplier").innerHTML = "x" + game.dimensionMultipliers[2]
  document.getElementById("thirdDimensionAmount").innerHTML = "" + game.dimensionAmounts[3] + " (" + (game.dimensionsBought[3] % 10) + ")"
  document.getElementById("thirdDimensionCost").innerHTML = "Cost: " + game.dimensionCosts[3]
  document.getElementById("thirdDimensionMultiplier").innerHTML = "x" + game.dimensionMultipliers[3]
  document.getElementById("fourthDimensionAmount").innerHTML = "" + game.dimensionAmounts[4] + " (" + (game.dimensionsBought[4] % 10) + ")"
  document.getElementById("fourthDimensionCost").innerHTML = "Cost: " + game.dimensionCosts[4]
  document.getElementById("fourthDimensionMultiplier").innerHTML = "x" + game.dimensionMultipliers[4]
}, 100)