function ascend() {
  if (game.aarexpoints.gte(Number.MAX_VALUE)) {
    console.log("YOU HAVE ASCENDED!");
    game = {
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
      automation: game.automation,
      ascension: {
        AP: game.ascension.AP.add(ExpantaNum(1)),
        times: game.ascension.times + 1,
        potatoWorlds: game.ascension.potatoWorlds,
        upgrades: game.ascension.upgrades
      }
    };
  }
}
