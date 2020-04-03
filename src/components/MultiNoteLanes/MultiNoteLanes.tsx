import * as React from 'react'
import { SingleNoteLane } from "../SingleNoteLane/SingleNoteLane";


export function MultiNoteLanes() {
    return (
        <div>
            <SingleNoteLane style={{...SingleNoteLane.defaultProps.style, color: 'blue'}} />
            <SingleNoteLane style={{...SingleNoteLane.defaultProps.style, color: 'green'}} />
            <SingleNoteLane style={{...SingleNoteLane.defaultProps.style, color: 'orange'}} />
            <SingleNoteLane style={{...SingleNoteLane.defaultProps.style, color: 'red'}} />
        </div>
    )
}