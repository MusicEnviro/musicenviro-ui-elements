import _ from 'lodash';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { Pixels, IRect } from '@musicenviro/base';
import { IRhythmTree, tree44, nodeUnitLength } from '../../musical-data/trees';

interface IRhythmTreeEditorProps {
	tree: IRhythmTree;

	backgroundColor?: string;
	width?: Pixels;
	height?: Pixels;
}

const defaultProps: IRhythmTreeEditorProps = {
	tree: tree44,
	backgroundColor: 'lightgrey',
	width: 900,
	height: 400,
};

export const RhythmTreeEditor: FunctionComponent<IRhythmTreeEditorProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement>();
	const [tree, setTree] = useState<IRhythmTree>();

	useEffect(() => {
		// use different representation with an extra node above
		setTree({ nodes: [{ units: 1, subtree: props.tree }] });
	}, [props]);

	useEffect(() => {
		redraw();
	}, [tree]);

	function redraw() {
		if (!tree) return
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		drawBlocksInCanvas(ctx, treeToBlocks(tree, 0));
	}

	return (
		<div className="volume-knob" style={{ width: props.width, height: props.height }}>
			<canvas
				ref={canvasRef}
				width={props.width}
				height={props.height}
				style={{ backgroundColor: props.backgroundColor, borderRadius: 3 }}
			></canvas>
		</div>
	);
};
RhythmTreeEditor.defaultProps = defaultProps;

interface IBlock {
	rect: IRect;
	depth: number;
	unitLength: number;
}

function drawBlocksInCanvas(ctx: CanvasRenderingContext2D, blocks: IBlock[]) {
	const padding = 2;

	ctx.font = '12px Arial';
	ctx.textAlign = 'center';

	blocks.forEach(block => {
		const rect = {
			left: block.rect.left * ctx.canvas.width,
			top: block.rect.top * ctx.canvas.height,
			right: block.rect.right * ctx.canvas.width,
			bottom: block.rect.bottom * ctx.canvas.height,
		};

		ctx.fillStyle = `rgb(${255 - block.depth * 40}, 0, 0)`;
		ctx.fillRect(
			rect.left + padding,
			rect.top + padding,
			rect.right - rect.left - padding * 2,
			rect.bottom - rect.top - padding * 2,
		);

		ctx.fillStyle = 'white';
		ctx.fillText(
			block.unitLength.toString(),
			(rect.left + rect.right) / 2,
			(rect.bottom + rect.top) / 2,
		);
	});
}

function treeToBlocks(tree: IRhythmTree, depth: number): IBlock[] {
	const proportions = tree.nodes.map(nodeUnitLength);
	const total = proportions.reduce((sum, p) => sum + p, 0);
	const edges = proportions.reduce((accum, p) => [...accum, _.last(accum) + p / total], [0]);

	const result: IBlock[] = [];

	tree.nodes.forEach((node, i) => {
		if (typeof node === 'number') {
			result.push({
				rect: {
					left: edges[i],
					top: 0,
					right: edges[i + 1],
					bottom: 1,
				},
				depth,
				unitLength: node,
			});
		} else {	
			result.push(
				{
					rect: {
						left: edges[i],
						top: 0,
						right: edges[i + 1],
						bottom: 0.3,
					},
					depth,
					unitLength: node.units,
				},
				...fitBlocksToRect(treeToBlocks(node.subtree, depth + 1), {
					left: edges[i],
					top: 0.3,
					right: edges[i + 1],
					bottom: 1,
				}),
			);
		}
	});

	console.log({ tree, depth, result });
	return result;
}

function fitBlocksToRect(blocks: IBlock[], rect: IRect): IBlock[] {
	const result = blocks.map(block => ({
		...block,
		rect: {
			left: rect.left + block.rect.left * (rect.right - rect.left),
			top: rect.top + block.rect.top * (rect.bottom - rect.top),
			right: rect.left + block.rect.right * (rect.right - rect.left),
			bottom: rect.top + block.rect.bottom * (rect.bottom - rect.top),
		},
	}));

	console.log({ blocks, rect, result });
	return result;
}
