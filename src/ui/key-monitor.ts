import { EventEmitter } from "events"

export const keysPressed: {[index:string]:boolean} = {}

const emitter = new EventEmitter()

export function onTransition(callback: (key: string, newState: 'Down' | 'Up') => void) {
    emitter.on("transition", callback)
}

function emitTransition(key: string, newState: 'Down' | 'Up') {
    emitter.emit("transition", key, newState)
}

// TODO deal with left and right keys (shift, option, command)

window.addEventListener('keydown', (ev: KeyboardEvent) => {
    keysPressed[ev.key] = true
    emitTransition(ev.key, 'Down')
})

window.addEventListener('keyup', (ev: KeyboardEvent) => {
    keysPressed[ev.key] = false
    emitTransition(ev.key, 'Up')
})


