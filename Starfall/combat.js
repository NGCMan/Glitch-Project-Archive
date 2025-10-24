var inventoryOpen = 0
var randomChance = Math.random() //it doesn't work like that
let random=()=>Math.random()//random() returns a random number between 0 and 1
let r=random
var weaponpower = 2
var encounterAudio = document.getElementById("encounter");
var temp = ""
var Eencounter=document.getElementById("EbattleText")
window.onload=()=>{
window.encounter=document.getElementById("battleText")
window.Eencounter=document.getElementById("EbattleText")
}
function attack() {
  game.player.weapon.attack(game.player,game.enemy,false)
  game.enemy.weapon.attack(game.player,game.enemy,false)
}
class Spell {
  constructor(exec=(enemy)=>{enemy.hp=enemy.hp-5;encounter.innerHTML="Fireball!"},mp=3,name="Fireball",desc="Summon a fireball!") {
    this.mp=mp
    this.exec=exec
    this.name=name
    this.desc=desc
  }
  cast(self,enemy) {
    if (inBattle === 1) {
    if (self.mp>0) {
      if (this.name!="Cancel") {
      self.mp=self.mp-this.mp
      this.exec(enemy)
      Eattack(game.player.defstack>0)
    }} else {
      encounter.innerHTML="You don't have enough MP!"
    }
  }
  }
  equip() {
   if (!(game.player.spells.map((x)=>{x.name}).includes(this.name))){
     game.player.spells[game.player.spells.length]=this
   } 
  }
  toString() {
   return this.mp+"|"+this.exec+"|"+this.name+"|"+this.desc 
  }
  toJSON() {
    return {
      mp: this.mp,
      exec: this.exec.toString(),
      name: this.name,
      desc: this.desc
    }
  }
  static fromJSON(json) {
    return new Spell(json.mp,eval(json.exec),json.name,json.desc)
  }
}
class Weapon {
  constructor(dmg=3,special=(self,enemy)=>{console.log("poison effects for later"); return ""},name="Nothing...",desc="You literally only have your fists. Come on.") {
    this.dmg=dmg
    this.name=name
    this.desc=desc
    this.special=special
  }
  attack(self,enemy,firsthit=false) {
    if (inBattle === 1) {
    let tempDmg=Math.round(this.dmg*(r()*0.5+0.5))
    if (tempDmg>game.enemy.def) {
      tempDmg-=Math.round(game.enemy.def)
    } else {
      tempDmg=0
    }
    enemy.hp=enemy.hp-tempDmg
    let effects = this.special.call(this,self,enemy)
    let msg="Attacked for "+tempDmg+"!"
    if (!!effects) {
      msg+=" Also "+effects+"!"
    }
    Object.keys(enemy.eff).forEach((x)=>{
    if (enemy.eff[x].count<=0) {
      enemy.eff[x].tick(enemy,self)
    }
    })
    Object.keys(self.eff).forEach((x)=>{
    if (self.eff[x].count<=0) {
      self.eff[x].tick(self,enemy)
    }
    })
    if (game.enemy.hp<0.00001 && inBattle === 1) {
    Eencounter.innerHTML=game.enemy.name+" is defeated!"
    sendMessage(game.enemy.name + " is defeated!")
    game.player.mp+=1
    randomChance = 1
    game.player.gold += game.enemy.gold 
      if (firsthit) {
        msglog.pop()
        msglog.pop()
      }
    inBattle=0
    }
    encounter.innerHTML=msg
    Eattack(game.player.defstack>0)
  }
  }
  equip() {
    game.player.weapon=this
  }
  toString() {
    return "Weapon|"+this.dmg+"|"+this.name+"|"+this.desc+"|"+this.special
  }
  toJSON() {
    return {
      type:"Weapon",
      dmg: this.dmg,
      name: this.name,
      desc: this.desc,
      special: this.special.toString()
    }
  }
  static fromJSON(json) {
    console.log(json)
    return new Weapon(json.dmg,eval(json.special),json.name,json.desc)
  }
}
class Gear {
  constructor(def=0,hp=1,mp=0,name="Græy Shirt",desc="Boring.") {
    this.def=def
    this.hp=hp
    this.name=name
    this.mp=mp
    this.desc=desc
  }
  
