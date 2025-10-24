var getDefaultPlayer = () => ({
  lastUpdate: new Date().getTime(),
  cookies: new Decimal(0),
  buildings: {
    cursors: [
      new Building("Cursor", 15, 1.1),
      new Building("2ndCursor", 1.5e4, 1.15)
    ],
    workers: [
      new Building("Worker", 100, 1.1)
    ]
  }
})
var player = getDefaultPlayer()
var diff = 0
var diffMultiplier = 1
let gameLoopIntervalId = 0

var cookies = 0;
var cursors = 0;
var secondCursors = 0;
var workers = 0;
var cursorCost = 15;
var secondCursorCost = 1.5e4;
var workerCost = 100;
var clickPower = 1;
var cpCost = 100;
var refactorEssence = 0;
var pendingRe = 0;
var tickSpeed = 1000;
var tsCost = 1000;
var tickpart = 0;
var reMult = 1;
var reMultCost = 50;
var reCurMult = 1;
var upg2Cost = 100;
var upg3 = 0;
var upg3Cost = 1000;
var reCursors=0;
var rePower=1;
var reCurCost=10;
var wizardCost = 100;
var capsuleCost = 10000;
var wizards = 0;
var mana = 100;
var capsules = 1;


function updateCookies() {
  ("cookies", `Cookies: ${player.cookies}`)
}

function totalCPS() {
  let total = (0)
  for (let type of player.buildings) {
    for (let building of player.buildings[type]) {
      total = total.plus(player.buildings[type][building].CPS)
    }
  }
  return total
}

//when button is clicked
function clickButton() {
  cookies += clickPower*((refactorEssence*rePower)+1); 
  document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
}

//when cursor is bought
function buyCursor() {
  if (cookies >= cursorCost) {
    cookies -= cursorCost;
    cursorCost *= 1.1;
    cursorCost = Math.round(cursorCost);
    cursors++
    document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
    document.getElementById("Cursors").innerHTML = "Cursors: " + cursors;
    document.getElementById("buyCursor").innerHTML =
      "Buy a cursor for " + cursorCost + " cookies";
  }
}

//when super cursor is bought
function buy2ndCursor() {
    if (cookies >= secondCursorCost) {
    cookies -= secondCursorCost;
    secondCursorCost *= 1.15;
    secondCursorCost = Math.round(secondCursorCost);
    secondCursors += 1;
    document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
    document.getElementById("2ndCursors").innerHTML = "Super Cursors: " + secondCursors;
    document.getElementById("buy2ndCursor").innerHTML = "Buy a super cursor for " + secondCursorCost + " cookies";
  }
}

//when worker is bought
function buyWorker() {
  if (cookies >= workerCost) {
    cookies -= workerCost;
    workerCost *= 1.1;
    workerCost = Math.round(workerCost);
    workers += 1;
    document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
    document.getElementById("Workers").innerHTML = "Workers: " + workers;
    document.getElementById("buyWorker").innerHTML =
      "Buy a worker for " + workerCost + " cookies";
  }
}

//when upg1 is bought
function buyCp() {
  if (cookies >= cpCost) {
    cookies -= cpCost;
    cpCost *= 2
    clickPower += 1;
    document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
    document.getElementById("buyCp").innerHTML =
      "Upgrade click power for " + cpCost + " cookies";
  }
}

//when upg2 is bought
function buyTs() {
  if (cookies >= tsCost) {
    cookies -= tsCost;
    tsCost *= 2
    tickSpeed = Math.round(tickSpeed*0.75)
    document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
    document.getElementById("buyTs").innerHTML =
      "Upgrade tickspeed for " + tsCost + " cookies";
  }
}

//hard reset function
function hardReset() {
  confirm("Are you sure you want to hard reset the game? You will lose everything you have!");
  var player = getDefaultPlayer()
var diff = 0
var diffMultiplier = 1
let gameLoopIntervalId = 0

var cookies = 0;
var cursors = 0;
var secondCursors = 0;
var workers = 0;
var cursorCost = 15;
var secondCursorCost = 1.5e4;
var workerCost = 100;
var clickPower = 1;
var cpCost = 100;
var refactorEssence = 0;
var pendingRe = 0;
var tickSpeed = 1000;
var tsCost = 1000;
var tickpart = 0;
var reMult = 1;
var reMultCost = 50;
var reCurMult = 1;
var upg2Cost = 100;
var upg3 = 0;
var upg3Cost = 1000;
var reCursors=0;
var rePower=1;
var reCurCost=10;
  document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
  document.getElementById("Cursors").innerHTML = "Cursors: " + cursors;
  document.getElementById("2ndCursors").innerHTML = "2nd Dimension Cursors: " + secondCursors;
  document.getElementById("Workers").innerHTML = "Workers: " + workers;
  document.getElementById("refactorButton").innerHTML = "Refactor and gain " + pendingRe + " refactor essence."
  document.getElementById("title").innerHTML = cookies + " cookies - Cookie Clicker Respecced";
  document.getElementById("reCursor").innerHTML = "ReCursors: " + reCursors;
  document.getElementById("rePower").innerHTML = "Refactor Power: " + rePower;
  document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
  document.getElementById("reupg1").innerHTML = "You gain 5x more RE for " + reMultCost + " RE";
  document.getElementById("reupg2").innerHTML = "ReCursors are 3x more powerful for " + upg2Cost + " RE";
  
}

