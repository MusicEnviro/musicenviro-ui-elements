import { render } from 'react-dom'

import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard'
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram'
import { ButtonGridExample } from './ButtonGridExample'

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('main')
    
    render(
        ButtonGridExample(),
        container
    )

})


