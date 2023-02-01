import type { NextPage } from "next";
import { useState } from "react";
// import { api } from "../utils/api";

type Mode = "easy" | "medium" | "hard" | "pro";

const modeMap = new Map<Mode, number>([
  ['easy', 4],
  ['medium', 3],
  ['hard', 2],
  ['pro', 1],
]);

const OneTwoOne: NextPage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [target, setTarget] = useState(121);
  const [mode, setMode] = useState<Mode>("medium");
  const [roundScore, setRoundScore] = useState<number[]>([]);
  const [round, setRound] = useState<number>(1);

  function addScore() {
    setGameStarted(true);
    const scoreEl = document.getElementById('score') as HTMLInputElement;
    const newRoundScore = [...roundScore];
    newRoundScore[round - 1] = +scoreEl.value;
    setRoundScore(newRoundScore);
    if (round < modeMap.get(mode)!) {
      setRound(round +1); 
      scoreEl.value = '0';
      return;
    }
    const poinstLeft = target - newRoundScore.reduce((sum, value) => sum + value, 0);
    setSuccess(poinstLeft === 0);
    setGameOver(true);
  }

  function nextGame(incrementTarget: boolean) {
    if (incrementTarget) {
      setTarget(target + 1);
    }
    setRound(1);
    setRoundScore([]);
    setSuccess(false);
    setGameStarted(false);
    setGameOver(false);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#005165] to-[#001e29]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl font-semibold tracking-tight text-[hsl(185,80%,65%)] lg:text-5xl">
            Train finishing staring from 121
          </h1>
          <p className="text-white italic">*These scores will not be saved into a database</p>

          <div className="flex w-full justify-center text-xl font-semibold text-white">
              <div className="max-w-lg flex-1">
                <div>
                  <p>Choose mode</p>
                  <div className="grid grid-cols-4 gap-2 mb-5 mt-2">
                    <button className={`btn ${mode === 'easy' ? 'border border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('easy')} disabled={gameStarted}>Easy</button>
                    <button className={`btn ${mode === 'medium' ? 'border border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('medium')} disabled={gameStarted}>Medium</button>
                    <button className={`btn ${mode === 'hard' ? 'border border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('hard')} disabled={gameStarted}>Hard</button>
                    <button className={`btn ${mode === 'pro' ? 'border border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('pro')} disabled={gameStarted}>Pro</button>
                  </div>
                  <div className="flex flex-col items-center mb-5 relative">
                    <span className="absolute top-0 left-0">Throw: {round} / {modeMap.get(mode)}</span> 
                    <p>Left</p> 
                    <h3 className="text-9xl">{target - roundScore.reduce((sum, value) => sum + value, 0)}</h3>
                  </div>
                  <hr />
                  {!gameOver && <div className="grid grid-cols-2 gap-2 mt-5"> 
                    <input id="score" type="number" className="px-2 rounded-md bg-white/10 appearance-none" defaultValue="0"/> 
                    <button className="btn" onClick={addScore}>Add score</button>
                  </div>}
                  {gameOver && <div className={`grid ${success ? 'grid-cols-2' : ''} gap-2 mt-5`}> 
                    { success && <button className="btn" onClick={() => nextGame(true)}>Increment target</button>}
                    <button className="btn"onClick={() => nextGame(false)}>Try again</button>
                    { success && <p className="col-span-2 text-4xl text-center">Congrats, you hit the finish!</p>}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OneTwoOne;
