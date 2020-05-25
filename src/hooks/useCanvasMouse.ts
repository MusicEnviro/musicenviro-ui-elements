import { EventEmitter } from 'events';
import React, { useEffect } from 'react';
import { subtractPoints, IPoint } from '@musicenviro/base';

export function useCanvasMouse(
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
    events: {
        onMouseMove?: (point: IPoint) => void;
        onMouseLeave?: () => void;
	},
	deps: React.DependencyList = []
) {
	useEffect(() => {
		const handleMouseMove = (ev: MouseEvent) => {
			const { left, top } = (ev.target as HTMLCanvasElement).getBoundingClientRect();
			const relativePoint = subtractPoints(
				{ x: ev.clientX, y: ev.clientY },
				{ x: left, y: top },
			);
			events.onMouseMove(relativePoint);
		};

		const handleMouseLeave = (ev: MouseEvent) => {
			events.onMouseLeave();
		};

		canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('mouseleave', handleMouseLeave);
        
		return () => canvasRef.current.removeEventListener('mousemove', handleMouseMove);
	}, deps);
}
