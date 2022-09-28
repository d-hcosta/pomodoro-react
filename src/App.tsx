import React, { useContext, useState } from "react";
import { FormContainer } from "./components/formContainer";
import { PomodoroTimer } from "./components/pomodoroTimer";
import { PomodoroContext } from "./context/PomodoroContext"
import { secondsFormatter, secondsToMin } from "./utils/secondsFormatter";

function App(): JSX.Element {
  const { pomodoroTime, shortRest, longRest, steps } = useContext(PomodoroContext);

  const createRenders = () => {
    const createRule = () => {
      switch (steps) {
        case 1: {
          return <FormContainer />
        }
        case 2: {
          return <PomodoroTimer
              pomodoroTime={secondsToMin(pomodoroTime)}
              shortRestTime={secondsToMin(shortRest)}
              longRestTime={secondsToMin(longRest)}
              cycles={4}
            />
        }
      }
    }
    return createRule()
  }

  return (
      <div className="container">
        
        {createRenders()}

        <small><br />What is <a href='https://en.wikipedia.org/wiki/Pomodoro_Technique'>Pomodoro Technique?</a></small>
        <small>Made by <a href='https://www.linkedin.com/in/diegohoc/'>Vrag.</a></small>
      </div>
  );
}

export default App;
 