declare module "react-musical-keyboard" {
	import { Color } from "csstype";
	import * as React from "react";

	export type IKeyboardMapping = { [index: number]: number };

	export interface IKeyOnData {
		target: {
			value: {
				id: number;
				// these values don't seem to appear for computer keyboard entry
				octave?: number;
				velocity?: number; // floating point 0-1 ?
			};
		};
		source: "mouse" | false; // false for computer keyboard entry
	}

	export interface IKeyOffData {
		target: {
			value: {
				id: number;
				octave: number;
			};
		};
		source: "mouse";
	}

	export interface IMusicalKeyboardProps {
		style?: object;
		labels?: (key: { id: number }) => string | null;
		onKeyOn?: (data: IKeyOnData) => void;
		onKeyOff?: (data: IKeyOffData) => void;
		startKey?: number;
		endKey?: number;
		accidentalKeyHeight?: string /* percentage value, relative to white key height */;
		keyboardMapping?: IKeyboardMapping;
		naturalKeyColor?: Color;
		accidentalKeyColor?: Color;
	}

	export default class MusicalKeyboard extends React.Component<
		IMusicalKeyboardProps
	> {}
}

// -----------------------------------------------------------------------------
// reference stuff
// -----------------------------------------------------------------------------

/* 
	style={{
        height: '8vw',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}
      labels={key => withLabels ? `${PITCH_NAMES[key.id % 12]}${Math.floor(key.id / 12) - 1}` : null}
      onKeyOn={handleKeyOn}
      onKeyOff={handleKeyOff}
      startKey={0 // C0 in MIDI, Middle C (C5) is 60 }
      endKey={127 // G10 in MIDI }
      accidentalKeyHeight={'65%' // percentage value, relative to white key height }
      keyboardMapping={KEYBOARD_MAPPING}
      naturalKeyColor={'white' // any CSS color, applies to all white keys }
	  accidentalKeyColor={'black' // any CSS color, applies to all black keys }
	*/
