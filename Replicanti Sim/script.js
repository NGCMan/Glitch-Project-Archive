var game = {
replicanti: OmegaNum(1),
time: OmegaNum(1000),
chance: OmegaNum(5),
limit: OmegaNum(1e308),
replicantiUpgradeCost: OmegaNum(100),
timeUpgradeCost: OmegaNum(1000),
replicateAttempt: OmegaNum(0),
firstDimensions: OmegaNum(0),
firstDimensionCost: OmegaNum(10),
firstDimensionMultiplier: OmegaNum(1),
secondDimensions: OmegaNum(0),
secondDimensionCost: OmegaNum(100),
secondDimensionMultiplier: OmegaNum(1),
thirdDimensions: OmegaNum(0),
thirdDimensionCost: OmegaNum(10000),
thirdDimensionMultiplier: OmegaNum(1),
fourthDimensions: OmegaNum(0),
fourthDimensionCost: OmegaNum(1000000),
fourthDimensionMultiplier: OmegaNum(1),
fifthDimensions: OmegaNum(0),
fifthDimensionCost: OmegaNum(1e9),
fifthDimensionMultiplier: OmegaNum(1),
sixthDimensions: OmegaNum(0),
sixthDimensionCost: OmegaNum(1e13),
sixthDimensionMultiplier: OmegaNum(1),
seventhDimensions: OmegaNum(0),
seventhDimensionCost: OmegaNum(1e18),
seventhDimensionMultiplier: OmegaNum(1),
eighthDimensions: OmegaNum(0),
eighthDimensionCost: OmegaNum(1e24),
eighthDimensionMultiplier: OmegaNum(1),
galaxies: OmegaNum(0)
}

function replicate() {
  var rng = Math.random() * 100;
  game.replicanti = game.replicanti.add(game.firstDimensions.times(game.firstDimensionMultiplier))
  game.firstDimensions = game.firstDimensions.add(game.secondDimensions.times(game.secondDimensionMultiplier))
  game.secondDimensions = game.secondDimensions.add(game.thirdDimensions.times(game.thirdDimensionMultiplier))
  game.thirdDimensions = game.thirdDimensions.add(game.fourthDimensions.times(game.fourthDimensionMultiplier))
  game.fourthDimensions = game.fourthDimensions.add(game.fifthDimensions.times(game.fifthDimensionMultiplier))
  game.fifthDimensions = game.fifthDimensions.add(game.sixthDimensions.times(game.sixthDimensionMultiplier))
  game.sixthDimensions = game.sixthDimensions.add(game.seventhDimensions.times(game.seventhDimensionMultiplier))
  game.seventhDimensions = game.seventhDimensions.add(game.eighthDimensions.times(game.eighthDimensionMultiplier))
  if (rng < game.chance) {
    game.replicanti = game.replicanti.mul((OmegaNum(1).plus(game.chance.div(OmegaNum(100)))).pow(OmegaNum(1000).div(game.time))).mul(game.galaxies.plus(1)).plus(1)
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

function buySecondDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.secondDimensionCost)) {
    game.replicanti = game.replicanti.div(game.secondDimensionCost)
    game.secondDimensions = game.secondDimensions.add(1)
    game.secondDimensionMultiplier = game.secondDimensionMultiplier.mul(2)
    game.secondDimensionCost = game.secondDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("secondDimensionDisplay").innerHTML = "(x" + game.secondDimensionMultiplier + ") 2nd Dimension: Amount: " + game.secondDimensions +  ", Cost: " + game.secondDimensionCost
  }
}

function buyThirdDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.thirdDimensionCost)) {
    game.replicanti = game.replicanti.div(game.thirdDimensionCost)
    game.thirdDimensions = game.thirdDimensions.add(1)
    game.thirdDimensionMultiplier = game.thirdDimensionMultiplier.mul(2)
    game.thirdDimensionCost = game.thirdDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("thirdDimensionDisplay").innerHTML = "(x" + game.thirdDimensionMultiplier + ") 3rd Dimension: Amount: " + game.thirdDimensions +  ", Cost: " + game.thirdDimensionCost
  }
}

function buyFourthDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.fourthDimensionCost)) {
    game.replicanti = game.replicanti.div(game.fourthDimensionCost)
    game.fourthDimensions = game.fourthDimensions.add(1)
    game.fourthDimensionMultiplier = game.fourthDimensionMultiplier.mul(2)
    game.fourthDimensionCost = game.fourthDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("fourthDimensionDisplay").innerHTML = "(x" + game.fourthDimensionMultiplier + ") 4th Dimension: Amount: " + game.fourthDimensions +  ", Cost: " + game.fourthDimensionCost
  }
}

function buyFifthDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.fifthDimensionCost)) {
    game.replicanti = game.replicanti.div(game.fifthDimensionCost)
    game.fifthDimensions = game.fifthDimensions.add(1)
    game.fifthDimensionMultiplier = game.fifthDimensionMultiplier.mul(2)
    game.fifthDimensionCost = game.fifthDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("fifthDimensionDisplay").innerHTML = "(x" + game.fifthDimensionMultiplier + ") 5th Dimension: Amount: " + game.fifthDimensions +  ", Cost: " + game.fifthDimensionCost
  }
}

function buySixthDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.sixthDimensionCost)) {
    game.replicanti = game.replicanti.div(game.sixthDimensionCost)
    game.sixthDimensions = game.sixthDimensions.add(1)
    game.sixthDimensionMultiplier = game.sixthDimensionMultiplier.mul(2)
    game.sixthDimensionCost = game.sixthDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("sixthDimensionDisplay").innerHTML = "(x" + game.sixthDimensionMultiplier + ") 6th Dimension: Amount: " + game.sixthDimensions +  ", Cost: " + game.sixthDimensionCost
  }
}

function buySeventhDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.seventhDimensionCost)) {
    game.replicanti = game.replicanti.div(game.seventhDimensionCost)
    game.seventhDimensions = game.seventhDimensions.add(1)
    game.seventhDimensionMultiplier = game.seventhDimensionMultiplier.mul(2)
    game.seventhDimensionCost = game.seventhDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("seventhDimensionDisplay").innerHTML = "(x" + game.seventhDimensionMultiplier + ") 7th Dimension: Amount: " + game.seventhDimensions +  ", Cost: " + game.seventhDimensionCost
  }
}

function buyEighthDimension() {
  if (game.replicanti.greaterThanOrEqualTo(game.eighthDimensionCost)) {
    game.replicanti = game.replicanti.div(game.eighthDimensionCost)
    game.eighthDimensions = game.eighthDimensions.add(1)
    game.eighthDimensionMultiplier = game.eighthDimensionMultiplier.mul(2)
    game.eighthDimensionCost = game.eighthDimensionCost.mul(OmegaNum(2.5)).round()
    document.getElementById("eighthDimensionDisplay").innerHTML = "(x" + game.eighthDimensionMultiplier + ") 8th Dimension: Amount: " + game.eighthDimensions +  ", Cost: " + game.eighthDimensionCost
  }
}

