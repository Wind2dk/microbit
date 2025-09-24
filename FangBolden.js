input.onButtonPressed(Button.A, function () {
    Spiller.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    Bold = game.createSprite(randint(0, 4), 0)
    basic.pause(100)
    for (let index = 0; index < 4; index++) {
        Bold.change(LedSpriteProperty.Y, 1)
        basic.pause(300)
    }
    if (Bold.isTouching(Spiller)) {
        game.addScore(1)
    }
    Bold.delete()
})
input.onButtonPressed(Button.B, function () {
    Spiller.change(LedSpriteProperty.X, 1)
})
input.onGesture(Gesture.Shake, function () {
    basic.showNumber(game.score())
})
let Bold: game.LedSprite = null
let Spiller: game.LedSprite = null
game.setScore(0)
Spiller = game.createSprite(2, 4)
basic.forever(function () {
	
})
