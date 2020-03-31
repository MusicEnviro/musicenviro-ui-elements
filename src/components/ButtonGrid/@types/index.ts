export interface IButtonGridProps {
    style: React.CSSProperties;
    clickColor: string;
    numRows: number;
    numColumns: number;
    onButtonDown: (row: number, column: number) => void;
}
