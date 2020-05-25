import React from 'react';
import { useRedrawer } from './useRedrawer';

interface IProps {
	n: number;
}

export const HookTester: React.FunctionComponent<IProps> = props => {
	const [canvasRef] = useRedrawer<IProps>(props, draw, 1000, [props]);

	function draw(ctx: CanvasRenderingContext2D) {
		ctx.fillText(props.n.toString(), 10, 10)
	}

	return <canvas ref={canvasRef} />;
};
