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
	
	mouseBoxes: React.RefObject<HTMLDivElement>[] = [];
	lastDragStamp: number = 0

	static defaultProps = {
		style: {
			...lazyCanvasRedrawerDefaultProps.style,
			border: "solid black 1px",
			color: "gray"
		},
		width: 750,
		height: 100
	};

	addMouseBox() {
		this.mouseBoxes.push(React.createRef());
	}

	draw(ctx: CanvasRenderingContext2D) {
		drawLineP(
			ctx,
			{ absolutePadding: 10 },
			{ x: 0, y: 0.5 },
			{ x: 1, y: 0.5 },
			this.props.style.color
		);

		getRhythmPoints(this.tree).forEach(point => {
			// drawLineP(
			// 	ctx,
			// 	{ absolutePadding: 10 },
			// 	{ x: point.position, y: 0.5 + tickSizes[point.depth] * 0.5 },
			// 	{ x: point.position, y: 0.5 - tickSizes[point.depth] * 0.5 },
			// 	this.props.style.color
			// );

			drawCircleP(
				ctx,
				{ absolutePadding: 10, fixedRadius: true },
				{ x: point.position, y: 0.5 },
				radii[point.depth],
				this.props.style.color
			);
		});
	}

	img: HTMLImageElement

	componentDidMount() {
		super.componentDidMount();
		[...Array(5)].forEach(() => this.addMouseBox());
		this.forceUpdate();

		this.img = document.createElement("img");
		this.img.setAttribute(
			"style",
			"width:" + 1 + "px;height:" + 1 + "px;border:none;display:block"
		);
		this.img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
		// this.img.setAttribute('opacity', '0')

		this.ref.current.draggable = true
		this.ref.current.ondragstart = event => this.handleMouseBoxDragStart(event)
		this.ref.current.ondrag = event => this.handleMouseBoxDrag(event)
	}

	// ----------------------------------------------------------------------------
	// mouse handlers
	// ----------------------------------------------------------------------------

	dragStart: IPoint;

	handleMouseBoxClick(ref: React.RefObject<HTMLDivElement>) {
		ref.current.style.backgroundColor = "black";
	}

	handleMouseBoxDragStart(
		event: DragEvent
	) {
		console.log("started dragging at", event.clientX, event.clientY);
		this.dragStart = {x: event.clientX, y: event.clientY}
		
		// hide the ghost image
		event.dataTransfer.setDragImage(this.img, 1000, 1000);
	}

	handleMouseBoxDragEnd(ref: React.RefObject<HTMLCanvasElement>) {
		console.log("stopped dragging");
	}

	handleMouseBoxDrag(
		event: DragEvent
	) {
		
		if (Date.now() - this.lastDragStamp > dragDebounceInterval) {
			// if (event.clientX === 0 && event.clientY === 0) return;
			

			
			const movement = subtractPoints({x: event.clientX, y: event.clientY}, this.dragStart)

			console.log(movement)

			this.lastDragStamp = Date.now()
		} else {
			// could have a timer here
		}
	}
}
