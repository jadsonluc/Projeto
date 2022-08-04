
var board = []
var currentGame = []
var savedGames = []

var state = {board: [], currentGame: [], savedGames: []};

function start() {
    createBoard()
    newGame()
}

function createBoard () {
    state.board = []

    for(var i = 1; i <= 60; i++) {
        state.board.push(i)
    }
}

function newGame() {
    resetGame()
    render()

    console.log(state.currentGame)
}

function render() {
    renderBoard()
    renderButton()
    renderSavedGames()
}

function renderBoard() {
    var divBoard = document.querySelector('#megasena-board')
    divBoard.innerHTML = ''

    var ulNumbers = document.createElement('ul')
    ulNumbers.classList.add('numbers')

    for(var i = 0; i < state.board.length; i++) {
        var currentNumber = state.board[i]

        var liNumber = document.createElement('li')
        liNumber.textContent = currentNumber
        liNumber.classList.add('number')

        liNumber.addEventListener('click', handleNumberClick)

      if(inNumberInGame(currentNumber)){
        liNumber.classList.add('selected-number')
      }

        ulNumbers.appendChild(liNumber)
    }
    divBoard.appendChild(ulNumbers)
}

function handleNumberClick(event) {
   var value = Number(event.currentTarget.textContent)
    
   if(inNumberInGame(value)) {
    removeNumberFromGame(value)
   } else {
    addNumberToGame(value)
   }
   console.log(state.currentGame)
   render();
}

function renderButton() {
    var divButton = document.querySelector('#megasena-buttons')
    divButton.innerHTML = ''
    
    var buttonNewGame = createNewGameButton()
    var buttonRandomGame = createRandomGameButton()
    var buttonSaveGame = createSaveGameButton()

    divButton.appendChild(buttonNewGame)
    divButton.appendChild(buttonRandomGame)
    divButton.appendChild(buttonSaveGame)
    
    
}

function createRandomGameButton() {
    var button = document.createElement('button')
    button.textContent = 'Jogo Aleatório'

    button.addEventListener('click', randomGame)

    return button
}

function createNewGameButton() {
    var button = document.createElement('button')
    button.textContent = 'Novo jogo'

    button.addEventListener('click', newGame)

    return button
}

function createSaveGameButton() {
    var button = document.createElement('button')
    button.textContent = 'Salvar jogo'
    button.disabled = !IsGameComplete()

    button.addEventListener('click', saveGame)

    return button
}

function renderSavedGames() {
    var divSaveGames = document.querySelector('#megasena-saved-games')
    divSaveGames.innerHTML = ''

    if(state.savedGames.length === 0) {
        divSaveGames.innerHTML = '<p>Nenhum jogo salvo</p>'
    } else {
        var ulSavedGames = document.createElement('ul')

        for(var i = 0; i < state.savedGames.length; i++) {
            var currentGame = state.savedGames[i]

            var liGame = document.createElement('li')
            liGame.textContent = currentGame.sort().join(', ')

            ulSavedGames.appendChild(liGame)
        }
        divSaveGames.appendChild(ulSavedGames)
    }


}

function addNumberToGame(numberToAdd) {
    if(numberToAdd < 1 || numberToAdd > 60){
        console.error("Número" + " " + numberToAdd + " " + "inválido")
        return;
    }

    if(state.currentGame.length >= 6) {
        console.error("O jogo já está completo")
        return
    }

    if(inNumberInGame(numberToAdd)) {
        console.error('Este número já foi selecionado', numberToAdd)
        return
    }

    state.currentGame.push(numberToAdd)
}

function removeNumberFromGame(numberToRemove) {
    if(numberToRemove < 1 || numberToRemove > 60){
        console.error("Número" + " " + numberToRemove + " " + "inválido")
        return false;
    }
    var newGame = []

    for(var i = 0; i < state.currentGame.length; i++){
        var currentNumber = state.currentGame[i]

        if(currentNumber === numberToRemove){
            continue
        }
            newGame.push(currentNumber)
        }
            state.currentGame = newGame
    }

function inNumberInGame(numberToCheck) {
    /*if(state.currentGame.includes(numberToCheck)) {
        return true
    } else {
        return false
    }*/
    return state.currentGame.includes(numberToCheck)
}

function saveGame() {
    if(!IsGameComplete()) {
        console.error('Jogo não está completo')
        return
    }
    state.savedGames.push(state.currentGame)
    newGame()

    console.log(state.savedGames)
}

function IsGameComplete() {
  return  state.currentGame.length === 6
}

function resetGame() {
    state.currentGame = []
}

function randomGame() {
    resetGame()

    while(!IsGameComplete()){
        var randomNumber = Math.ceil(Math.random() * 60)
        addNumberToGame(randomNumber)
    }
    console.log(state.currentGame)
    render()
}

start()