import * as React from "react";
import { IGuitarChordDiagramProps, IFingeredNote } from "./@types";
import { drawDiagramInCanvas } from "./drawDiagramInCanvas";
import { LazyCanvasRedrawer } from "../LazyCanvasRedrawer";

export { IGuitarChordDiagramProps, IFingeredNote }

const defaultProps: IGuitarChordDiagramProps = {
	position: null,
	numFrets: 5,
	fingeredNotes: [8, 12, 15, 19, 20].map(n => ({semitonesFromBase: n, isTonic: n === 8 || n === 20})),
	color: 'black'
}

export class GuitarChordDiagram extends LazyCanvasRedrawer<IGuitarChordDiagramProps, {}> {
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
					onClick={(e: any) => {
						// 
					}}
			></canvas>
		);
	}

	static defaultProps = defaultProps
}

