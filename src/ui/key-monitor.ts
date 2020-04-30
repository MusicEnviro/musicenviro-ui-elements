import { EventEmitter } from "events"

export const keysPressed: {[index:string]:boolean} = {}

const emitter = new EventEmitter()

export type Callback = (key: string, newState: 'Down' | 'Up') => void

export function onTransition(callback: Callback) {
    emitter.on("transition", callback)
}

export function removeListener(callback: (key: string, newState: 'Down' | 'Up') => void) {
    emitter.removeListener("transition", callback)
}

function emitTransition(key: string, newState: 'Down' | 'Up') {
    emitter.emit("transition", key, newState)
}

// TODO deal with left and right keys (shift, option, command)

console.log('ADDING KEYSTROKE LISTENERS to window (never get removed)')

typeof window !== 'undefined' && window.addEventListener('keydown', (ev: KeyboardEvent) => {
    keysPressed[ev.key] = true
    emitTransition(ev.key, 'Down')
})

typeof window !== 'undefined' && window.addEventListener('keyup', (ev: KeyboardEvent) => {
    keysPressed[ev.key] = false
    emitTransition(ev.key, 'Up')
})


