import React from 'react';
import { secondsFormatter } from '../utils/secondsFormatter';

interface Props {
    mainTime: number,
}

export function Timer(props: Props): JSX.Element {
    return (
        <div className="timer">
            {secondsFormatter(props.mainTime)}
        </div>
    )
}