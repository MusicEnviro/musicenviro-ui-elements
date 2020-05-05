import { IPoint } from '@musicenviro/base';

// see how many of these get created
console.log('instantiating mouse monitor');

export let mouseDown = false;
export let clientMousePosition: IPoint = null;

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);
// window.addEventListener('mousemove', handleMouseMove);

export function dispose() {
	window.removeEventListener('mousedown', handleMouseDown);
	window.removeEventListener('mouseup', handleMouseUp);
	// window.removeEventListener('mousemove', handleMouseMove);
}

function handleMouseDown() {
	mouseDown = true;
}

function handleMouseUp() {
	mouseDown = false;
}

function handleMouseMove(e: MouseEvent) {
	clientMousePosition = { x: e.clientX, y: e.clientY };
}
