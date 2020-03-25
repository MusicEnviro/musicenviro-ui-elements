import { render } from 'react-dom'
import { createElement } from 'react'

import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard'
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram'

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('main')
    
    render(
        createElement(GuitarChordDiagram, null),
        container
    )

})

