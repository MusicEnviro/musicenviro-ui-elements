import * as React from "react";

import { ILazyCanvasRedrawerProps } from "./types";

export const lazyCanvasRedrawerDefaultProps: ILazyCanvasRedrawerProps = {
	width: 200,
	height: 200,
	style: {
		// boxSizing: 'border-box',
		// width: '100%',
		// height: '100%',
	}
};

export class LazyCanvasRedrawer<
	T extends ILazyCanvasRedrawerProps = ILazyCanvasRedrawerProps, // that's annoying, have to type it twice?
	S = {}
> extends React.Component<T, S> {
	className: string = "specify-this-in-subclass-please";

	drawStamp: number = 0;
	timer: NodeJS.Timer = null;
	interval: number = 100;

	ref: React.RefObject<HTMLCanvasElement>;

	static defaultProps = lazyCanvasRedrawerDefaultProps

	constructor(props: T) {
		super(props);
		this.ref = React.createRef();

		this.handleResize = this.handleResize.bind(this);
	}

	draw(ctx: CanvasRenderingContext2D) {
		// specialize this
	}

	redraw(force: boolean = false) {
		if (
			force ||
			!this.drawStamp ||
			Date.now() - this.drawStamp > this.interval
		) {
			this.drawStamp = Date.now();
			clearTimeout(this.timer);
			this.timer = null;

			const canvas = this.ref.current;
			if (!canvas) return
			
			// Make it visually fill the positioned parent
			// canvas.style.width = "100%";
			// canvas.style.height = "100%";
			// ...then set the internal size to match
			// canvas.width = canvas.clientWidth;
			// canvas.height = canvas.clientHeight;

			const ctx = canvas.getContext("2d");

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this.draw(ctx);
		} else {
			if (!this.timer) {
				this.timer = setTimeout(
					() => this.redraw(),
					Date.now() - this.drawStamp
				);
			}
		}
	}

	handleResize() {
		this.redraw();
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		this.redraw();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
		clearTimeout(this.timer)
	}

	componentDidUpdate() {
		this.redraw(true);
	}

	render() {
		return (
			<canvas
				style={{width: this.props.width, height: this.props.height}}
				height={this.props.height}
				width={this.props.width}
				ref={this.ref}
				className={this.className}
			></canvas>
		);
	}
}
