"use client";

import ChessboardComponentNoSSR from '../components/ChessboardComponent';
import Timer from '../components/Timer';
import Scoreboard from '../components/Scoreboard';
import { useFirestoreStorage } from '@/utils/useFirestoreStorage';

const Home = () => {
  const [settings, setSettings] = useFirestoreStorage('settings', {
    color: 'white',
    timer: 1,
    difficulty: 'medium',
  });
  const [wins, setWins] = useFirestoreStorage('wins', 0);
  const [losses, setLosses] = useFirestoreStorage('losses', 0);

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
        <ChessboardComponentNoSSR settings={settings} onGameEnd={handleGameEnd} />
        <Timer initialTime={settings.timer * 60} onTimeEnd={handleGameEnd} />
        <Scoreboard wins={wins} losses={losses} />
      </main>
    </div>
  );
};

export default Home;
