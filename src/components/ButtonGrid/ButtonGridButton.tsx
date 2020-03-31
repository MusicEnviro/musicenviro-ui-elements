import { IButtonGridProps } from "./@types";
import * as React from 'react'

export function ButtonGridButton(
	col: number,
	gridProps: IButtonGridProps,
	row: number,
	gridHandleClick: (
		e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
		row: number,
		col: number
	) => void
): JSX.Element {
    const [clicked, setClicked] = React.useState<boolean>(false);
    
	return (
		<td
			className="button-grid-button"
			key={col}
			style={{
				backgroundColor: clicked ? gridProps.clickColor : gridProps.style.color,
				borderRadius: "5px"
			}}
			onMouseDown={e => {
                setClicked(true)
                gridHandleClick(e, row, col)
            }}
            onMouseUp={() => setTimeout(() => setClicked(false), 100)}
		></td>
	);
}