  equip () {
    game.player.equip=this
  }
  toString() {
    return `Gear|${this.def}|${this.hp}|${this.name}|${this.desc}|${this.mp}`
  }
  toJSON() {
    return {
      type: "Gear",
      def: this.def,
      hp: this.hp,
      name: this.name,
      mp: this.mp,
      desc: this.desc
    }
  }
  static fromJSON(json) {
    return new Gear(json.def,json.hp,json.mp,json.name,json.desc)
  }
}
class HealingItem {
  constructor(hp,sideEffects,number,name,desc) {
    this.hp=hp
    this.sideEffects=sideEffects
    this.number=number
    this.name=name
    this.desc=desc
  }
  use() {
    game.player.hp+=this.hp
    this.sideEffects()
    this.number-=1
    if (game.player.hp>game.player.mhp+game.player.equip.hp) {
      game.player.hp=game.player.mhp+game.player.equip.hp
    }
  }
  toString() {
    return `HealingItem|${this.hp}|${this.sideEffects}|${this.number}|${this.name}|${this.desc}`
  }
  toJSON() {
    return {
      type: "HealingItem",
      hp: this.hp,
      sideEffects: this.sideEffects.toString(),
      number: this.number,
      name: this.name,
      desc: this.desc
    }
  }
  static fromJSON(json) {
    return new HealingItem(json.hp, eval(json.sideEffects),json.number,json.name,json.desc)
  }
}
class Effect {
 constructor(funct, count, name) {
   this.funct=funct
   this.count=count
   this.name=name
 } 
 
  tick(self,other) {
    this.funct(self,this.count,other)
  }
  
  add(obj) {
    if (this.name in obj) {
      obj[this.name].count+=this.count
    } else {
      obj[this.name]=this
    }
  }
  toString() {
    return `${this.funct}|${this.count}|${this.name}`
  }
  toJSON() {
    return {
      funct: this.funct.toString(),
      count: this.count,
      name: this.name
    }
  }
  static fromJSON(json) {
    return new Effect(eval(json.funct),json.count,json.name)
  }
}

