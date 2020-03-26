import * as React from 'react'

export class LazyCanvasRedrawer<T> extends React.Component<T> {    
    drawStamp: number = 0;
    ref: React.RefObject<HTMLCanvasElement>;

    constructor(props: T) {
		super(props)
		this.ref = React.createRef()

		this.handleResize = this.handleResize.bind(this)
    }

    draw(ctx: CanvasRenderingContext2D) {
        // specialize this
    }
    
    redraw(force: boolean = false) {
		if (force || !this.drawStamp || Date.now() - this.drawStamp > 500) {
			this.drawStamp = Date.now()

			const canvas = this.ref.current as HTMLCanvasElement;

			// Make it visually fill the positioned parent
			canvas.style.width ='100%';
			canvas.style.height='100%';
			// ...then set the internal size to match
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			const ctx = canvas.getContext("2d");

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this.draw(ctx)
		}
	}

	handleResize() {
		this.redraw()
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize)
		this.redraw()
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize)
	}

	componentDidUpdate() {
		this.redraw(true);
	}
}