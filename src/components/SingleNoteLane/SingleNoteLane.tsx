// =============================================================================
// imports
// =============================================================================

import {
	LazyCanvasRedrawer,
	lazyCanvasRedrawerDefaultProps,
} from '../../generic-components/LazyCanvasRedrawer/LazyCanvasRedrawer';
import { drawLineP } from '../../graphics/canvas-drawing/drawLine';
import { drawCircleP, drawCircle } from '../../graphics/canvas-drawing/drawCircle';
import { IRhythmTree, ITreePoint, getRhythmPoints, tree44 } from '../../musical-data/trees';
import * as React from 'react';
import { rectCenter, KeyMonitor } from '@musicenviro/base';
import { CanvasMouseManager, MouseArea } from '../../ui/CanvasMouseManager/CanvasMouseManager';
import { propToAbs, absToProp } from '../../graphics/canvas-drawing/convert';
import { ILazyCanvasRedrawerProps } from '../../generic-components/LazyCanvasRedrawer/types';

// =============================================================================
// config
// =============================================================================

const radii = [7, 5, 3, 2];
const hoverAreaRadius = 15;
const padding = 25;

// -----------------------------------------------------------------------------
// types
// -----------------------------------	------------------------------------------

export interface ISingleNoteLaneProps extends ILazyCanvasRedrawerProps {
	notes?: number[]; // index of gridTreePoints, derived from rhythm tree (tips of branches)
	tree?: IRhythmTree;
	onChange?: (notes: number[]) => void;
	noteColor?: string;
}

// =============================================================================
// main
// =============================================================================

export class SingleNoteLane extends LazyCanvasRedrawer<ISingleNoteLaneProps> {
	static defaultProps = {
		notes: [],
		tree: tree44,
		noteColor: 'red',
		width: 750,
		height: 50,
		onChange: () => {
			console.log('change');
		},
	} as ISingleNoteLaneProps;

	className: string = 'single-note-lane';

	keyMonitorCallback: KeyMonitor.Callback;

	gridTree: IRhythmTree;

	gridTreePoints: Array<ITreePoint & { area?: MouseArea }>;

	mouseManager = new CanvasMouseManager();

	constructor(props: ISingleNoteLaneProps) {
		super(props);
		this.setGridTree(props.tree);
	}

	setGridTree(tree: IRhythmTree) {
		this.gridTree = tree;
		this.gridTreePoints = getRhythmPoints(tree);
	}

	draw(ctx: CanvasRenderingContext2D) {
		drawLineP(ctx, { padding }, { x: 0, y: 0.5 }, { x: 1, y: 0.5 }, 'gray');

		this.highlights.forEach(area => {
			drawCircle(ctx, rectCenter(area.rect), hoverAreaRadius, 'gray', false, [3, 3]);
		});

		this.props.notes.forEach(note => {
			drawCircleP(
				ctx,
				{ padding, fixedRadius: true },
				{ x: this.gridTreePoints[note].position, y: 0.5 },
				hoverAreaRadius - 2,
				this.props.noteColor,
				true,
				0.5,
			);
		});

		this.gridTreePoints.forEach(point => {
			drawCircleP(
				ctx,
				{ padding, fixedRadius: true },
				{ x: point.position, y: 0.5 },
				radii[point.depth],
				'gray',
				true,
			);
		});
	}

	componentDidMount() {
		super.componentDidMount();

		// console.log('SingleNoteLane MOUNTING')

		this.mouseManager.initialize(this.ref.current);
		this.setupKeyEvents();

		this.setGridTree(this.props.tree);
		this.setAreas();
		this.redraw(true);
	}

	componentDidUpdate() {
		// console.log('SingleNoteLane UPDATING')

		this.setGridTree(this.props.tree);
		this.setAreas();
		this.redraw(true);
	}

	componentWillUnmount() {
		this.disposeKeyEvents();
	}

	private setupKeyEvents() {
		this.keyMonitorCallback = (key, newState) => {
			switch (key) {
				case 'Shift':
					this.updateHighlights();
					break;
			}
		};
		KeyMonitor.onTransition(this.keyMonitorCallback);
	}

	private disposeKeyEvents() {
		KeyMonitor.removeListener(this.keyMonitorCallback);
	}

	setAreas() {
		this.mouseManager.areas = [];
		this.gridTreePoints.forEach((treePoint, i) => {
			const pos = treePoint.position;
			const prop = { x: pos, y: 0.5 };
			const center = propToAbs(this.ref.current.getContext('2d'), prop, {
				padding,
			});

			const area = this.mouseManager.createArea(
				center.x - hoverAreaRadius,
				center.y - hoverAreaRadius,
				center.x + hoverAreaRadius,
				center.y + hoverAreaRadius,
				i,
			);

			area.onMouseEnter(() => this.updateHighlights());
			area.onMouseLeave(() => this.updateHighlights());
			area.onMouseDown(() => this.toggleNote(i));

			treePoint.area = area;
		});
	}

	getHoverPoint(): ITreePoint & { area?: MouseArea } {
		const hover = this.mouseManager.getTopHover();
		return this.gridTreePoints.find(point => point.area === hover);
	}

	updateHighlights() {
		this.highlights.clear();
		const hoverPoint = this.getHoverPoint();
		if (hoverPoint) {
			if (KeyMonitor.keysPressed.Shift) {
				this.multiplyPoint(hoverPoint).forEach(point => this.addHighlight(point.area));
			} else {
				this.highlights.add(hoverPoint.area);
			}
		}
		this.redraw(true);
	}

	multiplyPoint(point: ITreePoint): Array<ITreePoint & { area?: MouseArea }> {
		// pretty unconvential behaviour if the grid is not straight 16th notes!
		const pointIndex = this.gridTreePoints.indexOf(point);
		if (pointIndex === -1) throw new Error('point not found');

		const len = this.gridTreePoints.length;
		const indexes = new Set<number>(
			[0, 1, 2, 3].map(
				beat => (pointIndex + Math.floor((beat * len) / 4)) % this.gridTreePoints.length,
			),
		);

		return [...indexes].map(i => this.gridTreePoints[i]);
	}

	toggleNote(index: number) {
		let newNotes;

		if (this.props.notes.includes(index)) {
			newNotes = this.props.notes.filter(
				note => ![...this.highlights].map(area => area.id).includes(note),
			);
		} else {
			newNotes = [
				...new Set([...this.props.notes, ...[...this.highlights].map(area => area.id)]),
			];
		}

		this.props.onChange(newNotes);
		// this.props.notes = newNotes
		// this.props.onChange([...this.notes, pos])
		// this.redraw();
	}

	highlights = new Set<MouseArea>();

	addHighlight(area: MouseArea) {
		this.highlights.add(area);
		this.redraw(true);
	}

	removeHighlight(area: MouseArea) {
		this.highlights.delete(area);
		this.redraw(true);
	}

	removeAllHighlights() {
		this.highlights.clear();
		this.redraw(true);
	}
}
