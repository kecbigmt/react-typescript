import React from 'react';
import Square, { SquareValue } from './square';

interface IBoardProps {
    squares: SquareValue[],
    onClick: (i: number) => void,
}

export default class Board extends React.Component<IBoardProps> {
    public render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }

    private renderSquare(i: number) {
        const onClick = () => this.props.onClick(i);
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={onClick}
            />
        );
    }
}