function buyGalaxy() {
      if (game.replicanti.greaterThanOrEqualTo(game.limit)) {
game.galaxies = game.galaxies.add(1)
game.replicanti = OmegaNum(1)
game.time = OmegaNum(1000)
game.chance = OmegaNum(5)
game.limit = OmegaNum(1e308)
game.replicantiUpgradeCost = OmegaNum(100)
game.timeUpgradeCost = OmegaNum(1000)
game.replicateAttempt = OmegaNum(0)
game.firstDimensions = OmegaNum(0)
game.firstDimensionCost = OmegaNum(10)
game.firstDimensionMultiplier = OmegaNum(1)
game.secondDimensions = OmegaNum(0)
game.secondDimensionCost = OmegaNum(100)
game.secondDimensionMultiplier = OmegaNum(1)
game.thirdDimensions = OmegaNum(0)
game.thirdDimensionCost = OmegaNum(10000)
game.thirdDimensionMultiplier = OmegaNum(1)
game.fourthDimensions = OmegaNum(0)
game.fourthDimensionCost = OmegaNum(1000000)
game.fourthDimensionMultiplier = OmegaNum(1)
game.fifthDimensions = OmegaNum(0)
game.fifthDimensionCost = OmegaNum(1e9)
game.fifthDimensionMultiplier = OmegaNum(1)
game.sixthDimensions = OmegaNum(0)
game.sixthDimensionCost = OmegaNum(1e13)
game.sixthDimensionMultiplier = OmegaNum(1)
game.seventhDimensions = OmegaNum(0)
game.seventhDimensionCost = OmegaNum(1e18)
game.seventhDimensionMultiplier = OmegaNum(1)
game.eighthDimensions = OmegaNum(0)
game.eighthDimensionCost = OmegaNum(1e24)
game.eighthDimensionMultiplier = OmegaNum(1)
replicate()
document.getElementById("replicantiUpgradeDisplay").innerHTML = "Increase the replicate chance by 1%. Cost:  " + game.replicantiUpgradeCost
document.getElementById("timeUpgradeDisplay").innerHTML = "Divide time by 11%. Cost:  " + game.timeUpgradeCost
document.getElementById("galaxyDisplay").innerHTML = "Galaxies: " + game.galaxies
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
document.getElementById("timeDisplay").innerHTML = "Time: " + game.time + "ms"
document.getElementById("chanceDisplay").innerHTML = "Chance: " + game.chance + "%"
document.getElementById("firstDimensionDisplay").innerHTML = "(x" + game.firstDimensionMultiplier + ") 1st Dimension: Amount: " + game.firstDimensions +  ", Cost: " + game.firstDimensionCost
document.getElementById("secondDimensionDisplay").innerHTML = "(x" + game.secondDimensionMultiplier + ") 2nd Dimension: Amount: " + game.secondDimensions +  ", Cost: " + game.secondDimensionCost
document.getElementById("thirdDimensionDisplay").innerHTML = "(x" + game.thirdDimensionMultiplier + ") 3rd Dimension: Amount: " + game.thirdDimensions +  ", Cost: " + game.thirdDimensionCost
document.getElementById("fourthDimensionDisplay").innerHTML = "(x" + game.thirdDimensionMultiplier + ") 4th Dimension: Amount: " + game.fourthDimensions +  ", Cost: " + game.fourthDimensionCost
document.getElementById("fifthDimensionDisplay").innerHTML = "(x" + game.fourthDimensionMultiplier + ") 5th Dimension: Amount: " + game.fifthDimensions +  ", Cost: " + game.fifthDimensionCost
document.getElementById("sixthDimensionDisplay").innerHTML = "(x" + game.sixthDimensionMultiplier + ") 6th Dimension: Amount: " + game.sixthDimensions +  ", Cost: " + game.sixthDimensionCost
document.getElementById("seventhDimensionDisplay").innerHTML = "(x" + game.seventhDimensionMultiplier + ") 7th Dimension: Amount: " + game.seventhDimensions +  ", Cost: " + game.seventhDimensionCost
document.getElementById("eighthDimensionDisplay").innerHTML = "(x" + game.eighthDimensionMultiplier + ") 8th Dimension: Amount: " + game.eighthDimensions +  ", Cost: " + game.eighthDimensionCost
 }, game.time);


function showNormal() {
  var normal = document.getElementById("normal");
  var galaxy = document.getElementById("galaxy");
  galaxy.style.display = "none"
  normal.style.display = "block"
}
function showGalaxy() {
    var normal = document.getElementById("normal");
    var galaxy = document.getElementById("galaxy");
    normal.style.display = "none"
    galaxy.style.display = "block"
}
function save() {
localStorage.setItem('game', JSON.stringify(game));
}

function load() {
game = JSON.parse(localStorage.getItem('game'));
}

