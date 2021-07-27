import "./styles/index.scss";

document.addEventListener('DOMContentLoaded', () => {
    const RANDOM_QUOTE_API = 'http://api.quotable.io/random'
    const quoteDisplayElement = document.getElementById('quoteDisplay')
    const quoteInputElement = document.getElementById('quoteInput')


    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span')
        const arrayValue = quoteInputElement.value.split('')
        let correct = true


        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if (character === null){
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                correct = false

            }
        })

        if (correct) getNextQuote()
    })

    function getRandomQuote() {
        return fetch(RANDOM_QUOTE_API)
            .then(res => (res.json()))
            // .then(res => res.json())
            .then(data => data.content)
    }

    async function getNextQuote() {
        const quote = await getRandomQuote()
        quoteDisplayElement.innerText = ''
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            // characterSpan.classList.add('correct')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
        })
        quoteInputElement.value = null
    }

    getNextQuote()

})