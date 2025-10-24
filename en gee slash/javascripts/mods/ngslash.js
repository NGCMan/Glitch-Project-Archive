function activateNGSlash() {
if (modes.ngslash == 1) {
  player.galaxies = -2
  player.resets = -2
  player.infinities = -1000
  player.eternities = -100
  player.quantum.times = -25
  player.timestudy.theorem = -5
  if (player.quantum.times < 25) {
    getEC12Mult()
  }
  //player.money = new Decimal(250)
}
}