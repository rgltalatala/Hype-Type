import "./styles/index.scss";
import WordContainer from './word_container'
import Zone from './zone'

document.addEventListener('DOMContentLoaded', () => {
    const wordsDisplayElement = document.getElementById('wordsDisplay')
    const wordsInputElement = document.getElementById('wordsInput')
    const resetButton = document.getElementById('reset')
    const timerElement = document.getElementById('timer')
    const scoreElement = document.getElementById('score')
    const wordCounterElement = document.getElementById('wordCounter')
    
    let gameOver = false;
    let arrayWords
    let wordCount = 0;
    var canvas = document.querySelector('canvas');
    canvas.width = 900;
    canvas.height = 375;

    var ctx = canvas.getContext('2d'); // context
    var words = getRandomWords(10)

    let wordContainers = [];
    for (let i = 0; i < 10; i++){
        wordContainers.push(new WordContainer(words[i], ctx, canvas))
    }

    let misses = 0;
    let successes = 0;
    let score = 0

    function animate(){
        ctx.clearRect(0, 0, innerWidth, innerHeight)
        let failZone = new Zone(ctx, canvas)
        failZone.draw()
        
        for (var i = 0; i < wordContainers.length; i++){
            wordContainers[i].update()
            if (wordContainers[i].y >= 302){
                wordContainers[i].destroy()
                wordContainers.splice(i, 1);
                misses += 1
                score -= 50
                wordCount += 1
                scoreElement.innerHTML = score
                wordCounterElement.innerHTML = wordCount
            }
        }

        handleGameStatus()
        // if (gameOver === false){
        requestAnimationFrame(animate);
        // }
    }
    
    function incrementSuccesses(){
        successes += 1;
        score += 50
        wordCount += 1
        scoreElement.innerHTML = score
        wordCounterElement.innerHTML = wordCount
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

        // space character entered
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
    }

    let playButton = document.getElementById('play')
    playButton.addEventListener('click', () => {
        if (gameOver) {
            words = getRandomWords(10);
            gameOver = false;
            wordContainers = [];
            for (let i = 0; i < 10; i++){
                wordContainers.push(new WordContainer(words[i], ctx, canvas))
            }
        }
        animate()    
        getNextWords()
        wordsInputElement.focus()
        playButton.disabled = "disabled"
    })

    function handleGameStatus(){
        if (misses + successes === 10){
            gameOver = true
        }

        if (gameOver){
            ctx.fillStyle = 'black';
            ctx.font = '90px Somatic-Rounded';
            ctx.fillText('GAME OVER', 180, 125);
            ctx.fillStyle = 'white';
            resetButton.style.display = "inline"
        }
    }
    
})