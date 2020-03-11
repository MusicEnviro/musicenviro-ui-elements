import * as React from "react";
import { IPianoKeyboardProps } from "./@types";
import { drawKeyboardInCanvas } from "./drawKeyboardInCanvas";

export function PianoKeyboard(props: IPianoKeyboardProps) {
	const canvasRef = React.useRef(null);
	const [drawStamp, setDrawStamp] = React.useState();

	function redraw() {
		if (!drawStamp || Date.now() - drawStamp > 500) {
			setDrawStamp(Date.now());

			const canvas = canvasRef.current as HTMLCanvasElement;
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			const ctx = canvas.getContext("2d");

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			drawKeyboardInCanvas(ctx, props);
		}
	}

	React.useEffect(() => {
		redraw();
		window.addEventListener("resize", redraw);
		return () => window.removeEventListener("resize", redraw);
	});

	return (
		<div style={{ height: "100px" }}>
			<canvas
				ref={canvasRef}
				className="keyboard"
				style={{ width: "100%", height: "100%" }}
				onClick={(e: any) => {
					console.log(canvasRef);
					const canvas = canvasRef.current as HTMLCanvasElement;
					const ctx = canvas.getContext("2d");
					drawKeyboardInCanvas(ctx, props);
				}}
			></canvas>
		</div>
	);
}
