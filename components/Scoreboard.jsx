"use client";

// components/Scoreboard.js
const Scoreboard = ({ wins, losses }) => (
  <div className="text-center my-4">
    <p>Wins: {wins}</p>
    <p>Losses: {losses}</p>
  </div>
);

export default Scoreboard;
