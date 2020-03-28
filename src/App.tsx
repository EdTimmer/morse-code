import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [isDot, setIsDot] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let pressed: boolean = false;
    let startTime: number = 0;
    let endTime: number = 0;
    let elapsedTime: number = 0;

    let pauseTimer: any;

    const pauseFunc = () => {
      pauseTimer = setTimeout(() => setIsPaused(true), 1000);
    }

    function stopTimer() {
      clearTimeout(pauseTimer);
    }

    const pressKey = (event: any) => {
      if (event.keyCode === 32 && !pressed) {
        pressed = true;
        startTime = Date.now();
        setIsPaused(false);
        stopTimer();

      }
    };

    const liftKey = (event: any) => {
      if (event.keyCode === 32) {
        endTime = Date.now();

        if (endTime !== 0) {
          elapsedTime = endTime - startTime;
          pressed = false;
          elapsedTime < 150 ? setIsDot(true) : setIsDot(false);
        }
        
        pauseFunc()
      }
    };
    // initiate the event handler
    // if (!pressed) {
    window.addEventListener("keydown", pressKey, false);
    // }

    // if (pressed) {
    window.addEventListener("keyup", liftKey, false);
    // }

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener("keydown", pressKey);
      window.removeEventListener("keyup", liftKey);
    };
  }, [isPaused]);

  return (
    <div className="App">
      {isDot ? <div>.</div> : <div>--</div>}
      {isPaused ? <div>Pause</div> : null}
    
    </div>);
}

export default App;
