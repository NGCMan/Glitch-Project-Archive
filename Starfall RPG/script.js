/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
class Entity {
  constructor(hp, mp, spd, atk, def, posVector) {
    this.hp = hp;
    this.mp = mp;
    this.spd = spd;
    this.atk = atk;
    this.def = def;
    this.posVector = posVector;
    this.dispPosVector = '';
  }
}

function talk() {
  document.getElementById("talkActions").style.visibility = "visible";
}
function notify(text) {
messageLog.push(text)
}
function update() {
  if (messageLog.length > 4) {
  window.onload = function() {
    document.getElementById("message1").innerHTML = messageLog[messageLog.length-5]
}} 
  if (messageLog.length > 3) {
  window.onload = function() {
    document.getElementById("message2").innerHTML = messageLog[messageLog.length-4]
}}
   if (messageLog.length > 2) {
  window.onload = function() {
     document.getElementById("message3").innerHTML = messageLog[messageLog.length-3]
}}
   if (messageLog.length > 1) {
  window.onload = function() {
     document.getElementById("message4").innerHTML = messageLog[messageLog.length-2]
}}
   if (messageLog.length > 0) {
  window.onload = function() {
     document.getElementById('message5').innerHTML = messageLog[messageLog.length-1]
}
   }
}
setInterval(50,update())