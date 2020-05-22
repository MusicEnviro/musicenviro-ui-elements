import React from 'react';
import { RhythmTreeEditor } from '../../components/RhythmTreeEditor/RhythmTreeEditor';
import { tree44 } from '../../musical-data/trees';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const exampleTree1 = {
	nodes: [
		1,
		{
			units: 1,
			subtree: {
				nodes: [1, 1],
			},
		},
	],
};

const exampleTree2 = {
	nodes: [
		{
			units: 1,
			subtree: {
				nodes: [1, 1, 1],
			},
		},
		{
			units: 2,
			subtree: {
				nodes: [
					1,
					1,
					{
						units: 3,
						subtree: {
							nodes: [1, 1, 1, 1],
						},
					},
				],
			},
		},
		{
			units: 1,
			subtree: {
				nodes: [1, 1, 1, 1],
			},
		},
	],
};

export function RhythmTreeEditorExample() {
	return <RhythmTreeEditor initialTree={exampleTree2} />;
}
