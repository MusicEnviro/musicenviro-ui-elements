import React from 'react';
import { RhythmTreeEditor } from '../../components/RhythmTreeEditor/RhythmTreeEditor';
import { exampleTree2 as tree } from '../../musical-data/trees';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);



export function RhythmTreeEditorExample() {
	return <RhythmTreeEditor initialTree={tree} />;
}
