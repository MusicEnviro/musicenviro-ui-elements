import React from 'react';
import { RhythmTreeEditor } from '../../components/RhythmTreeEditor/RhythmTreeEditor';
import { tree44 } from '../../musical-data/trees';

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
