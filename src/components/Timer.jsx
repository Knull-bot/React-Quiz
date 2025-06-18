import { useEffect, useState } from "react";

export default function Timer({ time, onTimeOut, mode }) {
  // Handling our Time
  const [remainingTime, setRemainingTime] = useState(time);

  // Handling function after our Timer experied
  useEffect(() => {
    const timer = setTimeout(onTimeOut, time);

    return () => clearTimeout(timer);
  }, [time, onTimeOut]);

  // Handling function for reducing time in progress-bar
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 110);
    }, 100);
    console.log("INTERVAL");
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={time}
      className={mode}
    />
  );
}
