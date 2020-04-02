import { IPoint, subtractPoints } from "@musicenviro/base";

const dragDebounceInterval = 100;

export class CanvasMouseManager {
	dragImage: HTMLImageElement;
	canvas: HTMLCanvasElement;

	lastDragStamp: number = 0;
	dragStart: IPoint;

	initialize(canvas: HTMLCanvasElement) {
		this.dragImage = document.createElement("img");
		this.dragImage.setAttribute(
			"style",
			"width:" + 1 + "px;height:" + 1 + "px;border:none;display:block"
		);
		this.dragImage.src =
			"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
		// this.dragImage.setAttribute('opacity', '0')

		canvas.draggable = true;
		canvas.ondragstart = event => this.handleMouseBoxDragStart(event);
		canvas.ondrag = event => this.handleMouseBoxDrag(event);
	}

	handleMouseBoxClick(ref: React.RefObject<HTMLDivElement>) {
		ref.current.style.backgroundColor = "black";
	}

	handleMouseBoxDragStart(event: DragEvent) {
		console.log("started dragging at", event.clientX, event.clientY);
		this.dragStart = { x: event.clientX, y: event.clientY };

		// hide the ghost image
		event.dataTransfer.setDragImage(this.dragImage, 1000, 1000);
	}

	handleMouseBoxDragEnd(ref: React.RefObject<HTMLCanvasElement>) {
		console.log("stopped dragging");
	}

	handleMouseBoxDrag(event: DragEvent) {
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