//makes the loop work
var mainGameLoop = window.setInterval(function() {
  tickpart += 50
  if (tickpart>=tickSpeed) {
    tickpart -= tickSpeed
    loop();
  }
}, 50);

//when recursor is bought
function buyReCursor() {
  if (refactorEssence >= reCurCost) {
    refactorEssence -= reCurCost
    reCurCost *= 5
    reCursors += 1
    document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
    document.getElementById("buyReCursor").innerHTML = "Buy a ReCursor for " + reCurCost + " refactor essence.";
  }
}

function init() {
  //this function does things that need to be done when the page is loaded, like hiding elements or loading a save
  //init should only run once
  
  hideElement("refactorButton");
  hideElement("hideUntilRefact");
  hideElement("reupg1");
  hideElement("wizards");
  hideElement("mana");
  hideElement("storage");
  hideElement("buyWizard");
  hideElement("buyCapsule");
}
  
function showElement(element) {
  document.getElementById(element).style.display = "inline";
}

function hideElement(element) {
  document.getElementById(element).style.display = "none";
}
  
//when refactoring
function refactor() {
  refactorEssence += pendingRe
  document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
  pendingRe = 0;
  cookies = 0;
  cursors = 0;
  workers = 0;
  cursorCost = 15;
  workerCost = 100;
  clickPower = 1;
  cpCost = 100;
  tickSpeed = 1000;
  tsCost = 1000;
  secondCursors = 0;
  secondCursorCost = 1.5e4;
  rePower=1;
  showElement("reupg1");
  document.getElementById("buyCursor").innerHTML = "Buy a cursor for " + cursorCost + " cookies";
  document.getElementById("buyWorker").innerHTML = "Buy a worker for " + workerCost + " cookies";
  document.getElementById("buy2ndCursor").innerHTML = "Buy a 2nd dimension cursor for " + secondCursorCost + " cookies";
  document.getElementById("buyCp").innerHTML = "Upgrade click power for " + cpCost + " cookies";
  document.getElementById("buyTs").innerHTML = "Upgrade tickspeed for " + tsCost + " cookies";
}

//what happens in the loop
function loop() {
  let mult=1+refactorEssence*rePower
  if (tickSpeed<50) {
    mult=50/tickSpeed
  }
  cookies += Math.round(cursors*mult);
  cursors += Math.round(secondCursors*mult)
  cookies += Math.round(workers * 10*mult);
  rePower += reCursors*reCurMult;
  document.getElementById("cookies").innerHTML = "Cookies: " + cookies;
  document.getElementById("Cursors").innerHTML = "Cursors: " + cursors;
  document.getElementById("2ndCursors").innerHTML = "Super Cursors: " + secondCursors;
  document.getElementById("Workers").innerHTML = "Workers: " + workers;
  document.getElementById("refactorButton").innerHTML = "Refactor and gain " + pendingRe + " refactor essence."
  document.getElementById("title").innerHTML = cookies + " cookies - Cookie Clicker Respecced";
  document.getElementById("reCursor").innerHTML = "ReCursors: " + reCursors;
  document.getElementById("rePower").innerHTML = "Refactor Power: " + rePower;
  document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
  pendingRe = Math.round(Math.log2(cookies/35000)*reMult)-1;
  if(upg3 = 1){
  }
  if (cookies >= 100000) {showElement("refactorButton");} else {hideElement("refactorButton")}
  //this code will show the refactor button forever if cookies > 1e5.
  if (refactorEssence>0) {showElement("hideUntilRefact")}
}

//when reupg1 is bought
function buyupgrade1() {
  if (refactorEssence >= reMultCost) {
    refactorEssence -= reMultCost;
    reMultCost *= 10;
    reMult *= 5;
    document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
    document.getElementById("reupg1").innerHTML = "You gain 5x more RE for " + reMultCost + " RE";
  }
}

//when reupg2 is bought
function buyupgrade2() {
  if (refactorEssence >= upg2Cost) {
    refactorEssence -= upg2Cost;
    upg2Cost *= 10;
    reCurMult *= 3;
    document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
    document.getElementById("reupg2").innerHTML = "ReCursors are 3x more powerful for " + upg2Cost + " RE";
  }
}

//when reupg3 is bought
function buyupgrade3() {
  if (refactorEssence >= upg3Cost) {
    refactorEssence -= upg3Cost;
    upg3++;
    hideElement("reupg3");
    showElement("wizards");
    showElement("mana");
    showElement("storage");
    showElement("buyWizard");
    showElement("buyCapsule");
    document.getElementById("re").innerHTML = "Refactor Essence: " + refactorEssence;
  }
}

//when wizard is bought
function buyWizard() {
  if(refactorEssence >= wizardCost){
    refactorEssence -= wizardCost;
    wizardCost *= 3;
    wizards++;
    document.getElementById("wizards").innerHTML = "Wizards: " + wizards;
    document.getElementById("buyWizard").innerHTML = "Buy a wizard for " + wizardCost + " RE";
  }
}

//when storage capsule is bought
function buyCapsule() {
  if(refactorEssence >= capsuleCost){
    refactorEssence -= capsuleCost;
    capsuleCost *= 10;
    capsules++;
    document.getElementById("storage").innerHTML = "Stoage Capsules: " + capsules;
    document.getElementById("buyCapsule").innerHTML = "Buy a storage capsule for " + capsuleCost + " RE";
  }
}
