const quotes = [
    "The mystery of life isn't a problem to solve, but a reality to experience.",
    "The concept of progress acts as a protective mechanism to shield us from the terrors of the future.",
    "It is impossible to live in the past, difficult to live in the present and a waste to live in the future.",
    "Try looking into that place where you dare not look! You'll find me there, staring out at you!",
    "We faced it and did not resist. The storm passed through us and around us. It's gone, but we remain.",
];

let timePassed = 0;
let words = [];
let wordIndex = 0;
let startTime = Date.now();
let inputElement = document.querySelector(".input");

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedvalueElement = document.getElementById("typed-value");
const musicbutton = document.getElementById("music-button");

var highscoreElement = document.getElementById("highscore");
var mymodal = document.getElementById("modal-block");
var closeSpan = document.getElementsByClassName("close")[0];


closeSpan.onclick = function(){
    mymodal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target = "modal") {
        mymodal.style.display = "none";
    }
}

// after clicking, picks a random quote and then highligths the words sequentially
document.getElementById("start").addEventListener("click", () => {
    person = getName();
    // get a quote
    inputElement.disabled = false;
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(" ");
    wordIndex = 0;

    // ui updates
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    quoteElement.innerHTML = spanWords.join("");
    quoteElement.childNodes[0].className = "highlight";
    messageElement.innerText = "";
    
    // setup textbox
    typedvalueElement.value = "";
    typedvalueElement.focus();

    // start timer
    startTime = new Date().getTime();
});

typedvalueElement.addEventListener("input", () => {
    const currentWord = words[wordIndex];
    const typedValue = typedvalueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1){
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Congrats! You finished in ${elapsedTime / 1000} seconds.`;
        
        messageElement.innerText = message;
        inputElement.disabled = true;

        if (person != null) {
            document.getElementById("msg").innerHTML = "Success!! Good job, " + person + " :)";
        }
        else {
            document.getElementById("msg").innerHTML = "Who tf are you? >:(";
        }
        mymodal.style.display = "block";
        
        scoreTable(person, elapsedTime);

        
    }
    else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord){
        typedvalueElement.value = "";
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = "";
        }
        quoteElement.childNodes[wordIndex].className = "highlight";
    } 
    else if (currentWord.startsWith(typedValue)){
        typedvalueElement.className = "";
    }
    else {
        typedvalueElement.className = "error";
    }
});

highscoreElement.addEventListener("click", () => {
    highscoreElement.style.display = "none";
    r = localStorage.getItem("Highscores"?? "No Data");
                    
    rr = (JSON.parse(JSON.stringify(r)));
    console.log((rr))
});

function getName() {
    var person = prompt("Enter your nickname:", "CoolChiliPepper");
    return person;
}

function scoreTable(currentPerson, elapsedTime) {
    
    result = {username : currentPerson, score : elapsedTime};
    
    const savedScores = localStorage.getItem("Highscores") ?? "[]";
    const highscores = [(JSON.parse(JSON.stringify(savedScores))), JSON.stringify(result)]; // add the result

    localStorage.setItem("Highscores", highscores);
}