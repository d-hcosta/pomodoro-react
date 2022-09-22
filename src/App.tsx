import React, { useContext, useState } from "react";
import { FormContainer } from "./components/formContainer";
import { PomodoroTimer } from "./components/pomodoroTimer";
import { PomodoroContext } from "./context/PomodoroContext"

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
              pomodoroTime={pomodoroTime}
              shortRestTime={shortRest}
              longRestTime={longRest}
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

        <small><br />Made by <a href='https://www.linkedin.com/in/diegohoc/'>Vrag.</a></small>
      </div>
  );
}

export default App;
 