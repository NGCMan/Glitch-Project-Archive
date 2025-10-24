var newsArray = [
  "Welcome to Cookie Clicker Respecced",
  "Click, click, click...",
  "lol get rekt",
  "You can't reach 1.79e308",
  "That's a lot of cookies",
  "Cookie Clicker Respecced NG+++",
  "It'll be 5 hours until the update",
  "Contains microtransaction repellent",
  "This is a bad game",
  "Thanks to Yahtzee Master for helping (a lot)",
  "There's a discord server for this game",
  "noice",
  "Try to get 100,000 cookies",
  "Try to get 1,000,000 cookies",
  "'i fixed the bug and it's now back' -randomtuba",
  "Try to get 10,000,000 cookies >:)",
  "Do Alt+F4 for free Vbucks",
  "'Wait, this isn't cookie clicker' - everyone playing this for the first time",
  "yOu FeEl lIke maKinG cOoKieS, bUt noBodY waNtS to eAt yoUr CoOkIes",
  "Probably an Antimatter Dimensions ripoff",
  "Try to get 1 billion cookies, I dare you >:)",
  "Somebody once told me that cookies were gonna roll me",
  "Please no hyper cursors",
  "I hate this game just because the design is terrible -boomer",
  "Wait, how many messages are there?",
  "Thanks for adding logarithmica_numerus_lite.js",
  "pls like and scrubsibe for CCR content",
  "OMG HE ADDED MY NEWS TICKER",
  "[insert text here]",
  "showNews();",
  "Can you put an array inside of an array? -randomtuba",
  "Take the cookies from the shadow realm, and you're good to go!",
  "1e420.69",
  "Stop! Wait 5 hours",
  "randomtuba was slain by Xx_SuperCursor420_xX using 'ReCursors are 3x more powerful for 100 RE'",
  "bruh moment",
  "Sometimes you just wanna [REDACTED] someone so hard they split into the fifteenth dimension",
  "Don't you hate when the message <br> splits apart",
  "Don't you hate when the message is so long that it seems like it's and entire paragraph and basically you can't play the game, but you're probably just going to click on it just to get rid of it. What a horrible thing the developer(s) of Cookie Clicker Respecced would do to their players! Their 'fanbase' will probably plummet exponentially. Did you know that Cookie Clicker Respecced's CSS is the worst CSS imaginable? This game isn't even 'respecced', so why do people call it Cookie Clicker Respecced? Well, whatever. Are you still reading this message? You really don't have time to read this all the way through (the first time), unless if you're reading this from the news array in news.js. Anyway, goodbye!"
];

function showNews() {
  let message = Math.floor(Math.random() * newsArray.length);

  if(Math.round(Math.random(100,1)) == 100){
      document.getElementById("newsTicker").innerHTML = "You have a 1% chance to get this news ticker. Woah!";
  }else{
      document.getElementById("newsTicker").innerHTML = newsArray[message];
  }
}

function changeNews() {
  showNews();
}

setInterval(showNews, 10000);
