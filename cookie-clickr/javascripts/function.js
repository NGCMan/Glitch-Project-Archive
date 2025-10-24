Number.prototype.render=function(id,sur1,sur2){document.getElementById(id).innerHTML=sur1+" "+this+" "+sur2}
var D = (num) => new Decimal(num)

class hasCache {
  constructor() {
    this.cache = {} 
    this.doCache = {}
  }
  
  freshCache(name) {
    if (!(name in Object.keys(this.doCache))) this.doCache[name] = false
    return !this.doCache[name]
  }
  
  callCache(name, getFunc) {
    if (this.freshCache(name)) this.cache[name] = getFunc.call(this)
    this.doCache[name] = true
    return this.cache[name]
  }
}

var ge = document.getElementById
function showElement(elementID, style) {
  document.getElementById(elementID).style.display = style;
}
var hideElement = elementID => showElement(elementID, "none");
function decideElement(elementID, bool, style = "", onTrue) {
  showElement(elementID, bool ? style : "none");
  if (_.isFunction(onTrue)) {
    onTrue.call(this)
  }
}

function updateElement(elementID, value) {
  debugger;
  document.getElementById(elementID).innerHTML = value;
}
var ue = updateElement