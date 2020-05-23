export interface TreeObjectNode {
	id?: number;
	units: number;
	subtree?: IRhythmTree;
}

export type TreeNode = TreeObjectNode | number;

export interface IRhythmTree {
	nodes: TreeNode[]
}

export interface ITreePoint {
	position: number;
	depth: number;
}

export const tree44: IRhythmTree = {
	nodes: [...Array(4)].map(() => ({
		units: 1,
		subtree: { nodes: [1,1,1,1] }
		// subtree: { nodes: [...Array(2)].map(() => ({ units: 1, subtree: { nodes: [1, 1] } })) },
	})),
};

export const exampleTree1 = {
	nodes: [
		1,
		{
			units: 1,
			subtree: {
				nodes: [1, 1],
			},
		},
	],
};

export const exampleTree2 = {
	nodes: [
		{
			units: 1,
			subtree: {
				nodes: [1, 1, 1],
			},
		},
		{
			units: 2,
			subtree: {
				nodes: [
					1,
					1,
					{
						units: 3,
						subtree: {
							nodes: [1, 1, 1, 1],
						},
					},
				],
			},
		},
		{
			units: 1,
			subtree: {
				nodes: [1, 1, 1, 1],
			},
		},
	],
};

export function nodeUnitLength(node: TreeNode) {
	return typeof node === 'number' ? node : node.units
}

// supply a unique numeric id to every node. 
// necessarily, convert numeric nodes to object nodes
export function addIds(tree: IRhythmTree): IRhythmTree {
	let idCounter = 0
	return rec(tree);
	
	function rec(subtree: IRhythmTree): IRhythmTree {
		return {
			nodes: subtree.nodes.map(node => {
				if (typeof node === 'number') {
					return {
						id: idCounter++,
						units: node,
					}
				} else  {
					return {
						id: idCounter++,
						units: node.units,
						subtree: node.subtree ? rec(node.subtree) : null
					}
				} 
			})
		}
	}
}

export function getRhythmPoints(
	tree: IRhythmTree,
	depth: number = 0,
	start: number = 0,
	totalDuration: number = 1,
): ITreePoint[] {
	let position = start;
	const unitSize = totalDuration / numUnits(tree);
	const result: ITreePoint[] = [];

	tree.nodes.forEach((node, i) => {
		if (typeof node === 'number') {
			result.push({ position, depth: i === 0 ? depth : depth + 1 });
			position += unitSize * node;
		} else {
			const nextDepth = getRhythmPoints(node.subtree, depth + 1, position, unitSize * node.units);

			// if this is the first node of a tree, the first point is always the top depth
			const adjustedFirst = i === 0 ? { ...nextDepth[0], depth } : nextDepth[0];

			result.push(...[adjustedFirst, ...nextDepth.slice(1)]);
			position += unitSize * node.units;
		}
	});

	return result;
}




// -----------------------------------------------------------------------------
// module-scope helpers
// -----------------------------------------------------------------------------

function numUnits(tree: IRhythmTree): number {
	return tree.nodes.reduce((sum: number, node) => sum + (typeof node === 'number' ? node : node.units), 0) as number;
}




// -----------------------------------------------------------------------------
// test
// -----------------------------------------------------------------------------

// console.log(JSON.stringify(getRhythmPoints({ nodes: [1, 1, 1, 1] })));
// console.log(JSON.stringify(tree44, null, 4));
// console.log(JSON.stringify(getRhythmPoints(tree44), null, 4));
