import * as React from "react";
import { IGuitarChordDiagramProps, IFingeredNote } from "./@types";
import { drawDiagramInCanvas } from "./drawDiagramInCanvas";
import { LazyCanvasRedrawer, lazyCanvasRedrawerDefaultProps } from "../../generic-components/LazyCanvasRedrawer/LazyCanvasRedrawer";
import { pitchClass } from "@musicenviro/base";

export { IGuitarChordDiagramProps, IFingeredNote };

const defaultProps: IGuitarChordDiagramProps = {
	...lazyCanvasRedrawerDefaultProps,
	baseNote: 41,
	numFrets: 5,
	fingeredNotes: [48, 52, 55, 59, 60].map(n => ({
		pitch: n,
		isTonic: pitchClass(n) === 0
	})),
	color: "black"
};

export class GuitarChordDiagram extends LazyCanvasRedrawer<
	IGuitarChordDiagramProps
> {
	name = 'guitar-chord-diagram'
	draw(ctx: CanvasRenderingContext2D) {
		drawDiagramInCanvas(ctx, this.props);
	}

	static defaultProps = defaultProps;
}
