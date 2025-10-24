var trainingStats = {
  baseAttack: 1,
  baseDefense: 0,
  spinning : 0
}
var temp = ""
var i;
function doNothing() {
  
}

function wait(n) {
setTimeout(doNothing(),n)
}

function queuetrain(type) {
if (type == "spinning") {
 wait(trainingStats.spinning)
 trainingStats.spinning += 1
 trainingStats.baseAttack += 1
}  
}

