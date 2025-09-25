let level = 0
let playing = false
let maze: number[] = []
let playerX = 0
let playerY = 0

let stepSpeed = 1000
let showMazeTime = 1000

// Start spillet med A+B
input.onButtonPressed(Button.AB, function () {
    startGame()
})

// Spiller flytter op (A)
input.onButtonPressed(Button.A, function () {
    if (playing && playerY > 0) playerY--
})

// Spiller flytter ned (B)
input.onButtonPressed(Button.B, function () {
    if (playing && playerY < 4) playerY++
})

// Generer en random labyrint baseret på level
function generateMaze(level: number): number[] {
    let newMaze: number[] = []
    let maxStep = 1
    if (level >= 3 && level <= 5) maxStep = 2
    if (level > 5) maxStep = 3

    // Start Y tilfældigt mellem 0 og 4
    let y = Math.randomRange(0, 4)
    newMaze.push(y)

    for (let x = 1; x < 5; x++) {
        let delta = Math.randomRange(-maxStep, maxStep)
        y = Math.max(0, Math.min(4, y + delta))
        newMaze.push(y)
    }

    return newMaze
}

function startGame() {
    level = 0
    stepSpeed = 1000
    showMazeTime = 1000
    nextLevel()
}

function nextLevel() {
    if (level >= 20) {
        basic.showString("WIN!")
        playing = false
        return
    }

    basic.clearScreen()
    maze = generateMaze(level)

    // Vis ruten kort
    for (let x = 0; x < 5; x++) {
        led.plot(x, maze[x])
    }
    basic.pause(showMazeTime)
    basic.clearScreen()

    playerX = 0
    playerY = maze[0]
    led.plot(playerX, playerY)
    playing = true
}

basic.forever(function () {
    if (playing) {
        basic.pause(stepSpeed)

        //led.unplot(playerX, playerY)
        playerX++

        if (playerX > 4) {
            level++
            playing = false

            // Reducer tider for næste level
            stepSpeed = Math.max(250, stepSpeed - 50)
            showMazeTime = Math.max(250, showMazeTime - 50)

            nextLevel()
            return
        }

        if (playerY == maze[playerX]) {
            led.plot(playerX, playerY)
        } else {
            deathAnimation(playerX,playerY,level)
            basic.pause(1000)
            playing = false
        }
    }
})

function deathAnimation(playerX: number, playerY: number, score: number) {
    // --- Step 1: lokal eksplodering ---
    let offsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, -1], [-1, 1], [1, 1]
    ]
    // blink spilleren et par gange
    for (let i = 0; i < 3; i++) {
        led.unplot(playerX, playerY)
        basic.pause(100)
        led.plot(playerX, playerY)
        basic.pause(100)
    }

    // mini-eksplosion omkring spilleren
    for (let round = 0; round < 2; round++) {
        for (let j = 0; j < offsets.length; j++) {
            let dx = offsets[j][0]
            let dy = offsets[j][1]
            let nx = playerX + dx
            let ny = playerY + dy
            if (nx >= 0 && nx <= 4 && ny >= 0 && ny <= 4) {
                led.plot(nx, ny)
            }
        }
        basic.pause(100)
        basic.clearScreen()
    }

    // --- Step 2: gradvis fyld hele skærmen ---
    for (let radius = 1; radius <= 4; radius++) {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (Math.abs(x - playerX) <= radius && Math.abs(y - playerY) <= radius) {
                    led.plot(x, y)
                }
            }
        }
        basic.pause(100)
    }

    // --- Step 3: blink hele skærmen (epic) ---
    for (let i = 0; i < 3; i++) {
        basic.clearScreen()
        basic.pause(100)
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                led.plot(x, y)
            }
        }
        basic.pause(100)
    }

    basic.clearScreen()

    // --- Step 4: vis score/level ---
    basic.showString("Level:" + score)
}
