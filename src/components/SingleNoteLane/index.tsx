// =============================================================================
// imports
// =============================================================================

import {
	LazyCanvasRedrawer,
	lazyCanvasRedrawerDefaultProps
} from "../LazyCanvasRedrawer";
import { drawLineP } from "../../graphics/canvas-drawing/drawLine";
import { drawCircleP } from "../../graphics/canvas-drawing/drawCircle";
import { IRhythmTree, getRhythmPoints, tree44 } from "./trees";
import * as React from "react";
import { IPoint, subtractPoints } from "@musicenviro/base";
import { CanvasMouseManager } from "../../ui/CanvasMouseManager";

// =============================================================================
// config
// =============================================================================

const dragDebounceInterval = 50; // for dragging

const radii = [7, 5, 2.5];
const tickSizes = [0.2, 0.15, 0.075];

// =============================================================================
// main
// =============================================================================

export class SingleNoteLane extends LazyCanvasRedrawer {
	tree: IRhythmTree = tree44;
	
	mouseManager = new CanvasMouseManager()

	static defaultProps = {
		style: {
			...lazyCanvasRedrawerDefaultProps.style,
			border: "solid black 1px",
			color: "gray"
		},
		width: 750,
		height: 100
	};

	draw(ctx: CanvasRenderingContext2D) {
		drawLineP(
			ctx,
			{ absolutePadding: 10 },
			{ x: 0, y: 0.5 },
			{ x: 1, y: 0.5 },
			this.props.style.color
		);

		getRhythmPoints(this.tree).forEach(point => {
			drawLineP(
				ctx,
				{ absolutePadding: 10 },
				{ x: point.position, y: 0.5 + tickSizes[point.depth] * 0.5 },
				{ x: point.position, y: 0.5 - tickSizes[point.depth] * 0.5 },
				this.props.style.color
			);

			// drawCircleP(
			// 	ctx,
			// 	{ absolutePadding: 10, fixedRadius: true },
			// 	{ x: point.position, y: 0.5 },
			// 	radii[point.depth],
			// 	this.props.style.color
			// );
		});
	}

	img: HTMLImageElement

	componentDidMount() {
		super.componentDidMount();
		this.mouseManager.initialize(this.ref.current)

		const area = this.mouseManager.createArea(10, 10, 50, 50)
		
		area.onMouseDown(point => {
			console.log(point)
		})

		area.onMouseEnter(() => console.log('enter'))
		area.onMouseLeave(() => console.log('leave'))
	}

	// ----------------------------------------------------------------------------
	// mouse handlers
	// ----------------------------------------------------------------------------

	
}
