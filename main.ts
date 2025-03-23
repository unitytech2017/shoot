controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . 2 1 1 1 1 1 1 2 . . . . 
        . . . . 2 1 1 1 1 1 1 2 . . . . 
        . . . . 2 1 1 1 1 1 1 2 . . . . 
        . . . . 2 1 1 1 1 1 1 2 . . . . 
        . . . . . 2 1 1 1 1 3 . . . . . 
        . . . . . 2 3 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 2 . . . . . 
        . . . . . . 2 3 1 2 . . . . . . 
        . . . . . . 2 3 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.startEffect(effects.fire, 200)
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
})
let projectile: Sprite = null
let mySprite: Sprite = null
let projectile2 = [
img`
    . . . . . b b . . . . . . . . . 
    . . . . b 5 b b . . . . . . . . 
    . . b b 5 5 5 b b b . . . . . . 
    . b 5 5 5 5 5 5 5 b . . b . . . 
    . . b b 5 5 5 b b . . b 5 b . . 
    . . b 5 5 b 5 5 b . b 5 5 5 b . 
    . . b 5 b b b 5 b . . b 5 b . . 
    . . b b . . b b b . . b b b . . 
    . b 5 b b . . . . . b 5 b . . . 
    b 5 5 5 b b . . . b b 5 b b . . 
    . b 5 b b 5 b . b 5 5 5 5 5 b . 
    . b b b 5 5 5 b b b 5 5 5 b b . 
    . . b 5 5 5 5 5 b b 5 b 5 b . . 
    . . . b 5 5 5 b . . b b b . . . 
    . . . b 5 b 5 b . . . . . . . . 
    . . . b b b b b . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . . b 5 5 b . . . . . . 
    . . . b b b 5 5 1 1 b b b . . . 
    . . . b 5 5 5 5 1 1 5 5 b . . . 
    . . . . b d 5 5 5 5 d b . . . . 
    . . . . c b 5 5 5 5 b c . . . . 
    . . . . c 5 d d d d 5 c . . . . 
    . . . . c 5 d c c d 5 c . . . . 
    . . . . c c c . . c c c . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . b . . . . . . . 
    . . . . . . . b d b . . . . . . 
    . . . . . . b 5 5 5 b . . . . . 
    . . . . . b b 5 5 5 b b . . . . 
    . . b b b b 5 5 5 1 1 b b b b . 
    . . b 5 5 5 5 5 5 1 1 5 5 5 b . 
    . . b d d 5 5 5 5 5 5 5 d d b . 
    . . . b d d 5 5 5 5 5 d d b . . 
    . . . c b 5 5 5 5 5 5 5 b c . . 
    . . . c b 5 5 5 5 5 5 5 b c . . 
    . . . c 5 5 d d b d d 5 5 c . . 
    . . . c 5 d d c c c d d 5 c . . 
    . . . c c c c . . . c c c c . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . b b . . . . . . . 
    . . . . . . b d d b . . . . . . 
    . . . . . b d 5 5 d b . . . . . 
    . . . . b b 5 5 5 5 b b . . . . 
    . . . . b 5 5 5 5 5 5 b . . . . 
    b b b b b 5 5 5 5 1 1 d b b b b 
    b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
    b d d 5 5 5 5 5 5 1 1 1 5 d d b 
    . b d d 5 5 5 5 5 5 5 5 d d b . 
    . . b b 5 5 5 5 5 5 5 5 b b . . 
    . . c b 5 5 5 5 5 5 5 5 b c . . 
    . . c 5 5 5 5 d d 5 5 5 5 c . . 
    . . c 5 5 d b b b b d 5 5 c . . 
    . . c 5 d b c c c c b d 5 c . . 
    . . c c c c . . . . c c c c . . 
    . . . . . . . . . . . . . . . . 
    `
]
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . f f f f f 2 2 f f f f f . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f 2 f 2 e f . . 
    . . f f f 2 2 e e 2 2 f f f . . 
    . f f e f 2 f e e f 2 f e f f . 
    . f e e f f e e e e f e e e f . 
    . . f e e e e e e e e e e f . . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
mySprite.bottom = 120
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 100)
effects.starField.startScreenEffect()
info.setLife(3)
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(projectile2[randint(0, projectile2.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
