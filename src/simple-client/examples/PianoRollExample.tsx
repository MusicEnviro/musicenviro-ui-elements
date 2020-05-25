import * as React from 'react';
import { PianoRoll } from '../../components/PianoRoll/PianoRoll';
import { IRhythmTree, IRollNote, tree44 } from '../../musical-data';
import { RhythmTreeEditor } from '../../components/RhythmTreeEditor/RhythmTreeEditor';

export function PianoRollExample() {
	const [notes, setNotes] = React.useState<IRollNote[]>([]);
	const [tree, setTree] = React.useState<IRhythmTree>(tree44)

	return (
		<div>
			<PianoRoll initialNotes={notes} tree={tree}/>

			<RhythmTreeEditor 
				initialTree={tree}
				onChange={setTree}
				width={400}
				height={300}
			/>
		</div>
	);
};
