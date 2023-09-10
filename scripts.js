//consulted Ania Kubow tutorial

const game = document.querySelector('#game')
const scoreDisplay = document.getElementById('score')
let score = 0
const genres = [
    {
    name: 'Film',
    id: 11
},
{
    name: 'Animals',
    id: 27
},
{
    name: 'Sports',
    id: 21
},
]
const levels = ['easy', 'medium', 'hard']
function addGenre(genre) {
    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    game.append(column)

    levels.forEach(level => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (level === 'easy') {
            card.innerHTML = 10
        }
        if (level === 'medium') {
            card.innerHTML = 20
        }
        if (level === 'hard') {
            card.innerHTML = 30
        }
    

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            card.setAttribute('data-question', data.results[0].question);
            card.setAttribute('data-answer', data.results[0].correct_answer);
            card.setAttribute('data-value', card.innerHTML);

        })
         

        .then(done => card.addEventListener('click', flipCard))

    })
}
genres.forEach(genre => addGenre(genre))

function flipCard() {
    
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')

    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'

    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')

    // Keeps questions from duplicating when True is selected
    trueButton.addEventListener('click', function(event) {
        event.stopPropagation();
        getResult.call(this); 
    });
    falseButton.addEventListener('click', function(event) {
        event.stopPropagation();
        getResult.call(this); 
    });
    
    textDisplay.innerHTML = this.getAttribute('data-question')

    this.append(textDisplay, trueButton, falseButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfClickedButton = this.parentElement
    if (cardOfClickedButton.getAttribute('data-answer') === this.innerHTML){
        score = score + parseInt(cardOfClickedButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfClickedButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfClickedButton.firstChild) {
                cardOfClickedButton.removeChild(cardOfClickedButton.lastChild)
            }
            cardOfClickedButton.innerHTML = cardOfClickedButton.getAttribute('data-value')
        }, 100);
        }    else {
        cardOfClickedButton.classList.add('incorrect-answer')
        setTimeout(() => {
            while (cardOfClickedButton.firstChild) {
                cardOfClickedButton.removeChild(cardOfClickedButton.lastChild);
            }
            cardOfClickedButton.innerHTML = 0
        }, 100)

            }
        
        }
