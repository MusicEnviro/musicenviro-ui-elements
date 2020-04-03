
    export const keysPressed: {[index:string]:boolean} = {}

window.addEventListener('keydown', (ev: KeyboardEvent) => {
    console.log(ev.key)
    keysPressed[ev.key] = true
})

window.addEventListener('keyup', (ev: KeyboardEvent) => {
    console.log(ev.key, 'up')
    keysPressed[ev.key] = false
})


