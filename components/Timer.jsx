// components/Timer.js
import { useEffect, useState } from "react";

const Timer = ({ initialTime, onTimeEnd }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          onTimeEnd("loss");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center my-4">
      Time Left: {Math.floor(time / 60)}:{time % 60 < 10 ? "0" : ""}
      {time % 60}
    </div>
  );
};

export default Timer;
