import * as React from 'react';
import { PianoKeyboard } from '../components/PianoKeyboard/PianoKeyboard';
import { GuitarChordDiagram } from '../components/GuitarChordDiagram/GuitarChordDiagram';
import { SingleNoteLane } from '../components/SingleNoteLane/SingleNoteLane';
import { ButtonGridExample } from './ButtonGridExample';
import { MultiNoteLanes } from '../components/MultiNoteLanes/MultiNoteLanes';

type UIElement =
	| 'PianoKeyboard'
	| 'GuitarChordDiagram'
	| 'SingleNoteLane'
	| 'MultiNoteLanes'
	| 'DiatonicPianoRoll'
	| 'ButtonGrid';

const uiElements = [
	'PianoKeyboard',
	'GuitarChordDiagram',
	'SingleNoteLane',
	'MultiNoteLanes',
	'DiatonicPianoRoll',
	'ButtonGrid',
];

export function SimpleClient() {
	const [element, setElement] = React.useState<UIElement>('PianoKeyboard');

	function getUIElement() {
		switch (element) {
			case 'PianoKeyboard':
				console.log(element);
				return <PianoKeyboard />;
			case 'GuitarChordDiagram':
				return <GuitarChordDiagram />;
			case 'ButtonGrid':
				return <ButtonGridExample />;
			case 'SingleNoteLane':
				return <SingleNoteLane />;
			case 'MultiNoteLanes':
				return <MultiNoteLanes />;
			default:
				return <div>not implemented</div>;
		}
	}

	return (
		<div
			style={{
				position: 'absolute',
				left: 100,
				top: 100,
			}}
		>
			<p>
                <select 
                    style={{fontSize: 18}}
					value={element}
					onChange={e => setElement((e.target as HTMLSelectElement).value as UIElement)}
				>
					{uiElements.map(name => (
						<option>{name}</option>
					))}
				</select>
			</p>

			{getUIElement()}
		</div>
	);
}
