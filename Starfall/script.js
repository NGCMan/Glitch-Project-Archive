function hide(superSecretFunction) {
  return arr => {
    return superSecretFunction(...arr);
  };
}
// i have NO IDEA what hide does and if it is actually used
const type = thing => {
  if (["number", "string", "boolean", "symbol"].includes(typeof thing)) {
    return typeof thing;
  } else if (typeof thing == "function") {
    if (thing.constructor.toString().startsWith("class")) return "class";
    else return "function";
  } else {
    if (thing.toString() == "[object Math]") {
      return "math";
    } else if (
      [
        "RegExp",
        "Date",
        "Set",
        "Map",
        "Window",
        "History",
        "Array",
        "WeakSet",
        "WeakMap"
      ].includes(thing.constructor.name)
    ) {
      return thing.constructor.name.toLowerCase();
    } else {
      return thing.constructor.name;
    }
  }
};
var dist = 0;
const options = {
  shopDist: 10,
  shopRad: 2
};
class Entity {
  constructor(
    hp,
    mhp,
    mp,
    mmp,
    spd,
    atk,
    def,
    spells,
    weapon,
    name,
    posVector = [0,0,0],
    ID = 1,
    gold = 0,
    equip = new Gear(),
    inv = [],
    eff = {}
  ) {
    this.hp = hp; //hit points
    this.mhp = mhp; //max hit points
    this.mp = mp; //mana points
    this.mmp = mmp; //max mana points
    this.spd = spd; //speed
    this.atk = atk; //attack,useless for player
    this.def = def; //defense
    this.spells = spells; //spells, array of Class Spell
    this.weapon = weapon; //Class Weapon
    this.name = name; //The name, string
    this.posVector = posVector; //Position
    this.dispPosVector = this.posVector.map(elem => elem.toFixed(1)); //???
    this.defstack = 0; //time until defense from defense button wears off
    this.gold = gold; //gold
    this.equip = equip; //equipment Class Gear
    this.inv = inv; //inventory array of Class Spell,Weapon, or Gear
    this.eff = eff; //effects array
    this.debug = {
      kill: () => {
        this.hp = -1;
      },
      fullheal: () => {
        this.hp = this.mhp;
        this.mp = this.mmp;
      },
      buff: () => {
        this.weapon.dmg *= 2;
        this.mhp *= 2;
        this.atk *= 2;
        this.def *= 2;
        this.mmp *= 2;
        this.debug.fullheal();
      },
      getItem: () => {
        this.equip.push(getRandomWeapon());
      }
    }; //debug stuff
  }
  update() {
    this.dispPosVector = this.posVector.map(e => e.toFixed(1));
  }
  move(theta) {
    if (
      inBattle === 0 &&
      (!inWall(this.posVector)[0] || inWall(this.posVector)[1] != theta)
    ) {
      theta = (theta * Math.PI) / 180;
      this.posVector[0] += (Math.cos(theta) * this.spd) / 20;
      this.posVector[2] += (Math.sin(theta) * this.spd) / 20;
      let distFactor = Math.ceil(Math.pow(dist, 0.3333333333333333333333));
      window["spawn_" + getLocation(game.player.posVector) + "_enemy"](
        distFactor
      );
    }
  }
  toInventoryString() {
    return JSON.stringify(this.inv);
  }
  toSpellString() {
    return JSON.stringify(this.spells);
  }
  toEffectString() {
    let temp = this.eff;
    for (let i in temp) {
      temp[i] = new Effect(
        temp[i].funct,
        temp[i].count,
        temp[i].name
      ).toString();
    }
    return JSON.stringify(temp);
  }
  static getItem(json) {
    return Function("return " + json.type)().fromJSON(json);
  }
  static getInventory(json) {
    return json.map(stre => Entity.getItem(stre));
  }
  static getSpells(json) {
    let tempe = json;
    for (const i in tempe) {
      tempe[i] = Spell.fromJSON(tempe[i]);
    }
    return tempe;
  }
  static getEffects(json) {
    let temp = json;
    for (let i in temp) {
      console.log(temp[i]);
      temp[i] = Effect.fromJSON(temp[i]);
    }
  }
  toString() {
    return `${this.hp}::${this.mhp}::${this.mp}::${this.mmp}::${this.spd}::${
      this.atk
    }::${this.def}::${this.toSpellString()}::${this.weapon}::${this.name}::${
      this.posVector
    }::${this.gold}::${this.toInventoryString()}::${this.toEffectString()}`;
  }
  toJSON() {
    return {
      hp: this.hp,
      mhp: this.mhp,
      mp: this.mp,
      mmp: this.mmp,
      spd: this.spd,
      atk: this.atk,
      def: this.def,
      spells: this.spells,
      weapon: this.weapon,
      name: this.name,
      posVector: this.posVector,
      defstack: this.defstack,
      gold: this.gold,
      equip: this.equip,
      inv: this.inv,
      eff: this.eff
    };
  }
  static fromString(str) {
    const tokens = str.split("::");
    const thing = JSON.parse(tokens[13]);
    for (const i in thing)
      return new Entity(
        parseFloat(tokens[0]),
        parseFloat(tokens[1]),
        parseFloat(tokens[2]),
        parseFloat(tokens[3]),
        parseFloat(tokens[4]),
        parseFloat(tokens[5]),
        parseFloat(tokens[6]),
        Entity.getSpells(tokens[7]),
        Weapon.fromString(tokens[8]),
        tokens[9],
        tokens[10].split(",").map(elem => parseFloat(elem)),
        1,
        parseInt(tokens[11]),
        this.getInventory(tokens[12]),
        Entity.getEffects(tokens[13])
      );
  }
  static fromJSON(json) {
    console.log(json.eff);
    return new Entity(
      json.hp,
      json.mhp,
      json.mp,
      json.mmp,
      json.spd,
      json.atk,
      json.def,
      Entity.getSpells(json.spells),
      Weapon.fromJSON(json.weapon),
      json.name,
      json.posVector,
      0,
      json.gold,
      json.equip,
      Entity.getInventory(json.inv),
      Entity.getEffects(json.eff)
    );
  }
}
var game = {
  keys: [],
  keyHandlers: [],
  entities: [],
  player: new Entity(
    25,
    24,
    12,
    12,
    1.4,
    0,
    1,
    [
      new Spell(() => {}, 0, "Cancel"),
      new Spell(
        enemy => {
          defend();
          attack();
          encounter.innerHTML = "Speedburst! Defend+Attack";
        },
        5,
        "Speedburst",
        "Do a defend and then an attack quickly!"
      )
    ],
    new Weapon(),
    "I",
    [0, 0, 0],
    0,
    0,
    new Gear(),
    [new Weapon()],
    {
      Overheal: new Effect(
        s => {
          this.count -= s.hp - (s.mhp + s.equip.hp);
          s.hp = s.mhp + s.equip.hp;
          if (this.count < 0) {
            game.player.hp += this.count;
            this.count = 0;
          }
        },
        10,
        "Overheal"
      )
    }
  ),

  enemy: new Entity(
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    [],
    new Weapon(0, () => {}, "null"),
    "nothing",
    [0, 0, 0]
  )
};
console.log(game);
let inBattle = 0;
var placeholder = "";
var singularcheck = 0;
class KeyEvent {
  constructor(keyCode, callback, altKey) {
    this.keyCode = keyCode;
    this.callback = callback;
    this.altKey = altKey;

    game.keyHandlers.push(this);
  }
  update() {
    if (game.keys[this.keyCode] || game.keys[this.altKey]) this.callback();
    {
    }
    if (game.player.hp <= 0) {
      document.getElementById("game").innerHTML = "<h1> Game over! </h1>";
    }
    if (inBattle == 0) {
      encounterAudio.pause();
      encounterAudio.currentTime = 0;
    }
  }
}

