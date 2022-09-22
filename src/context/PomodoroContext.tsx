import { createContext, ReactNode, useState } from "react";

type PomodoroContextProps = {
    children: ReactNode;
}

type PomodoroContextType = {
    pomodoroTime: number;
    setPomodoroTime: (newState: number) => void;
    shortRest: number;
    setShortRest: (newState: number) => void;
    longRest: number;
    setLongRest: (newState: number) => void;
    steps: number;
    setSteps: (newState: number) => void;
}

const initialValue = {
    pomodoroTime: 0,
    setPomodoroTime: () => {},    
    shortRest: 0,
    setShortRest: () => {},
    longRest: 0,
    setLongRest: () => {},
    steps: 1,
    setSteps: () => {},
}

export const PomodoroContext = createContext<PomodoroContextType>(initialValue);

export const PomodoroContextProvider = ({ children }: PomodoroContextProps) => {
    const [pomodoroTime, setPomodoroTime] = useState(initialValue.pomodoroTime);
    const [shortRest, setShortRest] = useState(initialValue.shortRest);
    const [longRest, setLongRest] = useState(initialValue.longRest);
    const [steps, setSteps] = useState(initialValue.steps);

    return (
        <PomodoroContext.Provider value=
            {{ 
                pomodoroTime, shortRest, longRest,
                setPomodoroTime, setShortRest, setLongRest,
                steps, setSteps
            }}>
            {children}
        </PomodoroContext.Provider>
    )
}