import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { GameControls } from './GameControls';
import { WinnerModal } from './WinnerModal';
import "./SnakeLadder.css";
import axios from 'axios';

export const Game = ({
  players,
  playersCount,
  currentPlayer,
  winner,
  onRollDice,
  onNewGame,
  switchPlayer,
  scores,
  resetGame,
  showPopup,
  matchId
}) => {
  const [timer, setTimer] = useState(600); // 6 minutes in seconds
  const [turnTimer, setTurnTimer] = useState(2); // 10 seconds for each turn
  const [round, setRound] = useState(1); // Track current round
  const [cumulativeScores, setCumulativeScores] = useState(Array(playersCount).fill(0)); // Track cumulative scores
  // console.log(players, winner)
  const [gamePlayers, setGamePlayers] = useState([]);
  useEffect(() => {
    setGamePlayers(players.slice(0, playersCount).map(player => ({
      name: player.name,
      score: player.score
    })));
  }, [players, playersCount]);
  console.log(gamePlayers)

  
  const updateScore = async () => {
    try {
      console.log("ok")
      await axios.put(`http://localhost:5000/api/snakeladder/update-score/${matchId}`, {
        players: gamePlayers
      });
      // console.log(`Updated score for ${player.name}`);
    } catch (error) {
      console.error(`Error updating score for:`, error);
    }
  }
  // Main game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          endGameDueToTimeout();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Turn timer (10 seconds per turn)



  useEffect(() => {
    if (turnTimer === 0) {
      switchPlayer(); // Switch turn if time runs out
      setTurnTimer(10); // Reset turn timer
      return;
    }

    const turnInterval = setInterval(() => {
      setTurnTimer((prevTurnTimer) => prevTurnTimer - 1);
    }, 1000);

    return () => clearInterval(turnInterval); // Cleanup interval
  }, [turnTimer, currentPlayer]);

  // Check if the current round is complete
  useEffect(() => {
    if (winner) {
      // Update cumulative scores
      const newCumulativeScores = cumulativeScores.map((score, index) => score + scores[index]);
      setCumulativeScores(newCumulativeScores);
      updateScore()
      if (round < 7) {
        // Move to the next round
        setRound((prevRound) => prevRound + 1);
        resetGame();
        setGamePlayers([])
      } else {
        endGameDueToRounds(newCumulativeScores);
    
      }
    }
  }, [winner]);

  const endGameDueToTimeout = () => {
    if (scores[0] > scores[1]) {
      showPopup(`Time's up! Player 1 wins this round with ${scores[0]} points!`, 0);
    } else if (scores[1] > scores[0]) {
      showPopup(`Time's up! Player 2 wins this round with ${scores[1]} points!`, 0);
    } else {
      showPopup(`Time's up! It's a draw for this round!`, 0);
    }
    resetGameForNextRound();
  };

  const endGameDueToRounds = async (cumulativeScores) => {
    const maxScore = Math.max(...cumulativeScores);
    const winningPlayers = cumulativeScores.reduce((winners, score, index) => {
      if (score === maxScore) winners.push(index + 1);
      return winners;
    }, []);

    if (winningPlayers.length === 1) {
      showPopup(`Game over! Player ${winningPlayers[0]} wins with ${maxScore} points!`, 0);
    } else {
      showPopup(`Game over! It's a draw between players ${winningPlayers.join(' and ')} with ${maxScore} points!`, 0);
    }
    resetGame(); // Reset the game completely
  };


  const resetGameForNextRound = () => {
    setTimer(600); // Reset main timer
    setTurnTimer(10); // Reset turn timer
    resetGame(); // Reset game state
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className="container">
        <div className="game-boxing realtive">

          {winner && <WinnerModal winner={winner} onNewGame={onNewGame} matchId={matchId} gamePlayers={gamePlayers} updateScore={updateScore} />}

          <h2 className='text-centre font-bold text-3xl '>Snake & Ladder</h2>
          <div className="timer text-center font-bold text-2xl">
            Time Remaining: <span className='text-red-600 font-bold'>{formatTime(timer)}</span>
          </div>
        </div>
        <Board players={players} playersCount={playersCount} />
        <div className="turn-timer text-center font-bold text-xl">
          Turn Time: <span className='text-blue-600 font-bold'>{turnTimer} seconds</span>
        </div>
        <GameControls
          players={players}
          playersCount={playersCount}
          currentPlayer={currentPlayer}
          onRollDice={onRollDice}
          points={scores}
        />
        <button className='text-black' onclick={endGameDueToRounds} >
          update
        </button>
      </div>
      {/* {winner && <WinnerModal winner={winner} onNewGame={onNewGame} />} */}
    </>
  );
};