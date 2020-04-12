import * as React from 'react';
import { DiatonicStep, IRange, MidiPitch, Mode } from '@musicenviro/base';

import styled from 'styled-components'

const Roll = styled.div`
background-color: gray;
width: 300px;
height: 100px;
`;

interface IDiatonicPianoRollProps {
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
}

export const DiatonicPianoRoll: React.FunctionComponent<IDiatonicPianoRollProps> = props => {
    // return <div>{JSON.stringify(props)}</div>;
    
    return <Roll className='diatonic-piano-roll'>
        
    </Roll>
};

DiatonicPianoRoll.defaultProps = {
	stepRange: { min: 0, max: 14 },
	zeroPitch: 48,
	mode: 'Ionian',
};
