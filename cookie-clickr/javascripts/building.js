class Building extends hasCache {
  constructor(name, baseCost, costScale, amount = 0, bought = 0) {
    super()
    this.name = name
    this.baseCost = D(baseCost)
    this.costScale = D(costScale)
    this.amount = D(amount)
    this.bought = D(bought)
  }
  
  get cost() {
    callCache("cost", function() {
      return Decimal.floor(this.baseCost.times(Decimal.pow(this.costScale, this.bought)))
    })
  }
  
  buy() {
    if (player.cookies.gte(this.cost)) {
      player.cookies = player.cookies.minus(this.cost)
      this.amount = this.amount.plus(1)
      this.bought = this.bought.plus(1)
      this.doCache.cost = false
      this.updateDisplay()
      updateCookies()
    }
  }
  
  updateDisplay() {
    ue(`${this.name}s`, `${this.name}s: ${this.amount}`)
    ue(`buy${this.name}`, `Buy a ${this.name} for ${bf(this.cost)}`)
  }
}