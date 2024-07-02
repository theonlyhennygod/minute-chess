"use client";

import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { getBestMove } from "../utils/chessAI";
import dynamic from "next/dynamic";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const ChessboardComponent = () => {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [playerColor, setPlayerColor] = useState("white");
  const [gameTime, setGameTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [user, setUser] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userData, setUserData] = useState(null); // State to hold user data from Firestore
  const db = getFirestore();

  const ChessboardComponent = dynamic(
    () => import("../components/ChessboardComponent"),
    { ssr: false }
  );

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(({ user }) => {
        fetchUserData(user.uid);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []); // Ensure this effect runs only once

  const fetchUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Use your data as needed
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    if (move === null) return;

    setFen(chess.fen());
    setTimeout(makeAIMove, 500);
  };

  const makeAIMove = () => {
    const bestMove = getBestMove(chess, 2); // Depth of 2 for simplicity
    chess.move(bestMove);
    setFen(chess.fen());
  };

  const handleTouchMove = (event) => {
    if (event.cancelable) {
      event.preventDefault();
      // Your logic for handling the touchmove event
    }
    // Additional logic for when the event is not cancelable, if necessary
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNewGame = () => {
    const newGame = new Chess();
    setChess(newGame); // Reset the chess game state
    setFen(newGame.fen()); // Reset the board position to the starting position
    setGameTime(0); // Reset game time to 0 or to the initial game time, if not 0
    setTimeLeft(0);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
      <Chessboard
        position={fen}
        onDrop={onDrop}
        orientation={playerColor}
        width={400}
      />
      <button
        className="bg-red-500 text-white py-2 px-4 mt-8 rounded"
        onClick={() =>
          setPlayerColor(playerColor === "white" ? "black" : "white")
        }
      >
        Switch Color
      </button>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>
      <div className="mt-4">
        {user ? (
          <div>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
          </div>
        ) : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Sign In Anonymously
          </button>
        )}
      </div>
    </div>
  );
};

export default ChessboardComponent;
