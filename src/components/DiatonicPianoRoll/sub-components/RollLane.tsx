import * as React from 'react';
import { Pixels, DiatonicStepType } from '@musicenviro/base';
import styled from 'styled-components';
import { lanePadding, stepTypeAppearance, cellPadding } from '../config';
import { IRhythmTree, tree44, getRhythmPoints } from '../../SingleNoteLane/trees';
import { LaneCell } from './LaneCell';
import { ILaneData } from '../@types';

const Lane = styled.div`
	box-sizing: border-box;
	padding: ${lanePadding}px ${lanePadding}px 0px ${lanePadding}px;
	width: 100%;
`;

const LaneContents = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding-right: ${cellPadding}px;
`;

interface IRollLaneProps {
	height?: string;
	stepType?: DiatonicStepType;
    laneData: ILaneData;
    onClick?: (cellIndex: number) => void
    
}

export const RollLane: React.FunctionComponent<IRollLaneProps> = props => {
	return (
		<Lane style={{ height: props.height }}>
			<LaneContents
			// className={`color-${stepTypeAppearance[props.stepType].classStem}-1`}
			>
				{getRhythmPoints(props.laneData.gridTree).map((rp, i) => (
					<LaneCell
						key={'cell' + i}
						depth={rp.depth}
                        stepType={props.stepType}
                        activated={props.laneData.cells[i].active}
						onClick={() => props.onClick(i)}
					></LaneCell>
				))}
			</LaneContents>
		</Lane>
	);
};
RollLane.defaultProps = {
	height: '50px',
	stepType: 'Root',
    laneData: {
        gridTree: tree44,
        cells: getRhythmPoints(tree44).map(() => ({active: false}))
    }
};
