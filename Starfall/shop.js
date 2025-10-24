var weaponsbought = 0
function shop() {
 document.getElementById("shopActions").style.visibility = "visible" 
}
function exitShop() {
 document.getElementById("shopActions").style.visibility = "hidden"
}
class shopItem {
  constructor(g,item,args=[]) {
    this.g=g
    this.item=item
    this.args=args
  }
  buy(){
    if (game.player.gold>=this.g) {
      let tempItem=this.item
      if (typeof this.item=="function") {
          this.item=this.item(...this.args)
      }
      game.player.gold-=this.g
      game.player.inv[game.player.inv.length]=this.item
      sendMessage("You bought " + (['a','e','i','o','u'].includes(this.item.name[0].toLowerCase())?"an ":'a ')+this.item.name+"!")
      updateInv()
      this.item=tempItem
    } else {
      sendMessage("You can't afford that!")
    }
    
  }
  debug(){

      let tempItem=this.item
      if (typeof this.item=="function") {
          this.item=this.item(...this.args)
      }
      game.player.inv[game.player.inv.length]=this.item
      sendMessage("You \"bought\" " + (['a','e','i','o','u'].includes(this.item.name[0].toLowerCase())?"an ":'a ')+this.item.name+"! You sure did!")
      updateInv()
      this.item=tempItem
  
}
}
var shop1List = [
  new shopItem(10,new Weapon(7,()=>{},"sharp rock","It's very sharp. (Up to 6 DMG)")),
  new shopItem(5,new HealingItem(5,()=>{},1,"apple","A red, juicy apple. It makes your mouth water.")),
  new shopItem(100,getRandomWeapon,[0.3]),
  new shopItem(250,getRandomWeapon,[0.7,3]),
  new shopItem(100,getRandomArmor)
]
