import "./styles/index.scss";
import Word from "./word";
import * as Canvas from './canvas'


document.addEventListener('DOMContentLoaded', () => {
    const wordsDisplayElement = document.getElementById('wordsDisplay')
    const wordsInputElement = document.getElementById('wordsInput')
    const timerElement = document.getElementById('timer')
    let arrayWords

    // const words = getRandomWords(10)
    const words = []

    for (let i = 0; i < 10; i++){
        words.push(new WordContainer)
    }

    // function wordFall() {
    //     const arrayWords = wordsDisplayElement.querySelectorAll("span");
        
    //     arrayWords.forEach
    // }
    let characterTyped = 0;
    let timeElapsed = 0;
    let total_errors = 0;

    wordsInputElement.addEventListener("input", () => {
        const arrayLetters = wordsDisplayElement.querySelectorAll("letter");
        const arrayValue = wordsInputElement.value.split("");
        let correct = true

        characterTyped++;
        
        arrayLetters.forEach((letter, index) => {
            const character = arrayValue[index]
            if (character == null) {
                letter.classList.remove('correct')
                letter.classList.remove('incorrect')
                correct = false
            } else if (character === letter.innerText) {
                letter.classList.add('correct')
                letter.classList.remove('incorrect')
            } else {
                letter.classList.remove('correct')
                letter.classList.add('incorrect')
                correct = false 
            }
        })
        // console.log(characterTyped)
        if (correct) getNextWords();
    });

    function getRandomWords(num) {
        var randomWords = require('random-words');
        return randomWords(num)
    }

    function getNextWords() {
        wordsDisplayElement.innerHTML = ''
        words.forEach((word, i) => {
            const wordSpan = document.createElement('span')
            wordSpan.classList = 'word'
            wordsDisplayElement.appendChild(wordSpan)
            arrayWords = wordsDisplayElement.querySelectorAll(".word");
            word.split('').forEach((character, j) => {
                const letter = document.createElement('letter')
                letter.innerText = character
                wordSpan.appendChild(letter)
                if (i < words.length - 1 && (j === word.length - 1)){
                    const space = document.createElement('letter')
                    space.innerText = ' '
                    wordSpan.appendChild(space)
                }
            })
            
        })
        
        wordsInputElement.value = null
        startTimer()
    }
    let startTime
    
    function startTimer() {
      timerElement.innerText = 0
      startTime = new Date()
      setInterval(() => {
        timer.innerText = getTimerTime()
        timeElapsed++;
      }, 1000)
    }
    
    function getTimerTime() {
      return Math.floor((new Date() - startTime) / 1000)
    }

    getNextWords()

    
})