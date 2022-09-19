import { useEffect, useState, useCallback } from 'react';
import { hoursFormatter } from '../utils/hoursFormatter';
import { useInterval } from '../hooks/useInterval';

import { Button } from './button';
import { Timer } from './timer';

const bellFinish = require('../sounds/bell-finish.mp3');
const bellStart = require('../sounds/bell-start.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [cyclesMngr, setCyclesMngr] = useState(new Array(props.cycles - 1).fill(true));
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);

    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);

    const [pomodorosCounting, setPomodorosCounting] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);

    useInterval(() => {
        setMainTime(mainTime - 1);
        if(working) setFullWorkingTime(fullWorkingTime + 1);
    }, timeCounting ? 1000 : null)

    const handleWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    }, [
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        props.pomodoroTime
    ]);

    const handleRest = useCallback((long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        
        if (long) {
            setMainTime(props.longRestTime);
        } else {
            setMainTime(props.shortRestTime)
        }

        audioStopWorking.play();
    }, [
        setTimeCounting, 
        setWorking, 
        setResting, 
        props.longRestTime, 
        props.shortRestTime
    ]);

    const handlePause = () => {
        setTimeCounting(!timeCounting)
    }

    useEffect(() => {
        if(working) document.body.classList.add('working');
        if(resting) document.body.classList.remove('working');

        if(mainTime > 0) return;

        if(working && cyclesMngr.length > 0) {
            handleRest(false);
            cyclesMngr.pop();
        } else if (working && cyclesMngr.length <= 0) {
            handleRest(true);
            setCyclesMngr(new Array(props.cycles -1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if(working) setPomodorosCounting(pomodorosCounting + 1);
        if(resting) handleWork();
    }, [
        pomodorosCounting,
        completedCycles, 
        setCyclesMngr, 
        props.cycles,
        handleWork, 
        handleRest, 
        cyclesMngr,
        mainTime,
        working, 
        resting 
    ]);

    return (
        <div className='pomodoro'>
            <h2>You are: {working ? 'Working' : 'Resting'}</h2>

            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text='Work' onClick={handleWork} />
                <Button text='Rest' onClick={() => handleRest(false)} />

                <Button 
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Play'} 
                    onClick={handlePause} 
                />
            </div>

            <div className="details">
                <p>Working time: {hoursFormatter(fullWorkingTime)}</p>
                <p>Completed cycles: {completedCycles}</p>
                <p>Completed pomodoros: {pomodorosCounting}</p>
            </div>
        </div>
    )
}