var updateSpells=(self)=>{
  if (inBattle === 1) {
  let tempER=document.getElementById("magiks").innerHTML
  let temp="<p>MP:"+game.player.mp+"/"+(game.player.mmp+game.player.equip.mp)+"</p><ul>"
  self.spells.forEach((s,i)=>{
    temp+="<li><button id=\"spell"+i+"\">"+s.name+"</button></li>"
  })
  temp+="</ul>"
  document.getElementById("magiks").innerHTML=temp
  document.getElementById("magiks").style.display="block"
  self.spells.forEach((s,i)=>{
    document.getElementById("spell"+i).onclick=()=>{s.cast(game.player,game.enemy);document.getElementById("magiks").style.display="none"}
  })
}
}
function Eattack(def=false) {
  if (inBattle === 1) {
  let atk=Math.floor(game.enemy.atk*(r()*0.5+0.5)/(def?2:1))-1
  let tempatk=atk
  console.log(atk)
  if (atk>game.player.def+game.player.equip.def) {
    atk-=game.player.def+game.player.equip.def
  } else {
    atk=0
  }let distFactor=Math.ceil(Math.pow(window.dist,0.3333333333333333333333))
    if (distFactor>25) {//25*25*25=15625
      atk=Math.ceil(tempatk/20*distFactor/25)+atk
    }
    if (atk>tempatk) {
      atk=tempatk
    }
    atk=Math.round(atk)
  
  console.log(atk)
  Eencounter.innerHTML=game.enemy.name+" attacked for "+atk+"!"
    game.enemy.weapon.special(game.enemy,game.player)
  game.player.hp=game.player.hp-atk
  game.player.defstack-=1
}}
function defend() {
  if (inBattle === 1) {
  game.player.defstack=3
  Eattack(true)
  encounter.innerHTML="Blocked! Defended for 3 turns!(50% dmg reduction)"
}
}
function updateInv() {
  document.getElementById("eqips").innerHTML = ""
      temp="<p>Equipment:</p><ul>"
      let aplCount = 0
      let aplI = 0
      game.player.inv.forEach((x,i)=>{
        if (!(x instanceof HealingItem)) {
          temp +='<div class="spaecerContainer"><li class="spaecer"><button id=equip'+i+">Equip "+x.name+"</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id=throw"+i+">Throw away.</button></li>"+x.desc+"</div>"
        }
        if (x instanceof HealingItem) {
          aplCount++
          aplI = i
        }
      })
   if(aplCount > 0) temp += '<div class="spaecerContainer"><li class="spaecer"><button id=useItem onclick="useAndSplice('+aplI+')">Use apple ('+aplCount+')</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>A red, juicy apple. It makes your mouth water.</div>'
      document.getElementById("eqips").innerHTML=temp
      game.player.inv.forEach((x,i)=>{
        if (!(x instanceof HealingItem)) {
          document.getElementById("equip"+i).onclick=game.player.inv[i].equip()
          document.getElementById("throw"+i).onclick=()=>{game.player.inv.splice(i,1)}
        }
      })
    }
