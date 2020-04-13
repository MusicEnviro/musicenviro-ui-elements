import * as React from 'react';
import { cellPadding, stepTypeAppearance } from '../config';
import styled from 'styled-components';
import { DiatonicStepType } from '@musicenviro/base';

const Cell = styled.div`
	box-sizing: border-box;
    padding-left: ${cellPadding}px;
    padding-top: ${cellPadding * 0.5}px;
    padding-bottom: ${cellPadding * 0.5}px;
	height: 100%;
	width: ${(100 / 16).toFixed(2)}%;
    float: left;
    border-bottom: solid 1px;
    
`;

const CellContents = styled.div`
	height: 100%;
    width: 100%;
    border-radius: 10%;
`;

interface ILaneCellProps {
	depth: number;
    stepType: DiatonicStepType;
    activated: boolean;
    onClick: (e: React.MouseEvent) => void;
}

const depthSuffix = [3, 3, 0, 2];

export const LaneCell: React.FunctionComponent<ILaneCellProps> = props => {
    
    return (
		<Cell>
			<CellContents
				className={`color-${stepTypeAppearance[props.stepType].classStem}-${
					depthSuffix[props.depth]
                }`}
                style={{opacity: props.activated ? 1 : 0.25}}
                onClick={props.onClick}
			></CellContents>
		</Cell>
	);
};
