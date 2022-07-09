import * as React from 'react';
import { PianoKeyboard } from '../../components/PianoKeyboard/PianoKeyboard';

export function PianoKeyboardExample() {
	return (
		<PianoKeyboard
			onNoteDown={(keyDown, velocity, depressedKeys) => {
				console.log({keyDown});
				console.log(depressedKeys.join());	
			}}
			onNoteUp={(keyUp, depressedKeys) => {
				console.log({keyUp});
				console.log(depressedKeys.join());	
			}}
		/>
	);
}
