import * as _ from 'lodash'
import { IGuitarChordDiagramProps } from "./@types";
import { Pixels, MidiPitch, IRect } from '../../@types'
import { getStringAndFret } from './getStringAndFret';

interface IFinger {
    isTonic: boolean;
    rect: IRect;
    pitch: MidiPitch;
}

export function drawDiagramInCanvas(
    ctx: CanvasRenderingContext2D,
    props: IGuitarChordDiagramProps
): IFinger[] {
    drawGridInCanvas(ctx, props.numFrets, props.color)
    return drawFingersInCanvas(ctx, props)
}

function getFretYCoords(height: Pixels, numFrets: number): Pixels[] {
    const result: number[] = [];
    const fretHeight = height / numFrets
    // margin is half a fret height
    for (let i = 0; i < numFrets; i++) {
        result.push(fretHeight * (i + 0.5))
    }

    return result
}

function getStringXCoords(width: Pixels): Pixels[] {
    // margin is half a string width
    const stringWidth = width / 6
    return [0, 1, 2, 3, 4, 5].map(i => (i + 0.5) * stringWidth)
}



function drawGridInCanvas(ctx: CanvasRenderingContext2D, numFrets: number, color: string): void {
    const xCoords = getStringXCoords(ctx.canvas.width)
    const yCoords = getFretYCoords(ctx.canvas.height, numFrets)

    ctx.strokeStyle = color
    ctx.lineWidth = 3

    // draw "strings"
    xCoords.forEach(x => {
        ctx.moveTo(x, yCoords[0]);
        ctx.lineTo(x, _.last(yCoords))
    })

    // draw "frets"
    yCoords.forEach(y => {
        ctx.moveTo(xCoords[0], y);
        ctx.lineTo(_.last(xCoords), y)
    })

    ctx.stroke()
}

function drawFingersInCanvas(ctx: CanvasRenderingContext2D, props: IGuitarChordDiagramProps): IFinger[] {
    const xCoords = getStringXCoords(ctx.canvas.width)
    const yCoords = getFretYCoords(ctx.canvas.height, props.numFrets)

    const radius = Math.min(xCoords[1] - xCoords[0], yCoords[1] - yCoords[0]) * 0.25

    return props.fingeredNotes.map(note => {
        const fingering = getStringAndFret(note.semitonesFromBase, props.position)

        if (fingering.alternates.length > 0) {
            drawFinger(fingering.string, fingering.fret, 'Diamond');
            fingering.alternates.forEach(f => drawFinger(f.string, f.fret, 'Diamond'))
        } else {
            drawFinger(fingering.string, fingering.fret, note.isTonic ? 'TonicCircle' : 'NonTonicCircle')
        }

        return null
    }).filter(Boolean)

    // function-scope helpers

    function drawFinger(string: number, fret: number, type: 'TonicCircle' | 'NonTonicCircle' | 'Diamond') {
        
        const x = xCoords[string]
        const y = yCoords[fret]

        ctx.lineWidth = 3
        ctx.beginPath();

        switch (type) {
            case 'TonicCircle':
            case 'NonTonicCircle':
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = type === 'TonicCircle' ? 'white' : props.color
                ctx.fill()
                break;

            case 'Diamond':
                ctx.moveTo(x - radius, y);
                ctx.lineTo(x, y + radius);
                ctx.lineTo(x + radius, y);
                ctx.lineTo(x, y - radius);
                ctx.closePath()
                ctx.fillStyle = 'white'
                ctx.fill()
                ctx.fillStyle = props.color
                ctx.globalAlpha = 0.5
                ctx.fill()
                ctx.globalAlpha = 1
                break;
        }

        ctx.stroke()
    }


}
