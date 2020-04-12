
import * as React from 'react'
import { Pixels } from '@musicenviro/base'
import styled from 'styled-components'

interface IRollLaneProps {
    height: Pixels
}

const Lane = styled.div`
    background-color: gray;
    width: 100%
`


export const RollLane: React.FunctionComponent<IRollLaneProps> = props => {
    return (
        <Lane style={{height: props.height}}>
            
        </Lane>
    )
}
RollLane.defaultProps = {
    height: 50
}