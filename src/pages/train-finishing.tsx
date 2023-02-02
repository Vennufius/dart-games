import type { NextPage } from "next";
import { useMemo, useState, KeyboardEvent } from "react";
import {FaRegQuestionCircle} from 'react-icons/fa'
import {MdClose} from 'react-icons/md'

type Mode = "easy" | "medium" | "hard" | "pro";

const modeMap = new Map<Mode, number>([
  ['easy', 4],
  ['medium', 3],
  ['hard', 2],
  ['pro', 1],
]);

const TrainFinishing: NextPage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [target, setTarget] = useState(121);
  const [mode, setMode] = useState<Mode>("medium");
  const [roundScore, setRoundScore] = useState<number[]>([]);
  const [round, setRound] = useState<number>(1);
  const scoreLeft = useMemo(() => calculateScoreLeft(roundScore), [target, roundScore]);
  const [error, setError] = useState<string>('');
  const [help, setHelp] = useState(false);

  function calculateScoreLeft(scores:number[]) {
    return target - scores.reduce((sum, value) => sum + value, 0)
  }
  function addScore() {
    const scoreEl = document.getElementById('score') as HTMLInputElement;
    setGameStarted(true);
    const newRoundScore = [...roundScore];
    newRoundScore[round - 1] = +scoreEl.value;
    const pointsLeft = calculateScoreLeft(newRoundScore);
    if(!validScore(pointsLeft)) {
      setError('Invalid score');
      setTimeout(() => setError(''), 1500);
      scoreEl.focus();
      return;
    }
    setRoundScore(newRoundScore);
    if (round < modeMap.get(mode)! && pointsLeft !== 0) {
      setRound(round +1); 
      scoreEl.value = '';
      scoreEl.focus();
      return;
    }
    setSuccess(pointsLeft === 0);
    setGameOver(true);
  }

  function validScore(pointsLeft: number): boolean {
    if(round < modeMap.get(mode)!) {
      return pointsLeft > 1 || pointsLeft === 0;
    }
    return pointsLeft >= 0;
  }

  function handleScoreInputKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if(e.key === 'Enter'){
      addScore();
    }
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

  function undoScore() {
    setRoundScore(roundScore.slice(0, -1));
    if(round-1 === 1) {
      setGameStarted(false);
    }
    if(gameOver) {
      setGameOver(false);
    }
    setRound(round -1)
    const scoreEl = document.getElementById('score') as HTMLInputElement;
    scoreEl.focus();
  }

  return (
    <>
      <main className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-[#005165] to-[#001e29] ${help ? 'blur' : ''}`}>
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl font-semibold tracking-tight text-[hsl(185,80%,65%)] lg:text-5xl">
            Train finishing staring from 121
          </h1>
          <p className="text-white italic">*These scores will not be saved into a database</p>

          <div className="flex w-full justify-center text-xl font-semibold text-white">
              <div className="max-w-lg flex-1">
                <div>
                  <div className="flex gap-2 items-end">
                    <p>Choose mode </p>
                    <FaRegQuestionCircle className="cursor-pointer" onClick={() => setHelp(true)} />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-5">
                    <button className={`btn ${mode === 'easy' ? 'border-x-4 border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('easy')} disabled={gameStarted}>Easy</button>
                    <button className={`btn ${mode === 'medium' ? 'border-x-4 border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('medium')} disabled={gameStarted}>Medium</button>
                    <button className={`btn ${mode === 'hard' ? 'border-x-4 border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('hard')} disabled={gameStarted}>Hard</button>
                    <button className={`btn ${mode === 'pro' ? 'border-x-4 border-[hsl(185,80%,65%)]' : ''}`} onClick={() => setMode('pro')} disabled={gameStarted}>Pro</button>
                  </div>
                  <div className="flex flex-col items-center mb-5 relative">
                    <span className="absolute top-0 left-0">Throw: {round} / {modeMap.get(mode)}</span> 
                    <p>Left</p> 
                    <h3 className={`text-9xl transition ${error ? 'blur-sm' : ''}`}>{scoreLeft}</h3>
                  {error && <div className="text-5xl text-red-400 text-center absolute top-16 drop-shadow-xl">Invalid Score!</div>}
                  </div>
                  <hr />
                  <div className="grid mt-2 gap-5 grid-cols-2">
                    <button className="btn col-span-2" onClick={undoScore} disabled={!gameStarted}>Undo</button>
                    <input id="score" type="number" className="px-2 border border-white/50 rounded-md bg-white/10 appearance-none" onKeyDown={(e)=>handleScoreInputKeyPress(e)} /> 
                    <button className="btn" onClick={addScore} disabled={gameOver}>Add score</button>
                    <button className="btn" onClick={() => nextGame(true)} disabled={!success}>+1 Target</button>
                    <button className="btn"onClick={() => nextGame(false)} disabled={!gameOver}>Try again</button>
                    { success && <p className="col-span-2 text-4xl text-center">Congrats, you hit the finish!</p>}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full ${help ? '' : 'hidden'} grid place-content-center`}>
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative rounded-lg shadow bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white">
              <MdClose size={25}onClick={() => setHelp(false)}/>
            </button>
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="font-semibold lg:text-xl dark:text-white">
                How to play
              </h3>
            </div>
            <div className="p-6 text-gray-300">
              <p className="mb-2 text-md">Choosing mode:</p>
              <div className="text-sm grid gap-x-4 gap-y-2 grid-cols-[auto_1fr]">
                <span>Easy:</span><span>4 thorws, 3 darts per throw</span>
                <span>Medium:</span><span>3 thorws, 3 darts per throw</span>
                <span>Hard:</span><span>2 thorws, 3 darts per throw</span>
                <span>Pro:</span><span>1 thorws, 3 darts per throw</span>
              </div>
              <p className="my-2 text-md">Gameplay:</p>
              <p className="text-sm ">You have a set amount of throws (determined by the mode) to finish the target score. Finishing is done in the same manner as in 501 where you have to finish in a double. So to beat the game, you need to get to 0 from the target score before running out of throws and darts. If you manage to get to 0, you can increment the target by pressing the button &quot;+1 Target&quot;, otherwise you&apos;ll have to try again.</p>
            <div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainFinishing;
