import * as React from 'react';
import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard';
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram';
import { SingleNoteLane } from '../components/SingleNoteLane/SingleNoteLane';
import { ButtonGridExample } from './examples/ButtonGridExample';
import { MultiNoteLanes } from '../components/MultiNoteLanes/MultiNoteLanes';
import { DiatonicPianoRoll } from '../components/DiatonicPianoRoll/DiatonicPianoRoll';
import { DiatonicPianoRollExample } from './examples/DiatonicPianoRollExample';
import { VolumeKnob } from '../components/VolumeKnob/VolumeKnob';

type UIElement =
	| 'PianoKeyboard'
	| 'GuitarChordDiagram'
	| 'SingleNoteLane'
	| 'MultiNoteLanes'
	| 'DiatonicPianoRoll'
	| 'ButtonGrid'
	| 'VolumeKnob';

const uiElements = [
	'PianoKeyboard',
	'GuitarChordDiagram',
	'SingleNoteLane',
	'MultiNoteLanes',
	'DiatonicPianoRoll',
	'ButtonGrid',
	'VolumeKnob'
];

export function SimpleClient() {
	const [element, setElement] = React.useState<UIElement>('DiatonicPianoRoll');

	function getUIElement() {
		switch (element) {
			case 'PianoKeyboard':
				return <PianoKeyboard />;
			case 'GuitarChordDiagram':
				return <GuitarChordDiagram />;
			case 'ButtonGrid':
				return <ButtonGridExample />;
			case 'SingleNoteLane':
				return <SingleNoteLane />;
			case 'MultiNoteLanes':
				return <MultiNoteLanes />;
			case 'DiatonicPianoRoll':
				return <DiatonicPianoRollExample />
			case 'VolumeKnob':
				return <VolumeKnob size={30}/>;
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
