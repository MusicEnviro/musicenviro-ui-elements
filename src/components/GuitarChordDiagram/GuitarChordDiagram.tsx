import * as React from "react";
import { IGuitarChordDiagramProps } from "./@types";
import { drawDiagramInCanvas } from "./drawDiagramInCanvas";
import { LazyCanvasRedrawer } from "../LazyCanvasRedrawer";

const defaultProps: IGuitarChordDiagramProps = {
	position: null,
	numFrets: 5,
	fingeredNotes: [8, 12, 15, 19, 20].map(n => ({semitonesFromBase: n, isTonic: n === 8 || n === 20})),
	color: 'black'
}

export class GuitarChordDiagram extends LazyCanvasRedrawer<IGuitarChordDiagramProps> {
	draw(ctx: CanvasRenderingContext2D) {
		drawDiagramInCanvas(ctx, this.props);
	}

	render() {
		return (
			<div>
				<canvas
					ref={this.ref}
					className="guitar-chord-diagram"
					style={{ width: "100%", height: "100%" }}
					onClick={(e: any) => {
						// 
					}}
				></canvas>
			</div>
		);
	}

	static defaultProps = defaultProps
}

