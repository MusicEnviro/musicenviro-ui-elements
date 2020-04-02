import { IPoint } from "@musicenviro/base";

export function mousePointInElement(canvas: HTMLElement, e: MouseEvent): IPoint {
	const rect = canvas.getBoundingClientRect();
	const clickedPoint = { x: Math.floor(e.clientX - rect.left), y: Math.floor(e.clientY - rect.top) };
	return clickedPoint;
}
