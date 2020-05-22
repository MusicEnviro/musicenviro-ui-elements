import { getColor } from './RhythmTreeEditor';
import { IBlock } from "./types";
export function drawBlocksInCanvas(ctx: CanvasRenderingContext2D, blocks: IBlock[], selectedId: number) {
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
		ctx.fillRect(rect.left + padding, rect.top + padding, rect.right - rect.left - padding * 2, rect.bottom - rect.top - padding * 2);
		ctx.fillStyle = 'white';
		ctx.fillText(block.id.toString(), (rect.left + rect.right) / 2, (rect.bottom + rect.top) / 2);
	});
}
