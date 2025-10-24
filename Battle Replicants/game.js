/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "welcome to battle replicants, a game idea that never made NG+++ turned into a game" in the browser's dev tools console
console.log(
  "Welcome to battle replicants, a game idea that never made NG+++ turned into a game"
);
var game = {
  version: 0.1,
  world: 1,
  replicants: {
    battleReplicantAmount: 1,
    hp: 10,
    maxHP: 10,
    mana: 5,
    maxMana: 5,
    attack: 1,
    defense: 1
  },
  enemy: {
    level: 1,
    hp: 5,
    maxHP: 5,
    attack: 1,
    defense: 1
  },
  coin: {
    unlocked: 0,
    amount: 0,
    upgrades: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    }
  }
};

function updateStats() {
  // updates the stats section. self explanatory
  let plural = game.replicants.battleReplicantAmount != 1 ? "s" : "";
  let plural2 = game.replicants.coin != 1 ? "s" : "";
  document.getElementById("replicantHPDisplay").textContent = //hp amount
    "Replicants HP: " + game.replicants.hp + "/" + game.replicants.maxHP;
  document.getElementById("replicantMPDisplay").textContent = //mp amount
    "Replicants MP: " + game.replicants.mana + "/" + game.replicants.maxMana;
  document.getElementById("replicantStatDisplay").textContent =
    "Attack: " +
    game.replicants.attack +
    " | Defense: " +
    game.replicants.defense; // attack and defense
  document.getElementById("replicantAmountDisplay").textContent = // replicant amount
    "You have " +
    game.replicants.battleReplicantAmount +
    " replicant" +
    plural +
    ".";
  if (game.coin.unlocked == 1) {
    // coins aren't unlocked until you get them from an enemy.
    document.getElementById("coinAmountDisplay").style.display = "block";
    document.getElementById("coinAmountDisplay").textContent =
      "You have " + game.coin.amount + " coin" + plural2 + ".";
  } else document.getElementById("coinAmountDisplay").style.display = "none";
}

function updateStory() {
  //the story can use some improvements
  document.getElementById("storyText").textContent =
    "You wake up in a strange land, feeling exhausted. After standing up, you see strange material that you cannot describe of that is spread all over the place. You punch through it, but it opens up a hole to the outside, a much larger place. You realize that there are vast and endless worlds left behind by this very strange material, as you start picking them up. They were called replicanti. Along with the replicanti came a very small organism. You call it a replicant.";
  document.getElementById("storyText2").textContent =
    "You observe its movement as it circles around you. Maybe it can actually do something useful. You send the replicant off to the unknown wastelands to start a new journey. It seems to be able to naturally fight, but it's quite weak.";
}

function recover() { //simply heals the replicants hp to max health, i will make this more complex later
  game.replicants.hp = game.replicants.maxHP;
}

function fight() { //simulate a fight
  if (game.replicants.hp >= 1) {
    let getEnemy = [
      "wild replicant",
      "matter particle",
      "piece of dust",
      "number",
      "antimatter particle",
      "quark"
    ];
    let ATK = Math.floor(Math.random() * 2 * 1.1 ** game.world + 1);
    let LVL = Math.floor(game.world ** 1.025);
    let HP = Math.floor(1.1 ** game.world * Math.random() * 10 + 1);
    let enemy =
      "A " +
      getEnemy[Math.floor(Math.random() * getEnemy.length)] +
      " emerges!" +
      " Level: " +
      LVL +
      " HP: " +
      HP +
      " Attack: " +
      ATK;
    document.getElementById("fightText").textContent = enemy;
    setTimeout(
      function() {
        do {
          if (game.replicants.hp - ATK >= 1) {
            game.replicants.hp = game.replicants.hp - (ATK - game.replicants.defense);
            HP -= (game.replicants.attack);
          } else {
            game.replicants.hp = 0;
            document.getElementById("fightText").textContent =
              enemy + " Your replicants fainted!";
            if (HP - game.replicants.attack >= 1) {
              HP = HP - game.replicants.attack;
            } else {
              HP = 0;
              document.getElementById("fightText").textContent =
                enemy + " The enemy fainted!";
            }
          }
        } while (game.replicants.hp > 0 || HP > 0);
      },
      200,
      game.replicants.hp > 0 || HP > 0
    );
  }
}

setInterval(function() {
  updateStats();
  updateStory();
}, 100);
