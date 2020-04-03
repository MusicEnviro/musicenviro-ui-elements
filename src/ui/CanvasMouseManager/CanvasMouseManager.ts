import { IPoint, subtractPoints, IRect, pointInRect } from "@musicenviro/base";
import { EventEmitter } from "events";
import { mousePointInElement } from "../../utils/clickedPointInCanvas";

const dragDebounceInterval = 100;

let counter = 0;

export class MouseArea {
	rect: IRect;
	id: number;
	
	// hide the actual emitter, type-safe methods below.
	private emitter = new EventEmitter()
	
	constructor(rect: IRect, id: number) {
		this.rect = rect;
		this.id = id
	}

	emitMouseDown(p: IPoint) {
		this.emitter.emit("mousedown", p)
	}
	onMouseDown(callback: (p: IPoint) => void): void {
		this.emitter.on("mousedown", callback);
	}

	emitMouseEnter() {
		this.emitter.emit("mouseenter")
	}
	onMouseEnter(callback: () => void): void {
		this.emitter.on("mouseenter", callback);
	}
	
	emitMouseLeave() {
		this.emitter.emit("mouseleave")
	}
	onMouseLeave(callback: () => void): void {
		this.emitter.on("mouseleave", callback);
	}
}

export class CanvasMouseManager extends EventEmitter {
	dragImage: HTMLImageElement;
	canvas: HTMLCanvasElement;

	lastDragStamp: number = 0;
	dragStart: IPoint;

	areas: MouseArea[] = [];
	hover = new Set<MouseArea>()

	initialize(canvas: HTMLCanvasElement) {
		// we're going to take over the events, this could override or be overridden
		// by calls elsewhere. Best to subscribe to events from this manager,
		// we echo them out.
		this.canvas = canvas

		canvas.onmousedown = event => this.handleMouseDown(event);
		canvas.onmousemove = event => this.handleMove(event);

		canvas.draggable = true;
		canvas.ondragstart = event => this.handleDragStart(event);
		canvas.ondrag = event => this.handleDrag(event);

		canvas.onmouseleave = event => this.handleMouseLeave(event);

		// --------------------------------------------------------------------------
		// for hiding the ghost image rendered by browsers on drag
		// --------------------------------------------------------------------------

		this.dragImage = document.createElement("img");
		this.dragImage.setAttribute(
			"style",
			"width:" + 1 + "px;height:" + 1 + "px;border:none;display:block"
		);
		this.dragImage.src =
			"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

		// this.dragImage.setAttribute('opacity', '0') // not sure if this is necessary
	}

	getTopHover() {
		return this.hover.values().next().value
	}

	createArea(
		left: number,
		top: number,
		right: number,
		bottom: number,
		id: number
	): MouseArea {
		const area = new MouseArea({ left, top, right, bottom }, id);
		this.areas.push(area);
		return area;
	}

	getAreaUnderPoint(point: IPoint): MouseArea {
		return this.areas.find(area => pointInRect(point, area.rect));
	}

	getAllAreasUnderPoint(point: IPoint): Set<MouseArea> {
		return new Set(this.areas.filter(area => pointInRect(point, area.rect)))
	}

	handleMouseDown(event: MouseEvent) {
		const point = mousePointInElement(this.canvas, event)
		
		const area = this.getAreaUnderPoint(point);
		
		if (area) {
			area.emitMouseDown(
				subtractPoints(point, { x: area.rect.left, y: area.rect.top })
			);
		}
		this.emit("mousedown", event);
	}

	handleMove(event: MouseEvent) {
		const hovering = this.getAllAreasUnderPoint(mousePointInElement(this.canvas, event))
		
		// get leave/enter transitions
		hovering.forEach(area => {
			if (!this.hover.has(area)) area.emitMouseEnter()
		})

		this.hover.forEach(area => {
			if (!hovering.has(area)) area.emitMouseLeave()
		})

		this.hover = hovering

		this.emit("mousemove", event)
	}

	handleMouseLeave(event: MouseEvent) {
		this.hover.forEach(area => area.emitMouseLeave())
		this.hover.clear()
	}

	handleDragStart(event: DragEvent) {
		// console.log("started dragging at", event.clientX, event.clientY);
		this.dragStart = { x: event.clientX, y: event.clientY };

		// hide the ghost image
		event.dataTransfer.setDragImage(this.dragImage, 1000, 1000);
	}

	handleMouseBoxDragEnd(ref: React.RefObject<HTMLCanvasElement>) {
		// console.log("stopped dragging");
	}

	handleDrag(event: DragEvent) {
		if (Date.now() - this.lastDragStamp > dragDebounceInterval) {
			// if (event.clientX === 0 && event.clientY === 0) return;

			const movement = subtractPoints(
				{ x: event.clientX, y: event.clientY },
				this.dragStart
			);

			console.log(movement);

			this.lastDragStamp = Date.now();
		} else {
			// could have a timer here
		}
	}
}
