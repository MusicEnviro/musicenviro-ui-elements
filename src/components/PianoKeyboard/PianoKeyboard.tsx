import * as React from "react";
import { IPianoKeyboardProps } from "./@types";
import { drawKeyboardInCanvas } from "./drawKeyboardInCanvas";
import { LazyCanvasRedrawer } from "../LazyCanvasRedrawer";

const defaultProps: IPianoKeyboardProps = {
	onNoteDown: () => { },
	onNoteUp: () => { },
	keyRange: {
		min: 48,
		max: 72
	}
}

export class PianoKeyboard extends LazyCanvasRedrawer<IPianoKeyboardProps> {
	draw(ctx: CanvasRenderingContext2D) {
		drawKeyboardInCanvas(ctx, this.props);
	}

	render() {
		return (
			<div style={{ height: "100px" }}>
				<canvas
					ref={this.ref}
					className="keyboard"
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

