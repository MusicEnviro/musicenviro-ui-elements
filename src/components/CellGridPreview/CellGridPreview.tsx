import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pixels } from '@musicenviro/base';

// not importing lazy redrawer, surely we can make this a functional component.

const Div = styled.div`
	background-color: red;
	color: white;
`;

const Canvas = styled.canvas`
    background-color: #eee;
`;

export interface ISimpleCell {
    row: number;
    column: number;
    color: string;
};

export interface ICellGridPreviewProps {
	width?: Pixels;
	height?: Pixels;

	numRows?: number;
	numColumns?: number;
	cells?: Array<ISimpleCell>;
}

export const CellGridPreview: React.FunctionComponent<ICellGridPreviewProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement>();

	useEffect(() => {
		draw();
	}, [props]);

	function draw() {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// clear
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const rowWidth = canvas.width / props.numRows;
		const columnHeight = canvas.height / props.numColumns;

		props.cells.forEach(cell => {
			ctx.fillStyle = cell.color;
			ctx.fillRect(cell.row * rowWidth, cell.column * columnHeight, rowWidth - 5, 5);
		});
	}

	return (
		<Canvas  className='cell-grid-preview'
			ref={canvasRef}
			style={{
				height: props.height,
				width: props.width,
			}}
		/>
	);
};

CellGridPreview.defaultProps = {
	width: 100,
	height: 100,
	numRows: 10,
	numColumns: 10,
	cells: [{
        row: 3,
        column: 5,
        color: "blue"
    }],
};
