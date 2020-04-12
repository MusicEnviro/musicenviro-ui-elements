
import * as React from 'react'
import { Pixels, DiatonicStepType } from '@musicenviro/base'
import styled from 'styled-components'
import { lanePadding, stepTypeAppearance } from '../config'
import { IRhythmTree, tree44 } from '../../SingleNoteLane/trees'

interface IRollLaneProps {
    height?: string;
    stepType?: DiatonicStepType;
    gridTree?: IRhythmTree;
}

const Lane = styled.div`
    box-sizing: border-box;
    padding: ${lanePadding}px ${lanePadding}px 0px ${lanePadding}px;
    width: 100%
`

const LaneContents = styled.div`
    width: 100%;
    height: 100%;   
`
export const RollLane: React.FunctionComponent<IRollLaneProps> = props => {
    return (
        <Lane style={{height: props.height}}>
            <LaneContents className={`color-${stepTypeAppearance[props.stepType].classStem}-2`}></LaneContents>
        </Lane>
    )
}
RollLane.defaultProps = {
    height: "50px",
    stepType: 'Root',
    gridTree: tree44
}
