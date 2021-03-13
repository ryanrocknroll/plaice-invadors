function updateAlien (alien: game.LedSprite) {
    alien.move(1)
    if (alien.get(LedSpriteProperty.X) == 0 || alien.get(LedSpriteProperty.X) == 4) {
        alien.turn(Direction.Right, 180)
        if (alien.get(LedSpriteProperty.X) == 4) {
            basic.pause(500)
            alien.change(LedSpriteProperty.Y, 1)
            if (alien.get(LedSpriteProperty.Y) == 4) {
                game.gameOver()
            }
        }
    }
}
function shoot () {
    Rocket = game.createSprite(Player.get(LedSpriteProperty.X), Player.get(LedSpriteProperty.Y))
    for (let index = 0; index < 4; index++) {
        Rocket.change(LedSpriteProperty.Y, -1)
        checkCollision(alien1)
        checkCollision(alien2)
        basic.pause(100)
    }
    Rocket.delete()
}
function checkCollision (alien: game.LedSprite) {
    if (Rocket.isTouching(alien)) {
        alien.delete()
        game.addScore(1)
        basic.pause(500)
        if (alien == alien1) {
            alien1 = game.createSprite(randint(1, 3), 0)
        } else {
            alien2 = game.createSprite(randint(1, 3), 0)
        }
    }
}
let rotation = 0
let button = 0
let Rocket: game.LedSprite = null
let alien2: game.LedSprite = null
let alien1: game.LedSprite = null
let Player: game.LedSprite = null
Player = game.createSprite(2, 4)
alien1 = game.createSprite(randint(1, 3), randint(0, 1))
alien2 = game.createSprite(randint(1, 3), randint(0, 1))
basic.pause(100)
basic.forever(function () {
    button = pins.digitalReadPin(DigitalPin.P1)
    rotation = pins.analogReadPin(AnalogPin.P0)
    if (button == 1) {
        shoot()
    } else {
        Player.set(LedSpriteProperty.X, Math.floor(Math.map(rotation, 0, 1023, 0, 4)))
    }
    basic.pause(50)
})
basic.forever(function () {
    updateAlien(alien1)
    updateAlien(alien2)
    basic.pause(500)
})
