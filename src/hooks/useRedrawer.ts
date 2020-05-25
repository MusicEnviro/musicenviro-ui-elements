import React, { useRef, useState, useEffect } from 'react';

type Timestamp = number;
type Milliseconds = number;

export function useRedrawer<TProps>(
	props: TProps,
	drawFn: (ctx: CanvasRenderingContext2D, props: TProps) => void,
	maximumDrawInterval: Milliseconds,
	deps?: React.DependencyList,
): [React.MutableRefObject<HTMLCanvasElement>] {
	const [lastDraw, setLastDraw] = useState<Timestamp>();
	const [timerRunning, setTimerRunning] = useState<boolean>(false);

	const canvasRef = useRef<HTMLCanvasElement>();
	const timer = useRef<NodeJS.Timer>();

	function redraw() {
		setLastDraw(Date.now());
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		drawFn(ctx, props);
	}

	useEffect(() => {
        console.log('deps changed')

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