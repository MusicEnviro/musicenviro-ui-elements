import * as React from 'react';
import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard';
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram';
import { ButtonGridExample } from './examples/ButtonGridExample';
import { MultiNoteLanes } from '../components/MultiNoteLanes/MultiNoteLanes';
import { PianoRollExample } from './examples/PianoRollExample';
import { VolumeKnob } from '../components/VolumeKnob/VolumeKnob';
import { RhythmTreeEditorExample } from './examples/RhythmTreeEditorExample';
import { SingleNoteLaneExample } from './examples/SingleNoteLaneExample';
import { Test } from './examples/Test';
import { DiatonicPianoRoll } from '../components/DiatonicPianoRoll/DiatonicPianoRoll';

type UIElement =
	| 'PianoKeyboard'
	| 'GuitarChordDiagram'
	| 'SingleNoteLane'
	| 'MultiNoteLanes'
	| 'DiatonicPianoRoll'
	| 'PianoRoll'
	| 'ButtonGrid'
	| 'VolumeKnob'
	| 'RhythmTreeEditor'
	| 'Test';

const uiElements = [
	'PianoKeyboard',
	'GuitarChordDiagram',
	'SingleNoteLane',
	'MultiNoteLanes',
	'DiatonicPianoRoll',
	'PianoRoll',
	'ButtonGrid',
	'VolumeKnob',
	'RhythmTreeEditor',
	'Test',
];

export function SimpleClient() {
	const [element, setElement] = React.useState<UIElement>('ButtonGrid');

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
				return <DiatonicPianoRoll />
			case 'PianoRoll':
				return <PianoRollExample />
			case 'VolumeKnob':
				return <VolumeKnob size={30}/>;
			case 'RhythmTreeEditor':
				return <RhythmTreeEditorExample />
			case 'Test':
				return <Test />
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

