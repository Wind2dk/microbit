input.onButtonPressed(Button.A, function () {
    currentLetter = currentLetter + 1
    if (currentLetter >= uppercaseLetters.length) {
        currentLetter = 0
    }
    basic.showString("" + (uppercaseLetters[currentLetter]))
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("" + (uppercaseLetters[currentLetter]))
    basic.showIcon(IconNames.Yes)
})
//When button pressed go 5 letters back, but only go past A if at exactly A when pressed
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (currentLetter == 0) {
        currentLetter = uppercaseLetters.length - 5
    } else {
        currentLetter = currentLetter - 5
        if (currentLetter < 0) {
            currentLetter = 0
        }
    }
    basic.showString("" + (uppercaseLetters[currentLetter]))
})
let uppercaseLetters: string[] = []
let currentLetter = 0
currentLetter = uppercaseLetters.length - 1
uppercaseLetters = [
"A",
"B",
"C",
"D",
"E",
"F",
"G",
"H",
"I",
"J",
"K",
"L",
"M",
"N",
"O",
"P",
"Q",
"R",
"S",
"T",
"U",
"V",
"W",
"X",
"Y",
"Z",
"AE",
"OE",
"AA"
]
radio.setGroup(1000)
