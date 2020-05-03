import _ from 'lodash';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { IPoint, Pixels } from '@musicenviro/base';

const dbRange = {
	min: -60,
	max: 12,
};

const radiansStart = Math.PI * 0.75;
const radiansEnd = Math.PI * 2.25;
const yCenterAdjustProportion = 0.04;

export interface IVolumeKnobProps {
	indicatorColor?: string;
    backgroundColor?: string;
    size?: Pixels;
}

export const VolumeKnob: FunctionComponent<IVolumeKnobProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement>();
	const [db, setDb] = useState<number>(0);

	function handleMouseDown(e: React.MouseEvent) {
		let y = e.clientY;
		let originalDb = db;

		window.addEventListener('mouseup', handleWindowMouseUp);
		window.addEventListener('mousemove', handleWindowMouseMove);

		function handleWindowMouseMove(e: MouseEvent) {
			setDb(
				Math.floor(_.clamp(originalDb - (e.clientY - y) * 0.4, dbRange.min, dbRange.max)),
			);
		}

		function handleWindowMouseUp() {
			console.log('handleWindowMouseUp');
			window.removeEventListener('mouseup', handleWindowMouseUp);
			window.removeEventListener('mousemove', handleWindowMouseMove);
		}
	}

	useEffect(() => {
		// clear canvas
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const center = {
			x: ctx.canvas.width / 2,
			y: ctx.canvas.height * (0.5 + yCenterAdjustProportion),
		};

		// draw background
		drawArc(1, 'black', ctx.canvas.width / 6);

		// draw indicator
		drawArc((db - dbRange.min) / (dbRange.max - dbRange.min), props.indicatorColor, ctx.canvas.width / 8);

		function drawArc(ratioFilled: number, color: string, lineWidth: number) {
			ctx.beginPath();

			const start = radiansStart;
			const end = radiansStart + ratioFilled * (radiansEnd - radiansStart);

			ctx.arc(center.x, center.y, ctx.canvas.width / 3, start, end);
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.stroke();
		}
	}, [db]);

	return (
		<div>
			<canvas
				ref={canvasRef}
				width={props.size}
				height={props.size}
				style={{ backgroundColor: props.backgroundColor, border: 'solid 1px' }}
				onMouseDown={handleMouseDown}
			></canvas>
		</div>
	);
};

VolumeKnob.defaultProps = {
	backgroundColor: '#ccc',
    indicatorColor: 'orange',
    size: 50
};
