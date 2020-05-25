import React, { useEffect } from 'react';
import { subtractPoints, IPoint } from '@musicenviro/base';

export function useCanvasMouse(
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
    _events: {
        onMouseMove?: (point: IPoint) => void;
		onMouseLeave?: () => void;
		onMouseDown?: (point: IPoint) => void;
		onMouseUp?: (point: IPoint) => void;
	},
	deps: React.DependencyList = []
) {

	const events = {
		onMouseMove: () => {},
		onMouseLeave: () => {},
		onMouseDown: () => {},
		onMouseUp: () => {},
		..._events
	}

	useEffect(() => {
		
		const handleMouseMove = (ev: MouseEvent): void => events.onMouseMove(getRelativePoint(ev));
		const handleMouseDown = (ev: MouseEvent): void => events.onMouseDown(getRelativePoint(ev));
		const handleMouseUp = (ev: MouseEvent): void => events.onMouseUp(getRelativePoint(ev));

		canvasRef.current.addEventListener('mouseleave', events.onMouseLeave);
		canvasRef.current.addEventListener('mousemove', handleMouseMove)
		canvasRef.current.addEventListener('mousedown', handleMouseDown)
		canvasRef.current.addEventListener('mouseup', handleMouseUp)
		
		return () => {
			canvasRef.current.removeEventListener('mouseleave', events.onMouseLeave);
			canvasRef.current.removeEventListener('mousemove', handleMouseMove)
			canvasRef.current.removeEventListener('mousedown', handleMouseDown)
			canvasRef.current.removeEventListener('mouseup', handleMouseUp)

		}

	}, deps);

	function getRelativePoint(ev: MouseEvent) {
		const { left, top } = (ev.target as HTMLCanvasElement).getBoundingClientRect();
		const relativePoint = subtractPoints({ x: ev.clientX, y: ev.clientY }, { x: left, y: top });
		return relativePoint;
	}
}
