"use client";

import ChessboardComponent from '../components/ChessboardComponent';
import Timer from '../components/Timer';
import Scoreboard from '../components/Scoreboard';
import { useLocalStorage } from '@/utils/helpers';

const Home = () => {
  const [settings, setSettings] = useLocalStorage('settings', {
    color: 'white',
    timer: 3,
    theme: 'brown',
    difficulty: 'easy',
  });
  const [wins, setWins] = useLocalStorage('wins', 0);
  const [losses, setLosses] = useLocalStorage('losses', 0);

  const handleGameEnd = (result) => {
    if (result === 'win') {
      setWins(wins + 1);
    } else {
      setLosses(losses + 1);
    }
  };

  return (
    <div>
      <main className="container mx-auto p-4 mt-8">
        <ChessboardComponent settings={settings} onGameEnd={handleGameEnd} />
        <Timer initialTime={settings.timer * 60} onTimeEnd={handleGameEnd} />
        <Scoreboard wins={wins} losses={losses} />
      </main>
    </div>
  );
};

export default Home;
