import React from 'react';
import { SingleNoteLane } from '../../components/SingleNoteLane/SingleNoteLane';
import { tree44, exampleTree1, exampleTree2, IRhythmTree } from '../../musical-data';
import { RhythmTreeEditor } from '../../components/RhythmTreeEditor/RhythmTreeEditor';

export const SingleNoteLaneExample: React.FunctionComponent = () => {
	const [notes, setNotes] = React.useState<number[]>([]);
	const [tree, setTree] = React.useState<IRhythmTree>(tree44)

	return (
		<div>
			<SingleNoteLane notes={notes} tree={tree} onChange={newNotes => setNotes(newNotes)} />

			<RhythmTreeEditor 
				initialTree={tree}
				onChange={setTree}
				width={400}
				height={300}
			/>
		</div>
	);
};
