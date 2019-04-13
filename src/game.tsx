import React from 'react';
import Board from './board';
import { SquareValue } from './square';


interface IGameState {
    history: Array<{ summary: string, squares: SquareValue[], xIsNext: boolean}>,
}

export default class Game extends React.Component<any, IGameState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    summary: "Game Start",
                    xIsNext: true,
                },
            ],
        }
    }
    public render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.squares);

        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board squares={current.squares} onClick={this.handleOnClick}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{history.map((step, i) => {
                const onClick = () => this.jumpTo(i);
                return (
                    <li key={i}>
                        <button onClick={onClick}>
                            {step.summary}
                        </button>
                    </li>
                );
            })}</ol>
            </div>
        </div>
        );
    }

    private handleOnClick = (i: number): void => {
        const history = this.state.history;
        const current = history[history.length - 1];
        if (this.calculateWinner(current.squares) || current.squares[i]) {
            return;
        }

        const squares = current.squares.slice(); // copy
        const player = current.xIsNext ? 'X' : 'O';
        squares[i] = player;
        
        const row = ['C', 'A', 'B'][(i + 1) % 3];
        const column = Math.floor(i / 3) + 1;
        const summary = 'Player ' + player + ' takes ' + row + column;

        this.setState({ history: history.concat([{ summary, squares, xIsNext: !current.xIsNext }]) });
    };

    private jumpTo = (i: number): void => {
        const history = this.state.history;
        this.setState({ history: history.slice(0, i+1) });
    }

    private calculateWinner = (squares: SquareValue[]): SquareValue => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // winner
            }
        }
        return null;
    };
}