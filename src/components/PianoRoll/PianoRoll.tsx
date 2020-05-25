// =============================================================================
// PIANO ROLL COMPONENT
// =============================================================================

import React, { useEffect, useState, useRef } from 'react'
import { IRollNote } from "../../musical-data";
import { IRange, DiatonicStep, MidiPitch, Mode, Pixels } from "@musicenviro/base";
import { useRedrawer } from '../../hooks/useRedrawer';

// -----------------------------------------------------------------------------
// PROPS
// -----------------------------------------------------------------------------

export interface IPianoRollProps {
	stepRange?: IRange<DiatonicStep>;
	zeroPitch?: MidiPitch; // the pitch class of zeroPitch is the key
	mode?: Mode;
	width?: Pixels;
    height?: Pixels;
    padding?: Pixels;
	onChange?: (notes: IRollNote[]) => void;
}

const defaultProps: Required<IPianoRollProps> = {
    stepRange: {min: 0, max: 10},
    zeroPitch: 36,
    mode: "Ionian",
    width: 800,
    height: 400,
    padding: 20,
    onChange: notes => {}
}

// -----------------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------------

export const PianoRoll: React.FunctionComponent<IPianoRollProps> = (props) => {
    const [canvasRef] = useRedrawer<IPianoRollProps>(props, draw, 1000, [props])
    
    function draw(ctx: CanvasRenderingContext2D) {
        //
    }

    return <div>
        new piano roll
    </div>
}


