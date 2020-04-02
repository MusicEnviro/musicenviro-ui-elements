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

// =============================================================================
// config
// =============================================================================

const radii = [7, 5, 2.5];
const tickSizes = [0.2, 0.15, 0.075];

// =============================================================================
// main
// =============================================================================

export class SingleNoteLane extends LazyCanvasRedrawer {
	tree: IRhythmTree = tree44;

	mouseBoxes: React.RefObject<HTMLDivElement>[] = [];

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
		[...Array(5)].forEach(() => this.addMouseBox());
		this.forceUpdate();

		this.img = document.createElement("img");
		this.img.setAttribute(
			"style",
			"width:" + 1 + "px;height:" + 1 + "px;border:none;display:block"
		);
		this.img.src = "resources/tiny-image.png"
			// "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

	}

	handleMouseBoxClick(ref: React.RefObject<HTMLDivElement>) {
		ref.current.style.backgroundColor = "black";
	}

	handleMouseBoxDragStart(
		ref: React.RefObject<HTMLDivElement>,
		event: React.DragEvent<HTMLDivElement>
	) {
		console.log("started dragging " + ref.current.id);

		
		event.dataTransfer.setDragImage(this.img, 0, 0);
	}

	handleMouseBoxDragEnd(ref: React.RefObject<HTMLDivElement>) {
		console.log("stopped dragging " + ref.current.id);
	}

	handleMouseBoxDrag(
		ref: React.RefObject<HTMLDivElement>,
		event: React.DragEvent<HTMLDivElement>
	) {
		// console.log('drag')
		const target = event.target as HTMLDivElement;
		if (event.clientX === 0 && event.clientY === 0) return;

		const movement = {
			x: event.clientX - target.getBoundingClientRect().left,
			y: event.clientY - target.getBoundingClientRect().top
		};

		// console.log(movement, event.clientX)
	}

	render() {
		return (
			<div>
				{this.mouseBoxes.map((ref, i) => (
					<div
						ref={ref}
						key={i}
						id={"box" + i}
						style={{
							height: 50,
							width: 50,
							border: "solid 1px",
							position: "absolute",
							top: Math.floor(Math.random() * 100),
							left: Math.floor(Math.random() * 100)
						}}
						onClick={() => this.handleMouseBoxClick(ref)}
						draggable={true}
						onDrag={event => this.handleMouseBoxDrag(ref, event)}
						onDragStart={event =>
							this.handleMouseBoxDragStart(ref, event)
						}
					></div>
				))}
				{super.render()}
			</div>
		);
	}
}
