
const EN = ExpantaNum
const autobuyerCosts = [EN(1e10), EN("1e500"), EN("1e200000"), EN("1ee100"), EN("1ee1000000")]

function autobuyer(selection) {
let autobuyers = ["one", "two", "three", "four", "five"]
if (game.potatoes.gte(autobuyerCosts[autobuyers[selection]])) {
    game.automation.multiplier[autobuyers[selection]].bought = true
    game.potatoes = game.potatoes.sub(autobuyerCosts[autobuyers[selection]])
  }
}

function updateAutobuyerDisplay() {
let desc = ["x1", "x2", "x3", "x4", "x5"]
for (var i=0; i<5; i++) {
  document.getElementById("autobuyer"+i).textContent = "Multiplier " + desc[i] + "Cost: " + autobuyerCosts[i]  
  }
}