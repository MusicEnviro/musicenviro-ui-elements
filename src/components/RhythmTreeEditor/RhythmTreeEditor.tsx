import _ from 'lodash';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { Pixels, IRect } from '@musicenviro/base';
import { IRhythmTree, tree44, nodeUnitLength, addIds } from '../../musical-data/trees';

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
	const [blocks, setBlocks] = useState<IBlock[]>([]);
	const [selectedId, setSelectedId] = useState<number>();

	useEffect(() => {
		// use different representation with an extra node above
		setTree(addIds({ nodes: [{ units: 1, subtree: props.tree }] }));
	}, [props]);

	useEffect(() => {
		if (!tree) return;
		setBlocks(treeToBlocks(tree, 0));
	}, [tree]);

	useEffect(() => {
		// redraw();
	}, [blocks]);

	// canvas drawing, maybe deprecate
	function redraw() {
		if (!tree) return;
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		drawBlocksInCanvas(ctx, blocks, selectedId);
	}

	return (
		<div
			className="rhtyhm-tree-editor"
			style={{ position: 'relative', width: props.width, height: props.height }}
		>
			{...blocks.map(block => (
				<div
					style={{
						position: 'absolute',

						left: toPercent(block.rect.left),
						top: toPercent(block.rect.top),
						width: toPercent(block.rect.right - block.rect.left),
						height: toPercent(block.rect.bottom - block.rect.top),
						lineHeight: props.height * (block.rect.bottom - block.rect.top) + 'px',
						backgroundColor: getColor(block, block.id === selectedId),

						border: 'solid 2px white',
						textAlign: 'center',
						color: 'white',
					}}

					onClick={() => setSelectedId(block.id)}
				>
					<p
						style={{
							lineHeight: 1.5,
							display: 'inline-block',
							verticalAlign: 'middle',
						}}
					>
						{block.unitLength.toString()}
					</p>
				</div>
			))}

			{/* <canvas
				ref={canvasRef}
				width={props.width}
				height={props.height}
				style={{ backgroundColor: props.backgroundColor, borderRadius: 3 }}
			></canvas> */}
		</div>
	);

	function toPercent(n: number) {
		return (n * 100).toString() + '%';
	}
};
RhythmTreeEditor.defaultProps = defaultProps;

interface IBlock {
	rect: IRect;
	depth: number;
	unitLength: number;
	id?: number;
}

function drawBlocksInCanvas(ctx: CanvasRenderingContext2D, blocks: IBlock[], selectedId) {
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

		ctx.fillStyle = getColor(block, block.id === selectedId);
		ctx.fillRect(
			rect.left + padding,
			rect.top + padding,
			rect.right - rect.left - padding * 2,
			rect.bottom - rect.top - padding * 2,
		);

		ctx.fillStyle = 'white';
		ctx.fillText(
			block.id.toString(),
			(rect.left + rect.right) / 2,
			(rect.bottom + rect.top) / 2,
		);
	});
}

function getColor(block: IBlock, selected: boolean): string {
	const byte = selected ? 255 - block.depth * 40 : 175 - block.depth * 20;
	return selected ? `rgb(${byte}, 0, 0)` : `rgb(${byte}, ${byte}, ${byte})`;
}

function treeToBlocks(tree: IRhythmTree, depth: number): IBlock[] {
	const proportions = tree.nodes.map(nodeUnitLength);
	const total = proportions.reduce((sum, p) => sum + p, 0);
	const edges = proportions.reduce((accum, p) => [...accum, _.last(accum) + p / total], [0]);

	const result: IBlock[] = [];

	tree.nodes.forEach((node, i) => {
		if (typeof node === 'number' || !node.subtree) {
			result.push({
				rect: {
					left: edges[i],
					top: 0,
					right: edges[i + 1],
					bottom: 1,
				},
				depth,
				unitLength: nodeUnitLength(node),
				id: typeof node === 'number' ? null : node.id,
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
					id: node.id,
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
