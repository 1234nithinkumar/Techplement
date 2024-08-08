"use strict";

const quoteTxt = document.querySelector(".quote");
const btnQuote = document.querySelector('.btn-quote');
const authorEl = document.querySelector(".author");
const speechEl = document.querySelector(".speech");
const copyEl = document.querySelector(".copy");
const twitterEl = document.querySelector(".twitter");
const messageEl = document.querySelector(".message");

// Random Quote Generator
async function randomQuote() { 
    btnQuote.textContent = "loading";

    const data = await fetch("https://quotes-api-self.vercel.app/quote");
    const result = await data.json();
    console.log(result);
    const { quote, author} = result;
    quoteTxt.textContent = quote;
    authorEl.textContent = author;  
    btnQuote.textContent = "New Quote";
}
    
    
function speechTxt() {
    if (quoteTxt.textContent.trim()) {
        let speechText = new SpeechSynthesisUtterance();
        speechText.text = quoteTxt.textContent;
        speechText.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.speak(speechText);
    }
}

// Button Events
copyEl.addEventListener("click", () => {
    if (quoteTxt.textContent.trim()) {
        navigator.clipboard.writeText(quoteTxt.innerText);
        messageEl.classList.add("active");
        setTimeout(() => {
            messageEl.classList.remove("active");
        }, 2500);
    }
});

twitterEl.addEventListener("click", () => {
    if (quoteTxt.textContent.trim() && authorEl.textContent.trim()) {
        let tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteTxt.innerText)} - ${encodeURIComponent(authorEl.innerText)}`;
        window.open(tweet, "_blank");
    }
});

speechEl.addEventListener("click", speechTxt);
btnQuote.addEventListener("click", randomQuote);

