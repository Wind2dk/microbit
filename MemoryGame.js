let sequence: number[] = []
let userIndex = 0
let playing = false

// Start spillet med knap A+B
input.onButtonPressed(Button.AB, function () {
    resetGame()
    addStep()
    showSequence()
    playing = true
})

// Spiller vælger "venstre" (0)
input.onButtonPressed(Button.A, function () {
    if (playing) {
        checkAnswer(0)
    }
})

// Spiller vælger "højre" (1)
input.onButtonPressed(Button.B, function () {
    if (playing) {
        checkAnswer(1)
    }
})

function resetGame() {
    sequence = []
    userIndex = 0
    playing = false
    basic.clearScreen()
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
}

function addStep() {
    // tilfældig 0 (venstre) eller 1 (højre)
    sequence.push(Math.randomRange(0, 1))
}

function showSequence() {
    basic.pause(500)
    for (let step of sequence) {
        if (step == 0) {
            // venstre = plot LED til venstre
            led.plot(1, 2)
        } else {
            // højre = plot LED til højre
            led.plot(3, 2)
        }
        basic.pause(500)
        basic.clearScreen()
        basic.pause(200)
    }
    userIndex = 0
}

function checkAnswer(choice: number) {
    if (choice == sequence[userIndex]) {
        // korrekt valg
        userIndex++
        if (userIndex >= sequence.length) {
            // spiller klarede hele sekvensen
            basic.showIcon(IconNames.Yes)
            basic.pause(500)
            basic.clearScreen()
            addStep()
            showSequence()
        }
    } else {
        // forkert valg
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        resetGame()
    }
}
