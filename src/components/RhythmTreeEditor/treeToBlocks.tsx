import _ from 'lodash';
import { IRect } from '@musicenviro/base';
import { IRhythmTree, nodeUnitLength } from '../../musical-data/trees';
import { IBlock } from "./types";

export function treeToBlocks(tree: IRhythmTree, depth: number): IBlock[] {
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
		}
		else {
			result.push({
				rect: {
					left: edges[i],
					top: 0,
					right: edges[i + 1],
					bottom: 0.3,
				},
				depth,
				unitLength: node.units,
				id: node.id,
			}, ...fitBlocksToRect(treeToBlocks(node.subtree, depth + 1), {
				left: edges[i],
				top: 0.3,
				right: edges[i + 1],
				bottom: 1,
			}));
		}
	});
	return result;
}

function fitBlocksToRect(blocks: IBlock[], rect: IRect): IBlock[] {
	return blocks.map(block => ({
		...block,
		rect: {
			left: rect.left + block.rect.left * (rect.right - rect.left),
			top: rect.top + block.rect.top * (rect.bottom - rect.top),
			right: rect.left + block.rect.right * (rect.right - rect.left),
			bottom: rect.top + block.rect.bottom * (rect.bottom - rect.top),
		},
	}));
}
