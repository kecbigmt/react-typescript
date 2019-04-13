import React from 'react';

export type SquareValue = ('O' | 'X' | null);

interface ISquareProps {
    value: SquareValue;
    onClick: () => void;
}

export default (props: ISquareProps) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
};