function $(id) {
  return document.getElementById(id);
}

function update() {
  for (let i of game.entities) {
    i.update();
  }
  for (let i of game.keyHandlers) {
    i.update();
  }
  $("locText").innerHTML = getLocation(game.player.posVector);
  $("posText").innerHTML = "(" + game.player.dispPosVector.join(" | ") + ")";
  $("goldtext").innerHTML = "You have " + game.player.gold + " gold.";
  window.onload = function() {
    openInv();
  };
  let s = Object.keys(game.enemy.eff)
    .map(x => game.enemy.eff[x])
    .map(x => x.name + ":" + x.count)
    .join(", ");
  let x = game.player.posVector[0];
  let y = game.player.posVector[1];
  let z = game.player.posVector[2]; //for like scaling exemies or something
  dist = Math.sqrt(x * x + y * y + z * z); //distance from origin
  document.getElementById("ehp").innerHTML =
    "HP (" +
    game.enemy.name +
    "): " +
    Math.ceil(game.enemy.hp) +
    "/" +
    game.enemy.mhp +
    "[" +
    s +
    "]";
  document.getElementById("action5").style.display =
    dist % 10 < options.shopRad ||
    dist % 10 > options.shopDist - options.shopRad
      ? "block"
      : "none";
  if (game.player.hp > game.player.mhp + game.player.equip.hp) {
    game.player.hp = game.player.mhp + game.player.equip.hp;
  }
}

