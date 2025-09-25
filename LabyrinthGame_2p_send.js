radio.setGroup(1)

let drawX = 0
let drawY = 2
let drawMaze: number[] = [0, 0, 0, 0, 0]
let drawing = true

// Blink markøren kontinuerligt
basic.forever(function () {
    if (drawing) {
        // Vis allerede fastgjorte kolonner
        for (let i = 0; i < drawX; i++) {
            led.plot(i, drawMaze[i])
        }

        // Blink markøren i den aktuelle kolonne
        led.plot(drawX, drawY)
        basic.pause(300)
        led.unplot(drawX, drawY)
        basic.pause(300)
    }
})

// Knap A → flyt op
input.onButtonPressed(Button.A, function () {
    if (drawing && drawY > 0) {
        led.unplot(drawX, drawY)
        drawY--
    }
})

// Knap B → flyt ned
input.onButtonPressed(Button.B, function () {
    if (drawing && drawY < 4) {
        led.unplot(drawX, drawY)
        drawY++
    }
})

// Knap A+B → næste kolonne / send når færdig
input.onButtonPressed(Button.AB, function () {
    if (!drawing) return

    // Gem Y-koordinaten for den aktuelle kolonne
    drawMaze[drawX] = drawY

    // Tegn fast position permanent
    led.plot(drawX, drawY)

    // Flyt til næste kolonne
    drawX++
    if (drawX <= 4) {
        // Start næste kolonne i samme række som den tidligere
        drawY = drawMaze[drawX - 1]
    }

    if (drawX > 4) {
        // Stop blink midlertidigt
        drawing = false

        // Send hele labyrinten
        for (let i = 0; i < 5; i++) {
            radio.sendValue("maze" + i, drawMaze[i])
        }

        basic.clearScreen()        // Ryd skærmen helt før tekst
        basic.showString("SENT")  // Vis bekræftelse
        basic.clearScreen()        // Ryd skærmen igen

        // Reset til næste tegning
        drawX = 0
        drawY = 2
        drawing = true            // start blink igen
    }
})
