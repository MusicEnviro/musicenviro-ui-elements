import _ from 'lodash'
import { INote, ITreePoint } from '../../musical-data';
import { IRange, IPoint, scale } from '@musicenviro/base';


function getClosestPointInOrderedList(n: number, list: number[]): number {
    for (let i = 0; i < list.length; i++) {
        if (list[i] < n) continue;
        if (i === 0) return list[0];
        return (n - list[i-1] < list[i] - n) ? list[i-1] : list[i]
    }
    return _.last(list)
}

export function getPianoRollHover(proportionalPoint: IPoint, treePoints: ITreePoint[], stepRange: IRange): INote | null {
    if (treePoints.length === 0) return null
    
    const positions = treePoints.map(p => p.position)
    const treePointIndex = positions.indexOf(getClosestPointInOrderedList(proportionalPoint.x, positions))

    const step = Math.round(scale(1 - proportionalPoint.y, {min: 0, max: 1}, stepRange))

    return {
			step,
			treePointIndex
		}
}
