import * as React from 'react'
import { lanePadding } from "../config";
import styled from 'styled-components'

const Cell = styled.div`
    box-sizing: border-box;
    padding: ${lanePadding}px 0px ${lanePadding}px ${lanePadding}px;
    height: 100%
`

interface ILaneCellProps {
    depth: number;
}

export const LaneCell: React.FunctionComponent<ILaneCellProps> = props => {
    return (
        <Cell></Cell>
    )
}