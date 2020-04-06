import * as React from 'react';
import { SingleNoteLane } from '../SingleNoteLane/SingleNoteLane';

interface MultiNoteLanesProps {
	onChange: (instrument: number, notes: number[]) => void;
}

export class MultiNoteLanes extends React.Component<MultiNoteLanesProps> {
        
    lanes = [0,1,2,3].map(n => React.createRef<SingleNoteLane>());

    setNotes(lane: number, notes: number[]) {
        this.lanes[lane].current.setNotes(notes)
    }

    render() {
		return (
			<div>
                {['blue', 'green', 'orange', 'red'].map((color, i) => {
					return (
						<SingleNoteLane
                            key={i}
                            ref={this.lanes[i]}
							style={{ ...SingleNoteLane.defaultProps.style, color }}
							onChange={notes => this.props.onChange && this.props.onChange(i, notes)}
						/>
					);
				})}
			</div>
		);
	}
}
