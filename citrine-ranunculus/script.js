let game = {
replicanti: OmegaNum(1),
time: OmegaNum(1000),
chance: OmegaNum(5),
limit: OmegaNum(1e6), // 1e308 would take too long
replicantiUpgradeCost: OmegaNum(100),
timeUpgradeCost: OmegaNum(1000),
replicateAttempt: OmegaNum(0),
firstDimensions: OmegaNum(0),
firstDimensionCost: OmegaNum(10),
firstDimensionMultiplier: OmegaNum(1),
galaxy: OmegaNum(0),
}

function replicate() {
  var rng = Math.random() * 100;
  game.replicanti = game.replicanti.plus(game.firstDimensions)
  if (rng < game.chance) {
    game.replicanti = game.replicanti.mul((OmegaNum(1).plus(game.chance.div(OmegaNum(100)))).pow(OmegaNum(1000).div(game.time))).plus(1)
  }
    // 1% was too low.
}
function replicantiUpgrade() {
  if (game.replicanti.greaterThanOrEqualTo(game.replicantiUpgradeCost)) {
    game.replicanti = game.replicanti.div(game.replicantiUpgradeCost)
    game.chance = game.chance.add(1)
    game.replicantiUpgradeCost = game.replicantiUpgradeCost.mul(OmegaNum(15))
    document.getElementById("replicantiUpgradeDisplay").innerHTML = "Increase the replicate chance by 1%. Cost:  " + game.replicantiUpgradeCost
  }
}
function timeUpgrade() {
  if (game.replicanti.greaterThanOrEqualTo(game.timeUpgradeCost)) {
    game.replicanti = game.replicanti.div(game.timeUpgradeCost)
    game.time = game.time.div(1.11)
    game.timeUpgradeCost = game.timeUpgradeCost.mul(OmegaNum(15))
    document.getElementById("timeUpgradeDisplay").innerHTML = "Divide time by 11%. Cost:  " + game.timeUpgradeCost
  }
}
function buyFirstDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.firstDimensionCost)) {
    game.replicanti = game.replicanti.div(game.firstDimensionCost)
    game.firstDimensions = game.firstDimensions.add(1)
    game.firstDimensionMultiplier = game.firstDimensionMultiplier.mul(2)
    game.firstDimensionCost = game.firstDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("firstDimensionDisplay").innerHTML = "(x" + game.firstDimensionMultiplier + ") 1st Dimension: Amount: " + game.firstDimensions +  ", Cost: " + game.firstDimensionCost
  }
}
function prestige(num) {
  if (game.replicanti.greaterThanOrEqualTo(game.limit) && num == 1) {
  let game = {
    replicanti: OmegaNum(1),
    time: OmegaNum(1000),
    chance: OmegaNum(5),
    limit: OmegaNum(1e6),
    replicantiUpgradeCost: OmegaNum(100),
    timeUpgradeCost: OmegaNum(1000),
    firstDimensions: OmegaNum(0),
    firstDimensionCost: OmegaNum(10),
    firstDimensionMultiplier: OmegaNum(1),
  }
  game.galaxy = game.galaxy.add(1)
  game.time = game.time.div(game.galaxy.add(1))
  document.getElementById("galaxiesDisplay").innerHTML = "Galaxies: " + game.galaxy
  }
}
const interval = setInterval(function() {
replicate()
    //Limit test
    if (game.replicanti.greaterThanOrEqualTo(game.limit)) {
    game.replicanti = game.limit
  }
  game.replicateAttempt = game.replicateAttempt.add(1)
if (game.replicateAttempt.equal(10)) {
    game.replicanti = game.replicanti.mul((OmegaNum(1).plus(game.chance.div(OmegaNum(100)))).pow(OmegaNum(1000).div(game.time))).plus(1)
    game.replicateAttempt = OmegaNum(0)
    }
game.replicanti = game.replicanti.round()
game.time = game.time.round()
document.getElementById("replicantiDisplay").innerHTML = "Replicanti: " + game.replicanti
document.getElementById("timeDisplay").innerHTML = "Time: " + checkTime(game.time)
document.getElementById("chanceDisplay").innerHTML = "Chance: " + game.chance + "%"

 }, game.time);
function save() {
localStorage.setItem('game', JSON.stringify(game));
}

function load() {
game = JSON.parse(localStorage.getItem('game'));
}

