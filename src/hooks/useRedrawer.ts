import React, { useRef, useState, useEffect } from 'react';

type Timestamp = number;
type Milliseconds = number;


/**
 * usage: const [canvasRef] = useRedrawer<IComponentProps>(props, drawFn, 100, [props])
 * or with more restricted props to pass to the draw function and/or to use
 * as dependencies for the useEffect hook.
 */
export function useRedrawer<TProps>(
	props: TProps,  // is this necessary ???
	drawFn: (ctx: CanvasRenderingContext2D, props: TProps) => void,
	maximumDrawInterval: Milliseconds,
	deps?: React.DependencyList,
): [React.MutableRefObject<HTMLCanvasElement>] {

	const canvasRef = useRef<HTMLCanvasElement>();

	const [lastDraw, setLastDraw] = useState<Timestamp>();
	const [timerRunning, setTimerRunning] = useState<boolean>(false);

	const timer = useRef<NodeJS.Timer>();


	useEffect(() => {
		function redraw() {
			setLastDraw(Date.now());
			const ctx = canvasRef.current.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			drawFn(ctx, props);
		}

        if (timerRunning) {
			clearTimeout(timer.current);
			setTimerRunning(false);
		}

		if (!canvasRef.current) return;

		if (lastDraw < Date.now() - maximumDrawInterval) {
			redraw();
		} else {
			timer.current = setTimeout(redraw, maximumDrawInterval - (Date.now() - lastDraw));
			setTimerRunning(true);
		}
	}, deps);

	return [canvasRef];
}