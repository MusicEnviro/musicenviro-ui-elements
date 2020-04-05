import * as React from 'react'
import { SingleNoteLane } from "../SingleNoteLane/SingleNoteLane";

interface MultiNoteLanesProps {
    onChange: (instrument: number, notes: number[]) => void
}

export function MultiNoteLanes(props: MultiNoteLanesProps) {
    return (
        <div>{
                ['blue', 'green', 'orange', 'red'].map((color, i) => {
                    return (
                        <SingleNoteLane 
                            key={i}
                            style={{...SingleNoteLane.defaultProps.style, color}}
                            onChange={
                                notes => props.onChange && props.onChange(i, notes)
                            } />
                    )
                })
            }
        </div>
    )
}