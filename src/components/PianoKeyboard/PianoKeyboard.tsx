import * as React from "react";
import { IPianoKeyboardProps, IKey, IPianoKeyboardState } from "./@types";
import { drawKeyboardInCanvas } from "./drawKeyboardInCanvas";
import { LazyCanvasRedrawer } from "../LazyCanvasRedrawer";
import { IPoint, pointInRect } from "@musicenviro/base";

const defaultProps: IPianoKeyboardProps = {
	onNoteDown: () => { },
	onNoteUp: () => { },
	keyRange: {
		min: 36,
		max: 72
	}
}

export { IPianoKeyboardProps }



export class PianoKeyboard extends LazyCanvasRedrawer<IPianoKeyboardProps, IPianoKeyboardState> {
	constructor(props: IPianoKeyboardProps) {
		super(props)
		this.state = {
			depressedKeys: []
		}
	}
	
	keys: IKey[] = []

	draw(ctx: CanvasRenderingContext2D) {
		this.keys = drawKeyboardInCanvas(ctx, this.props, Array.from(this.state.depressedKeys));
		console.log(this.state.depressedKeys)
	}

	handleClick(e: MouseEvent) {
		const key = this.getKeyUnderPoint({x: e.clientX, y: e.clientY})
		if (key) {
			this.setState((prevState, props) => {
				const prevDep = prevState.depressedKeys
				return {
					depressedKeys: prevDep.includes(key.pitch)
						? prevDep.filter(n => n !== key.pitch)
						: [...prevDep, key.pitch]
				}
			})
		}
	}

	getKeyUnderPoint(point: IPoint): IKey | null {
		const blackKeys = this.keys.filter(key => key.type === 'Black')
		const blackKeyUnderPoint = blackKeys.find(key => pointInRect(point, key.rect))
		if (blackKeyUnderPoint) {
			return blackKeyUnderPoint
		} else {
			const whiteKeys = this.keys.filter(key => key.type === 'White')
			const whiteKeyUnderPoint = whiteKeys.find(key => pointInRect(point, key.rect))
			return whiteKeyUnderPoint || null
		}
	}

	render() {
		return (
				<canvas
					height={'200px'}
					ref={this.ref}
					className="keyboard"
					style={{ width: "100%", height: "100%" }}
					onClick={(e: any) => this.handleClick(e)}
				></canvas>
		);
	}

	static defaultProps = defaultProps
}

