document.body.style.backgroundColor = randomColour();

const quoteArr = [
  "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.<footer class=\"blockquote-footer\">Albert Camus</footer>",
  "In the depth of winter, I finally learned that within me there lay an invincible summer.<footer class=\"blockquote-footer\">Albert Camus</footer>",
  "Without music, life would be a mistake.<footer class=\"blockquote-footer\">Friedrich Nietzsche</footer>",
  "Don't cry because it's over, smile because it happened.<footer class=\"blockquote-footer\">Dr. Seuss</footer>",
  "Be yourself, everyone else is already taken.<footer class=\"blockquote-footer\">Oscar Wilde</footer>",
  "A room without books is like a body without a soul.<footer class=\"blockquote-footer\">Marcus Tullius Cicero</footer>",
  "Always forgive your enemies, nothing annoys them so much.<footer class=\"blockquote-footer\">Oscar Wilde</footer>" ,
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.<footer class=\"blockquote-footer\">Ralph Waldo Emerson</footer>",
  "We may encounter many defeats but must never be defeated.<footer class=\"blockquote-footer\">Maya Angelou</footer>",
  "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.<footer class=\"blockquote-footer\">Maya Angelou</footer>",
  "If you tell the truth, you don't have to remember anything.<footer class=\"blockquote-footer\">Mark Twain</footer>"
];

function displayQuote() {
  const randomQuote = Math.floor(Math.random() * (quoteArr.length));
  document.getElementById('quote-display').innerHTML = quoteArr[randomQuote];
  document.body.style.backgroundColor = randomColour();

  let tweetQuote = quoteArr[randomQuote].split(' ').join('%20');
  console.log(tweetQuote);
  tweetQuote = tweetQuote.split("<footer%20class=\"blockquote-footer\">").join(' — ');
  tweetQuote = tweetQuote.split('</footer>').join('');
  console.log(tweetQuote);
  tweetQuote = "https://twitter.com/intent/tweet?text=" + tweetQuote.split('"').join('')
  $('.twitter-btn').attr('href', tweetQuote);
}

function randomColour() {
  let randomRed = Math.floor(Math.random() * 256);
  let randomBlue = Math.floor(Math.random() * 256);
  let randomGreen = Math.floor(Math.random() * 256);
  let randomRGB = "rgb("+randomRed+ "," +randomBlue+ "," +randomGreen+")";
  return randomRGB;
}
