import * as React from 'react';
import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard';
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram';
import { SingleNoteLane } from '../components/SingleNoteLane/SingleNoteLane';
import { ButtonGridExample } from './examples/ButtonGridExample';
import { MultiNoteLanes } from '../components/MultiNoteLanes/MultiNoteLanes';
import { DiatonicPianoRoll } from '../components/DiatonicPianoRoll/DiatonicPianoRoll';
import { DiatonicPianoRollExample } from './examples/DiatonicPianoRollExample';
import { VolumeKnob } from '../components/VolumeKnob/VolumeKnob';
import { RhythmTreeEditorExample } from './examples/RhythmTreeEditorExample';
import { SingleNoteLaneExample } from './examples/SingleNoteLaneExample';

type UIElement =
	| 'PianoKeyboard'
	| 'GuitarChordDiagram'
	| 'SingleNoteLane'
	| 'MultiNoteLanes'
	| 'DiatonicPianoRoll'
	| 'ButtonGrid'
	| 'VolumeKnob'
	| 'RhythmTreeEditor';

const uiElements = [
	'PianoKeyboard',
	'GuitarChordDiagram',
	'SingleNoteLane',
	'MultiNoteLanes',
	'DiatonicPianoRoll',
	'ButtonGrid',
	'VolumeKnob',
	'RhythmTreeEditor'
];

export function SimpleClient() {
	const [element, setElement] = React.useState<UIElement>('SingleNoteLane');

	function getUIElement() {
		switch (element) {
			case 'PianoKeyboard':
				return <PianoKeyboard />;
			case 'GuitarChordDiagram':
				return <GuitarChordDiagram />;
			case 'ButtonGrid':
				return <ButtonGridExample />;
			case 'SingleNoteLane':
				return <SingleNoteLaneExample />;
			case 'MultiNoteLanes':
				return <MultiNoteLanes />;
			case 'DiatonicPianoRoll':
				return <DiatonicPianoRollExample />
			case 'VolumeKnob':
				return <VolumeKnob size={30}/>;
			case 'RhythmTreeEditor':
				return <RhythmTreeEditorExample />
			default:
				return <div>not implemented</div>;
		}
	}

	return (
		<div
			style={{
				position: 'absolute',
				left: 100,
				top: 50,
			}}
		>
			<p>
                <select 
                    style={{fontSize: 18}}
					value={element}
					onChange={e => setElement((e.target as HTMLSelectElement).value as UIElement)}
				>
					{uiElements.map(name => (
						<option key={name}>{name}</option>
					))}
				</select>
			</p>

			{getUIElement()}
		</div>
	);
}

