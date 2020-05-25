import { IPoint } from "@musicenviro/base";
import { propToAbs, IPropOptions } from "./convert";

export function drawLine(
	ctx: CanvasRenderingContext2D,
	start: IPoint,
	end: IPoint,
	color: string = "black",
	width: number = 1,
	dash: number[] = []
) {

	
	// could be a bit inefficient.
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.setLineDash(dash);

	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
}

export function drawLineP(
	ctx: CanvasRenderingContext2D,
	propOptions: IPropOptions,
	start: IPoint,
	end: IPoint,
	color: string = "black",
	width: number = 1,
	dash: number[] = []
) {
	drawLine(
		ctx,
		propToAbs(ctx, start, propOptions || undefined),  // convert null to undefined so we get the default
		propToAbs(ctx, end, propOptions || undefined),
		color, width, dash
	);
}
