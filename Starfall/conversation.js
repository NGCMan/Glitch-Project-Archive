//For all the talking nonsense that'll go on in game.
var introSent = [false, false, false, false];
class Message {
  constructor(text, afterSend = () => {}) {
    this.text = text;
    this.afterSend = afterSend;
  }

  send() {
    msglog.push(this.text);
    const msglog2 = document.getElementById("messageBox");
    makeMessageElement(this.text);
    while (msglog2.clientHeight < msglog2.scrollHeight)
      msglog2.removeChild([...document.querySelectorAll(".messageBox p")][0]);
    this.afterSend();
  }
}
let msglog = ["???: I was wondering when you were gonna wake up."];
let msgs = [
  new Message("???: My name is classified. I will tell you later.", () => {
    introSent[0] = true;
  }),
  new Message(
    "???: I found you unconscious on the pavement, so I picked you up and made sure you were okay.",
    () => {
      introSent[1] = true;
    }
  ),
  new Message("???: You are in Dystonia.", () => {
    introSent[2] = true;
  }),
  new Message("???: Hello? Can you hear me?"),
  new Message(
    "???: Can you walk? Try using WASD or the arrow keys. You might want to be careful of some bugs and rats.",
    () => {
      introSent[3] = true;
    }
  )
];

function talk() {
  document.getElementById("talkbutton").style.display = "none";
  document.getElementById("talkActions").style.visibility = "visible";
}
function sendMessage(message) {
  new Message(message).send();
  if (message == "") {
    throw "DEBUG ERROR";
  }
}

function getCount(parent, getChildrensChildren) {
  var relevantChildren = 0;
  var children = parent.childNodes.length;
  for (var i = 0; i < children; i++) {
    if (parent.childNodes[i].nodeType != 3) {
      if (getChildrensChildren) " ";
      relevantChildren += getCount(parent.childNodes[i], true);
      relevantChildren++;
    }
  }
  return relevantChildren;
}

function makeMessageElement(text = "", useDefaultIDs = true, customID) {
  let msgEles = getCount(document.getElementsByClassName("messageBox")[0]);
  let newEle = document.createElement("p");
  if (useDefaultIDs) {
    newEle.id = "message" + (msgEles + 1);
  } else {
    newEle.id = customID;
  }
  newEle.appendChild(document.createTextNode(text));
  document.getElementsByClassName("messageBox")[0].appendChild(newEle);
  return newEle;
}

let getLast = x => x.children[x.children.length - 1];
var story = [
  {
    msg: new Message("There seems to be a lot of enemies here..."),
    condition: "dist>27",
    sent: false
  },
  {
    msg: new Message("Who was that person anyway?"),
    condition: "dist>40",
    sent: false
  },
  {
    msg: new Message("It seems very hot around here..."),
    condition: "getLocation(game.player.posVector) == 'desert'",
    sent: false
  },
  {
    msg: new Message(
      "There seems to be a wall here. Maybe try going around it?"
    ),
    condition: "inWall(game.player.posVector)[2] === 'grass-mountain'",
    sent: false
  },
  {
    msg: new Message(
      "There is a vast sea here. Looks like there are some sharks."
    ),
    condition: "inWall(game.player.posVector)[2] === 'grass-ocean'",
    sent: false
  },
  {
    msg: new Message(
      "You've been 1km out now. Those pests are about ten times stronger, and theres a lot more of them. You must be doing something right."
    ),
    dist: 1000,
    sent: false
  },
  {
    msg: new Message("God, 8km? These things are getting WAY stronger fast.."),
    dist: 8000,
    sent: false
  },
  { msg: new Message("Ow."), dist: 15625, sent: false },
  {
    msg: new Message(
      "There seems to be way more enemies than at the start, and somehow they're bigger..."
    ),
    dist: 27000,
    sent: false
  },
  {
    msg: new Message(
      "As you think about it ??? probably brought you here for some purpose. You don't know why but it you can tell..."
    ),
    dist: 64000,
    sent: false
  },
  {
    msg: new Message("These rats are getting way bigger."),
    dist: 125000,
    sent: false
  },
  {
    msg: new Message(
      "At this point, Dystonia is a country. Maybe you should try the other axis."
    ),
    dist: 1000000,
    sent: false
  },
  {
    msg: new Message("Maybe try building a rocket."),
    dist: 8000000,
    sent: false
  },
  {
    msg: new Message(
      "Maybe these massive rats can give you metal, or you can get scrap from the shop."
    ),
    dist: 27e6,
    sent: false
  },
  { msg: new Message("Ouch."), dist: 125e6, sent: false },
  { msg: new Message("You should do that."), dist: 216e6, sent: false },
  {
    msg: new Message("New option in the shop!(coming in 5 hours)"),
    dist: 343e6,
    sent: false
  },
  { msg: new Message("How?"), dist: 1e9, sent: false },
  { msg: new Message("How."), dist: 1e12, sent: false },
  { msg: new Message("HOW!"), dist: 1e15, sent: false }
];

setInterval(() => {
  story.forEach(x => {
    if (!x.sent) {
      if (Function("return " + x.condition)()) {
        x.msg.send();
        x.sent = true;
      }
    }
  });
}, 100);
