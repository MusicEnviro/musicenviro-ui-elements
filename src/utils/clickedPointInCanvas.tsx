import { IPoint } from "@musicenviro/base";

export function clickedPointInCanvas(canvas: HTMLCanvasElement, e: MouseEvent): IPoint {
	const rect = canvas.getBoundingClientRect();
	const clickedPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
	return clickedPoint;
}