function init() {
  game.entities.push(game.player);
  setInterval(loop, 50);
}

init();
if (inBattle === 0) {
  new KeyEvent(87, () => game.player.move(0), 38);
  new KeyEvent(68, () => game.player.move(90), 39);
  new KeyEvent(83, () => game.player.move(180), 40);
  new KeyEvent(65, () => game.player.move(270), 37);

  new KeyEvent(87, () => (randomChance = Math.random()), 38);
  new KeyEvent(68, () => (randomChance = Math.random()), 39);
  new KeyEvent(83, () => (randomChance = Math.random()), 40);
  new KeyEvent(65, () => (randomChance = Math.random()), 37);
}
function loop() {
  update();
  let x = Object.keys(game.player.eff)
    .map(x => game.player.eff[x])
    .map(x => x.name + ":" + x.count)
    .join(", ");
  document.getElementById("hp").innerHTML =
    "HP (You): " +
    game.player.hp +
    "/" +
    (game.player.mhp + game.player.equip.hp) +
    "[" +
    x +
    "]";
  if (introSent[0] && introSent[1] && introSent[2] && !introSent[3]) {
    msgs[4].send();
  }
  if (introSent[0] && introSent[1] && introSent[2]) {
    document.getElementById("notTalk").style.display = "block";
  } else {
    document.getElementById("notTalk").style.display = "none";
  }
}
if (inBattle === 0) {
  document.onkeydown = function(e) {
    game.keys[e.keyCode] = true;
  };

  document.onkeyup = function(e) {
    game.keys[e.keyCode] = false;
  };
}

let titleSpecial = [
  "We're not that good",
  "There are a lot of bugs",
  "Please don't edit",
  "This is the one bug-less part",
  "This is not a news ticker",
  "Half of this is broken",
  "Reinhardt was here",
  "Doesn't even save",
  "What graphics",
  "Gamers Rise UP",
  "As seen on TV!",
  "Wait, wasn't this an educational website?"
];
document.getElementById("title").innerHTML =
  "Starfall" +
  (Math.random() > 0.01 ? (Math.random() > 0.01 ? ": " : "; ") : " ") +
  titleSpecial[Math.floor(titleSpecial.length * Math.random())];
var url_string = window.location.href;
var url = new URL(url_string);
var debug = url.searchParams.get("debug") === "yes";
if (!debug) {
  ~(function vibecheck() {
    let devopen = false,
      div = document.createElement("div");
    requestAnimationFrame(vibecheck);
    Object.defineProperty(div, "id", {
      get: () => {
        devopen = true;
      }
    });
    console.log(div);
    if (devopen) {
      window.location.href = "about:blank";
    }
  })();
} else {
  var preset = url.searchParams.get("preset");
  switch (preset) {
    case "a":
      game.player.inv.push(
        new Weapon(7, () => {}, "sharp rock", "It's very sharp. (Up to 6 DMG)")
      );
      game.player.inv.push(getRandomWeapon());
      game.player.inv.push(getRandomArmor());
      game.player.gold = 80;
      game.player.posVector = [35, 0, 45];
      updateInv();
      setTimeout(() => {
        introSent = introSent.map(x => !x);
      }, 100);
      break;
    default:
      break;
      talk();
  }
}
// well uhhhhhhhhhhhhhhhh yeah i was too lazy to do the stuff in one object
if (localStorage.hasOwnProperty("hmers")) {
  game.player = Entity.fromJSON(JSON.parse(localStorage.hmers));
  game.enemy = Entity.fromJSON(JSON.parse(localStorage.hmers2));
  inBattle = JSON.parse(localStorage.inBattle)
  if(inBattle) {
    encounterAudio.play()
  }
}
setInterval(() => {
  localStorage.hmers = JSON.stringify(game.player);
  localStorage.hmers2 = JSON.stringify(game.enemy);
  localStorage.inBattle = JSON.stringify(inBattle);
}, 10000);
