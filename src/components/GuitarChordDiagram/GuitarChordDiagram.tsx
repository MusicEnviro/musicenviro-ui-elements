import * as React from "react";
import { IGuitarChordDiagramProps, IFingeredNote } from "./@types";
import { drawDiagramInCanvas } from "./drawDiagramInCanvas";
import { LazyCanvasRedrawer } from "../LazyCanvasRedrawer";
import { pitchClass } from "@musicenviro/base";

export { IGuitarChordDiagramProps, IFingeredNote };

const defaultProps: IGuitarChordDiagramProps = {
	baseNote: 41,
	numFrets: 5,
	fingeredNotes: [48, 52, 55, 59, 60].map(n => ({
		pitch: n,
		isTonic: pitchClass(n) === 0
	})),
	color: "black"
};

export class GuitarChordDiagram extends LazyCanvasRedrawer<
	IGuitarChordDiagramProps,
	{}
> {
	draw(ctx: CanvasRenderingContext2D) {
		drawDiagramInCanvas(ctx, this.props);
	}

	render() {
		return (
			<canvas
				height={150}
				width={150}
				ref={this.ref}
				className="guitar-chord-diagram"
			></canvas>
		);
	}

	static defaultProps = defaultProps;
}
