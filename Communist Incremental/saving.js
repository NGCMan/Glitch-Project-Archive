let stuffToExpantaNumifyIdkLol = ["potatoes","mult","multmult","multimultipeople","multithreepeople","multifourpeople","multifivepeople","carrots","beetroots","aarexpoints","aarexesripped"]
function ENify(x) {
  if (typeof x == "number") {
    return ExpantaNum(x);
  } else if (x == "null") {
    return ExpantaNum(0);
  } else {
    let newEN = new ExpantaNum(0);
    newEN.array = x.array;
    newEN.sign = x.sign;
    newEN.layer = x.layer;
    return newEN;
  }
}

function loadGame(loadgame) {
  for (const i in loadgame) {
    game[i] = loadgame[i];
  }
  for (const i in stuffToExpantaNumifyIdkLol) {
    game[stuffToExpantaNumifyIdkLol[i]] = ENify(game[stuffToExpantaNumifyIdkLol[i]])
  }
  const diff = Date.now() - game.lastTick;
  // Console.log(diff);
  // Console.log(game.leastBoost)
  // Console.log(diff);
  showpotatoes()
  showcarrots()
  showbeetroots()
}
function save() {
  localStorage.comrade = JSON.stringify(game)
}
loadGame(JSON.parse(localStorage.comrade))