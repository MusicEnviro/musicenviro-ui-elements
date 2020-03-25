import * as _ from 'lodash'
import { IGuitarChordDiagramProps } from "./@types";
import { Pixels, MidiPitch, IRect } from '../../@types'

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
    return [0,1,2,3,4,5].map(i => (i + 0.5) * stringWidth)
}

function drawGridInCanvas(ctx: CanvasRenderingContext2D, numFrets: number, color: string): void {
    const xCoords = getStringXCoords(ctx.canvas.width)
    const yCoords = getFretYCoords(ctx.canvas.height, numFrets)

    ctx.strokeStyle = color
    
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
}

function drawFingersInCanvas(ctx: CanvasRenderingContext2D, props: IGuitarChordDiagramProps): IFinger[] {
    return []
}

if (typeof require !== 'undefined' && require.main === module) {
    console.log(getFretYCoords(500, 5))
}