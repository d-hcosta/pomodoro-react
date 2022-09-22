import { useContext } from "react"
import { PomodoroContext } from "../context/PomodoroContext"
import { zeroLeft } from "../utils/zeroLeft";

export function FormContainer(): JSX.Element {
  const { pomodoroTime, setPomodoroTime, setShortRest,
    setLongRest, shortRest, longRest, steps, setSteps } = useContext(PomodoroContext);

  const handlePomodoro = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const number = parseFloat(e.target.value)
    setPomodoroTime(number);
  }

  const handleShortRest = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const number = parseFloat(e.target.value)
    setShortRest(number);
  }

  const handleLongRest = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const number = parseFloat(e.target.value)
    setLongRest(number);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSteps(steps + 1);
  }

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <small>One of the best ways to be productive.</small>

      <div className="form-container">
        <form>
          <div className="input-wrapper">
            <div className="single-input">
              <input
                className='input'
                type='number'
                value={pomodoroTime}
                onChange={handlePomodoro}
                name='pomodoroTime'
              />
              <small>Inicial Time</small>
            </div>

            <div className="single-input">
              <input
                className='input'
                type='number'
                value={shortRest}
                onChange={handleShortRest}
                name='shortRest'
              />
              <small>Short Rest</small>
            </div>
            
            <div className="single-input">
              <input
                className='input'
                type='number'
                value={longRest}
                onChange={handleLongRest}
                name='longRest'
              />
              <small>Long Rest</small>
            </div>
          </div>
          <button onClick={handleClick}>Start</button>
        </form>
      </div>
    </>
  )
}