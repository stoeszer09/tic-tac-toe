let game = ['TL','TM','TR','ML','MM','MR','BL','BM','BR']
let gameButton = document.querySelectorAll('.gameButton')
let htmlBody = document.querySelector('body')
let gameWin = false
let winner
let newGame = document.createElement('button')
newGame.id = 'refresh'
newGame.textContent = 'Start a new game'
let onePlayer = document.querySelector('#onePlayer')
let twoPlayer = document.querySelector('#twoPlayer')

function checkWin(player) {
    // check rows
    for (let i = 0; i < game.length; i += 3) {
        if (game[i] === game[i + 1] && game[i] === game[i+2]){
            gameWin = true
            winner = player
        }
    }
    
    // check columns
    for (let i = 0; i < 3; i++) {
        if (game[i] === game[i + 3] && game[i] === game[i + 6]) {
            gameWin = true
            winner = player
        }
    }
    
    // check diagnols
    if ((game[0] === game [4] && game[4] === game[8]) || (game[2] === game [4] && game[4] === game[6])) {
        gameWin = true
        winner = player
    }
      
    if (gameWin) {
        console.log('Game complete. The winner is: ' + winner + '!')
    }

    // Check for a tie
    let j = 0
    if (!gameWin) {
        for (let i = 0; i < game.length; i ++) {
            if (game[i] === 'X' || game[i] === 'O'){
                j++
            }
        }
        if (j === 9) {
            gameWin = true
            winner = 'Tie'
            console.log('Game complete. The game was a tie.')
        }
    }
    // New game option
    if (gameWin){
        refresh ()
    }
}

// Start a new game when one is completed
function refresh() {
    htmlBody.append(newGame)
    newGame.addEventListener('click', function (){
        newGame.remove()
        gameWin = false
        winner = ''
        game = ['TL','TM','TR','ML','MM','MR','BL','BM','BR']
        for (let i = 0; i < game.length; i++) {
            gameButton[i].textContent = ''
        }
    })
}

// Computer picks a random number, checks if the position is taken. When it finds one
// not taken, it gives that spot 'O'
function computerTurn () {
    let foundSpot = false
    while (!foundSpot) {
        let spot = Math.floor(Math.random() * 9)
        console.log(spot)
        if (game[spot] != 'X' && game[spot] != 'O') {
            game[spot] = 'O'
            gameButton[spot].textContent = game[spot]
            foundSpot = true
        }
    }
}

// Set up one player board
function playerTurn(playerToken, singlePlayer = false) {
    // Player click is an X, checks for win, computer turn, checks for win
    for (let i = 0; i < gameButton.length; i++){
        gameButton[i].addEventListener('click', function(e) {
            if (!gameWin) {
                if (game[i] != 'X' && game[i] != 'O') {
                    game[i] = playerToken
                    e.target.textContent = game[i]
                    checkWin(playerToken)
                    if (!gameWin && singlePlayer) {
                        computerTurn()
                        checkWin('O')
                    }
                }
            }
        })
    }
}

// Set up two player board
// Need to display who's turn it is
// NEED FIX: doesn't wait for player input. Becomes infinite loop of changing the button clicks
// from X > O > X ... etc.
function twoPlayerSetup() {
    while (!gameWin) {
        console.log('Player 1 turn')
        playerTurn('X')
        if(!gameWin) {
            console.log('Player 2 turn')
            playerTurn('O')
        }
    }
}

// Selecting one player vs computer or two players
onePlayer.addEventListener('click', function() {
    onePlayer.remove()
    twoPlayer.remove()
    playerTurn('X', true)
})

// UNDER CONSTRUCTION
/*
twoPlayer.addEventListener('click', function() {
    onePlayer.remove()
    twoPlayer.remove()
    twoPlayerSetup()
})
*/

// FUTURE IDEAS:
// record win-loss-tie record
// optimize computer choice
// choose UserName(s)
// move the game complete to the webpage instead of console