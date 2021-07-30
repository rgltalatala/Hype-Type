import "./styles/index.scss";
import WordContainer from './word_container'
import Zone from './zone'

document.addEventListener('DOMContentLoaded', () => {
    const wordsDisplayElement = document.getElementById('wordsDisplay')
    const wordsInputElement = document.getElementById('wordsInput')
    const timerElement = document.getElementById('timer')
    let arrayWords
    
    var canvas = document.querySelector('canvas');
    canvas.width = 900;
    canvas.height = 375;

    var ctx = canvas.getContext('2d'); // context

    const words = getRandomWords(10)
    function charactersPerWordAvg () {
        let charactersPerWord = 0;

        words.forEach(word => {
            charactersPerWord += word.length
        })

        return charactersPerWord / 10
    }

    const wordContainers = [];
    for (let i = 0; i < 10; i++){
        wordContainers.push(new WordContainer(words[i], ctx, canvas))
    }

    let characterTyped = 0;
    let timeElapsed = 0;
    let misses = 0;
    window.misses = misses;
    let cpm = 0;
    let wpmElement = document.getElementById('wpm')
    let wpm = 0;
    let successes = 0;
    window.successes = successes

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight)
        let failZone = new Zone(ctx, canvas)
        failZone.draw()
        // wordContainer.update()
        for (var i = 0; i < wordContainers.length; i++){
            wordContainers[i].update()
            if (wordContainers[i].y >= 302){
                wordContainers[i].destroy()
                wordContainers.splice(i, 1);
                misses += 1
                console.log(misses)
            }
        }
    }
    
    function incrementSuccesses(){
        successes += 1;
    }

    function findAndDestroyWord(word){
        let index = wordContainers.map(el => el.text).indexOf(word);
        if(index !== -1){
            wordContainers[index].destroy();
            wordContainers.splice(index, 1);
            return true;
        }
        return false;
    }

    wordsInputElement.addEventListener("input", (e) => {
        const arrayLetters = wordsDisplayElement.querySelectorAll("letter");
        const arrayValue = wordsInputElement.value.split("");
        let correct = true

        //space character entered
        if(e.data === " "){
            let word = e.target.value.trim();
            let destroyed = findAndDestroyWord(word)
            if(destroyed){
                e.target.value = '';
                incrementSuccesses();
            }
        }

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
        // startTimer()
    }
    // let startTime
    
    // function startTimer() {
    //   timerElement.innerText = 0
    //   startTime = new Date()
    //   setInterval(() => {
    //     timerElement.innerText = getTimerTime()
    //     timeElapsed++;
    //   }, 1000)
    // }
    
    // function getTimerTime() {
    //   return Math.floor((new Date() - startTime) / 1000)
    // }

    let playButton = document.getElementById('play')
    playButton.addEventListener('click', () => {
        getNextWords()
        animate()    
        wordsInputElement.focus()
    })

    
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / charactersPerWordAvg()) / timeElapsed) * 60));
    // wpmElement.innerText = wpm
})