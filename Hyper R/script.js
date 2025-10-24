/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log(
  "You are not allowed to cheat, dude. If you are here to just debug, that's fine. Type debug() to see all variables/arrays/objects."
);
class Entity {
  constructor(hp, mana, atk, def, maxhp, hpregen, maxmana, name, gold, ID) {
    this.name = name;
    this.ID = ID;
    this.gold = gold;
    this.hp = hp;
    this.maxhp = maxhp;
    this.atk = atk;
    this.def = def;
    this.mana = mana;
    this.maxmana = maxmana;
    this.hpregen = hpregen;
  }
}
class Weapon {
  constructor(atk, weaponname, poison, effects) {
    this.atk = atk;
    this.weaponname = weaponname;
    this.poison = poison;
    this.effects = effects;
  }
}
var game = {
  keys: [],
  keyHandlers: [],
  entities: [],
  player: new Entity(10, 10, 2, 0, 10, 0, 10, "You", 0, 0)
};
function sendMessage(Message) {
  document.getElementById("messageBox").innerHTML =
    "<p>" + Message + "</p>" + document.getElementById("messageBox").innerHTML;
}
function update() {
  window.onload = function() {
  document.getElementById("spintraining").innerHTML = "("+ trainingStats.spinning +")" + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<button onclick="queuetrain("spinning")">Train spinning (+1 ATK)</button>'
}}
sendMessage(
  'You wake up, and suddenly you realize that you are a membrane! There is a device near you, and it has a label that says "Being Transformer: requires a certain 10-bit code." There is a big, bad membrane wreaking chaos over the town. Get training'
  
)
setInterval(50,update())