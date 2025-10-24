function inHitbox(posVector, req) {
  return req[0] < posVector[0] && posVector[0] < req[1] && req[2] < posVector[2] && posVector[2] < req[3]
}
const hitBoxes = {
  "grass": [-25,30,-25,50],
  "desert": [30,90,20,80]
}
function getLocation(posVector) {
  let area = ""
  for(let i in hitBoxes) {
    if(inHitbox(posVector,hitBoxes[i])) {
      area = i
    }
  }
  return area
}
function inWall(posVector) {
  const walls = {
    "grass-mountain": [-25,70,48,52],
    "grass-ocean": [-24,-26,-25,50]
  }
  const wallBlockdirs = {
    "grass-mountain": 90,
    "grass-ocean": 180
  }
  const wallCheckers = {
    "grass-mountain": posVector[2] > 50,
    "grass-ocean": posVector[0] < -25
  }
  let inWall = false
  for(let i in walls) {
    if(inHitbox(posVector, walls[i])) {
      inWall = true
      return [inWall, (wallBlockdirs[i]+(180*wallCheckers[i])) % 360, i]
    }
    return [false, "none", "none"]
  }
}