function useAndSplice(blah) {
  game.player.inv[blah].use()
  game.player.inv.splice(blah,1)
  updateInv()
}
function openInv() {
  document.getElementById("eqips").style.display = "block"
  document.getElementById("eqips").style.visibility = "visible"
  document.getElementById("eqips").style.position = "static"
}
function closeInv() {
  document.getElementById("eqips").style.display = "none"
  document.getElementById("eqips").style.position = "static"
}
function getRandomWeapon(luck=0.55,basemods=1) {
  let weapon=new Weapon()
  let modifiers=basemods
  while(Math.random()>1-luck) {
    modifiers++
  }
  let modlist=[{mod:(s,enemy)=>{game.enemy.gold+=2},name:"Lucky"},
               {mod:(s,enemy)=>{game.enemy.hp-=1},name:"Sharp"},
               {mod:(s,enemy)=>{if (Math.random()<0.1) {game.enemy.hp-=Math.round(game.player.weapon.dmg)}},name:"Random"},
               {mod:(s,enemy)=>{game.player.weapon.dmg+=game.player.gold/50000},name:"Valuable"},
               {mod:(s,enemy)=>{new Effect((s)=>{this.count-=s.hp-(s.mhp+s.equip.hp);s.hp=(s.mhp+s.equip.hp)},100,"Overheal").add(game.player)},name:"Healing"},
               {mod:(s,enemy)=>{game.player.mp+=1;if (game.player.mmp<game.player.mp) {game.player.mp=game.player.mmp}},name:"Magical"},
               {mod:(s,enemy)=>{enemy.hp-=Math.floor(game.player.weapon.dmg/10)},name:"Obliterating"},
               {mod:(s,enemy)=>{enemy.gold+=Math.ceil(Math.random()*5)},name:"Quite lucky"},
               {mod:(s,enemy)=>{game.player.spd+=game.player.weapon.dmg/10000},name:"Fast"},
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.hp-=c;this.c-=Math.ceil(this.c/5)},Math.floor(game.player.weapon.dmg),"Poison").add(game.enemy.eff)},name:"Poisonous"},
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.def-=c/25;this.c-=Math.ceil(this.c/5)},Math.floor(game.player.weapon.dmg),"Decay").add(game.enemy.eff)},name:"Decaying"},
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.atk-=c/25;this.c-=Math.ceil(this.c/5)},Math.floor(game.player.weapon.dmg),"Weak").add(game.enemy.eff)},name:"Weakening"},
              {mod:(s,enemy)=>{new Effect((e,c,o)=>{e.hp-=c/4;o.hp+=c/4;this.c-=Math.ceil(this.c/5)},Math.floor(game.player.weapon.dmg),"Lifesteal").add(game.enemy.eff)},name:"Draining"}]
  let x=0
  let actmodlist=[]
  while (x<modifiers) {
    actmodlist[actmodlist.length]=modlist[Math.floor(modlist.length*Math.random())]
    x++
  }
  let string=""
  let special=(self,enemy)=>{
    actmodlist.forEach((x)=>{
      x.mod(self,enemy)
    })
  }
  actmodlist.forEach((x)=>{string+=x.name+" "})
  string+="Sword"
  weapon.dmg=modifiers+3
  weapon.name=string
  weapon.special=special
  weapon.desc=((['a','e','i','o','u'].includes( string[0].toLowerCase() )) ? "An ":'A ')+" "+string+". What did you expect?"
  return weapon
}
function GetSpecificWeapon(mods=[0,1,2,3,4,5,6,7,8,9,10,11,12]) {
  let weapon=new Weapon()
  let modlist=[{mod:(s,enemy)=>{game.enemy.gold+=2},name:"Lucky"},//0
               {mod:(s,enemy)=>{game.enemy.hp-=1},name:"Sharp"},//1
               {mod:(s,enemy)=>{if (Math.random()<0.1) {game.enemy.hp-=Math.round(game.player.weapon.dmg)}},name:"Random"},//2
               {mod:(s,enemy)=>{game.player.weapon.dmg+=game.player.gold/50000},name:"Valuable"},//3
               {mod:(s,enemy)=>{new Effect((s)=>{this.count-=s.hp-(s.mhp+s.equip.hp);s.hp=(s.mhp+s.equip.hp)},100,"Overheal").add(s)},name:"Healing"},//4
               {mod:(s,enemy)=>{game.player.mp+=1;if (game.player.mmp<game.player.mp) {game.player.mp=game.player.mmp}},name:"Magical"},//5
               {mod:(s,enemy)=>{enemy.hp-=Math.floor(game.player.weapon.dmg/10)},name:"Obliterating"},//6
               {mod:(s,enemy)=>{enemy.gold+=Math.ceil(Math.random()*5)},name:"Quite lucky"},//7
               {mod:(s,enemy)=>{game.player.spd+=game.player.weapon.dmg/10000},name:"Fast"},//8
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.hp-=c/3},Math.floor(game.player.weapon.dmg),"Poison").add(game.enemy.eff)},name:"Poisonous"},//9
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.def-=c/25},Math.floor(game.player.weapon.dmg),"Decay").add(game.enemy.eff)},name:"Decaying"},//10
              {mod:(s,enemy)=>{new Effect((e,c)=>{e.atk-=c/25},Math.floor(game.player.weapon.dmg),"Weak").add(game.enemy.eff)},name:"Weakening"},//11
              {mod:(s,enemy)=>{new Effect((e,c,o)=>{e.hp-=c/10;o.hp+=c/10},Math.floor(game.player.weapon.dmg),"Lifesteal").add(game.enemy.eff)},name:"Draining"}//12
              ]
  let x=0
  let actmodlist=[]
  actmodlist=mods.map((x)=>modlist[x])
  let string=""
  let special=(self,enemy)=>{
    actmodlist.forEach((x)=>{
      x.mod(self,enemy)
    })
  }
  actmodlist.forEach((x)=>{string+=x.name+" "})
  string+="Sword"
  weapon.dmg=actmodlist.length+3
  weapon.name=string
  weapon.special=special
  weapon.desc=(['a','e','i','o','u'].includes( string[0].toLowerCase() ))?"an ":'a '+" "+string+". What did you expect?"
  return weapon
}
function getInvItem(gear) {
  game.player.inv[game.player.inv.length]=gear
}
function getRandomArmor(luck=0.9) {
  let hp=1
  while (Math.random()<luck) {
    hp++
  }
  return new Gear(hp/2,hp)
}
function spawn_grass_enemy(distFactor) {
  if (r() <= 0.01*Math.pow(distFactor,0.75) && inBattle === 0) {

  if (r() >= 0.125*distFactor && inBattle === 0) {
  sendMessage("A bug appears!")
  encounterAudio.play()
  inBattle = 1
  game.enemy=new Entity(10*distFactor,10*distFactor,1,1,0,1*distFactor,0*distFactor,[],new Weapon(),"A bug",[game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1],1,2*distFactor)
} else if (r() >= -0.2+(0.0625*distFactor) && inBattle === 0) {
  sendMessage("A rat appears!")
  encounterAudio.play()
  inBattle = 1
  setEnemy(25,25,1,1,0.5,1.4,0,[],new Weapon(), "A rat", "default", 2, 5, distFactor)
} else if (r() >= -0.3+(0.0625/2*distFactor) && inBattle === 0) {
  sendMessage("A large rat appears!")
  encounterAudio.play()
  inBattle = 1
  game.enemy=new Entity(100*distFactor,100*distFactor,1*distFactor,1*distFactor,1*distFactor,3*distFactor,0*distFactor,[],new Weapon(),"A large rat",[game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1],3,15*distFactor)
} else if (r() >= -1+(0.0625/25*distFactor) && inBattle === 0) {
  sendMessage("A house-sized rat appears... Somehow! The square-cube law sucks!")
  encounterAudio.play()
  inBattle = 1
  game.enemy=new Entity(3000*distFactor,10000*distFactor,1*distFactor,1*distFactor,0*distFactor,25*distFactor,0*distFactor,[],new Weapon(),"An impossibly large rat",[game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1],3,50*distFactor)
} else {
  sendMessage("An abnormal rat appears...")
  encounterAudio.play()
  inBattle = 1
  game.enemy=new Entity(30000*distFactor,100000*distFactor,1*distFactor,1*distFactor,0*distFactor,25*distFactor,0*distFactor,[],GetSpecificWeapon([10]),"An omni-rat",[game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1],3,50*distFactor)
}
game.player.weapon.attack(game.player,game.enemy,true)
}
}
function spawn_desert_enemy(distFactor) {
  if (r() < 0.07) {
    if(r() > 0.5) {
      sendMessage("A bug appears! These are getting pretty annoying...")
      encounterAudio.play()
      inBattle = 1
      game.enemy=new Entity(10*distFactor,10*distFactor,1,1,0,1*distFactor,0*distFactor,[],new Weapon(),"A bug",[game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1],1,2*distFactor)
    } 
    else if(r() > 0.2) {
      sendMessage("A desert rat appears!")
      encounterAudio.play()
      inBattle = 1
      setEnemy(25,25,1,1,0.5,1.8,0,[],new Weapon(), "A desert rat", "default", 2, 5, distFactor)
    } else {
      sendMessage("A camel appears!")
      encounterAudio.play()
      inBattle = 1
      setEnemy(25,25,1,1,0.5,2.2,0,[],new Weapon(), "A camel", "default", 2, 5, distFactor)
    }
  }
}
function setEnemy(a,b,c,d,e,f,g,h,i,j,k,l,m,distFactor) {
 game.enemy = new Entity(a*distFactor, b*distFactor, c*distFactor, d*distFactor, e*distFactor, f*distFactor, g*distFactor, h, i, j, [game.player.posVector[1]+0.1,game.player.posVector[2],game.player.posVector[3]+0.1], l, m*distFactor) 
}