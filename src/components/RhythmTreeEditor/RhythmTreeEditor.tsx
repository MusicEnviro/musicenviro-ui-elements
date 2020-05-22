import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { Pixels } from '@musicenviro/base';
import { IRhythmTree, tree44, addIds, TreeObjectNode } from '../../musical-data/trees';
import { treeToBlocks } from './treeToBlocks';
import { IBlock } from './types';
import { KeyMonitor } from '@musicenviro/base';

interface IRhythmTreeEditorProps {
	initialTree: IRhythmTree;
	backgroundColor?: string;
	width?: Pixels;
	height?: Pixels;
	onChange?: (newTree: IRhythmTree) => void;
}

const defaultProps: IRhythmTreeEditorProps = {
	initialTree: tree44,
	backgroundColor: 'lightgrey',
	width: 900,
	height: 400,
};

export const RhythmTreeEditor: FunctionComponent<IRhythmTreeEditorProps> = props => {
	const [tree, setTree] = useState<IRhythmTree>();
	const [blocks, setBlocks] = useState<IBlock[]>([]);
	const [selectedId, setSelectedId] = useState<number>(null);

	useEffect(() => {
		setTree(addIds({ nodes: [{ units: 1, subtree: props.initialTree }] }));
	}, [props]);

	useEffect(() => {
		if (!tree) return;
		setBlocks(treeToBlocks(tree, 0));
	}, [tree]);

	useEffect(() => {
		const callback: KeyMonitor.Callback = (key, state) => {
			if (state === 'Up' || typeof selectedId !== 'number') return;
			switch (key) {
				case 'ArrowRight':
					if (selectedId !== 0) {
						setTree(
							changeNode(
								tree,
								selectedId,
								node => ({ ...node, units: node.units + 1 }),
								num => num + 1,
							),
						);
					}

					break;
				case 'ArrowLeft':
					if (selectedId !== 0) {
						setTree(
							changeNode(
								tree,
								selectedId,
								node => ({ ...node, units: node.units === 1 ? 1 : node.units - 1 }),
								num => (num === 1 ? 1 : num - 1),
							),
						);
						break;
					}
				case 'ArrowUp':
					// remove last child node
					setTree(
						addIds(
							changeNode(tree, selectedId, node => ({
								...node,
								subtree: node.subtree
									? node.subtree.nodes.length === 1
										? typeof node.subtree.nodes[0] === 'number'
											? null
											: node.subtree.nodes[0].subtree
										: {
												nodes: node.subtree.nodes.slice(0, -1),
										  }
									: null,
							})),
						),
					);
					break;

				case 'ArrowDown':
					// append child node
					setTree(
						addIds(
							changeNode(tree, selectedId, node => ({
								...node,
								subtree: {
									nodes: [
										...(node.subtree ? node.subtree.nodes : []),
										{ units: 1, subtree: null },
									],
								},
							})),
						),
					);
					break;
					
				case 'Backspace':
					if (selectedId !== 0) {
						setTree(deleteNode(tree, selectedId));
						setSelectedId(Math.max(0, selectedId - 1));
						break;
					}
			}
		};

		KeyMonitor.onTransition(callback);
		return () => KeyMonitor.removeListener(callback);
	}, [selectedId, tree]);

	return (
		<div
			className="rhtyhm-tree-editor"
			style={{ position: 'relative', width: props.width, height: props.height }}
			onMouseLeave={() => setSelectedId(null)}
		>
			{...blocks.map(block => (
				<div
					key={block.id}
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
		</div>
	);

	function toPercent(n: number) {
		return (n * 100).toString() + '%';
	}
};
RhythmTreeEditor.defaultProps = defaultProps;

export function getColor(block: IBlock, selected: boolean): string {
	const byte = selected ? 225 - block.depth * 30 : 175 - block.depth * 20;
	return selected ? `rgb(${byte}, 0, 0)` : `rgb(${byte}, ${byte}, ${byte})`;
}

function changeNode(
	tree: IRhythmTree,
	id: number,
	modifier: (node: TreeObjectNode) => TreeObjectNode,
	numericNodeModifier: (node: number) => TreeObjectNode | number = n => n,
): IRhythmTree {
	return {
		nodes: tree.nodes.map(node => {
			if (typeof node === 'number') return numericNodeModifier(node);
			if (node.id === id) return modifier(node);
			return {
				...node,
				subtree: node.subtree ? changeNode(node.subtree, id, modifier) : null,
			};
		}),
	};
}

function deleteNode(tree: IRhythmTree, id: number): IRhythmTree {
	// a bit inefficient because it keeps searching even once the id has been found, but ...
	return addIds({
		nodes: tree.nodes
			.map(node => {
				if (typeof node === 'number') return node;
				if (node.id === id) return null;
				return {
					...node,
					subtree: node.subtree ? deleteNode(node.subtree, id) : null,
				};
			})
			.filter(Boolean),
	});
}
