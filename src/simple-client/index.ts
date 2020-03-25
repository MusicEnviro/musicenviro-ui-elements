import { render } from 'react-dom'
import { createElement } from 'react'

import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard'

document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('main')
    
    render(
        createElement(PianoKeyboard, null),
        container
    )

})

