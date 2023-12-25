import type { NextPage } from "next";
import type { KeyboardEvent } from "react";
import { useCallback } from "react";
import { useMemo, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import TrainFinishingRules from "../components/TrainFinishingRules";

type Mode = "easy" | "medium" | "hard" | "pro";

const modeMap = new Map<Mode, number>([
  ["easy", 4],
  ["medium", 3],
  ["hard", 2],
  ["pro", 1],
]);

const TrainFinishing: NextPage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [target, setTarget] = useState(121);
  const [mode, setMode] = useState<Mode>("medium");
  const [roundScore, setRoundScore] = useState<number[]>([]);
  const [round, setRound] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [help, setHelp] = useState(false);

  const calculateScoreLeft = useCallback(
    (scores: number[]) => {
      return target - scores.reduce((sum, value) => sum + value, 0);
    },
    [target]
  );

  const scoreLeft = useMemo(
    () => calculateScoreLeft(roundScore),
    [roundScore, calculateScoreLeft]
  );

  function addScore() {
    const currentMode = modeMap.get(mode);
    if (!currentMode) return;

    const scoreEl = document.getElementById("score") as HTMLInputElement;
    setGameStarted(true);
    const newRoundScore = [...roundScore];
    newRoundScore[round - 1] = +scoreEl.value;
    const pointsLeft = calculateScoreLeft(newRoundScore);
    if (!validScore(pointsLeft)) {
      setError("Invalid score");
      setTimeout(() => setError(""), 1500);
      scoreEl.focus();
      return;
    }
    setRoundScore(newRoundScore);
    if (round < currentMode && pointsLeft !== 0) {
      setRound(round + 1);
      scoreEl.value = "";
      scoreEl.focus();
      return;
    }
    setSuccess(pointsLeft === 0);
    setGameOver(true);
  }

  function validScore(pointsLeft: number): boolean {
    const currentMode = modeMap.get(mode);
    if (!currentMode) return false;

    if (round < currentMode) {
      return pointsLeft > 1 || pointsLeft === 0;
    }
    return pointsLeft >= 0;
  }

  function handleScoreInputKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
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

    const scoreEl = document.getElementById("score") as HTMLInputElement;
    scoreEl.value = "";
    scoreEl.focus();
  }

  function undoScore() {
    setRoundScore(roundScore.slice(0, -1));
    if (round - 1 === 1) {
      setGameStarted(false);
    }
    if (gameOver) {
      setGameOver(false);
    }
    setRound(round - 1);
    const scoreEl = document.getElementById("score") as HTMLInputElement;
    scoreEl.focus();
  }

  return (
    <>
      <div className={`flex flex-col gap-12 px-4 py-16 ${help ? "blur" : ""}`}>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-400 lg:text-5xl">
          Train finishing staring from 121
        </h1>
        <p className="italic text-white">
          *These scores will not be saved into a database
        </p>

        <div className="flex w-full justify-center text-xl font-semibold text-white">
          <div className="max-w-lg flex-1">
            <div>
              <div className="flex items-end gap-2">
                <p>Choose mode </p>
                <FaRegQuestionCircle
                  className="cursor-pointer"
                  onClick={() => setHelp(true)}
                />
              </div>
              <div className="my-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <button
                  className={`btn ${
                    mode === "easy" ? "border-x-4 border-zinc-400" : ""
                  }`}
                  onClick={() => setMode("easy")}
                  disabled={gameStarted}
                >
                  Easy
                </button>
                <button
                  className={`btn ${
                    mode === "medium" ? "border-x-4 border-zinc-400" : ""
                  }`}
                  onClick={() => setMode("medium")}
                  disabled={gameStarted}
                >
                  Medium
                </button>
                <button
                  className={`btn ${
                    mode === "hard" ? "border-x-4 border-zinc-400" : ""
                  }`}
                  onClick={() => setMode("hard")}
                  disabled={gameStarted}
                >
                  Hard
                </button>
                <button
                  className={`btn ${
                    mode === "pro" ? "border-x-4 border-zinc-400" : ""
                  }`}
                  onClick={() => setMode("pro")}
                  disabled={gameStarted}
                >
                  Pro
                </button>
              </div>
              <div className="relative mb-5 flex flex-col items-center">
                <span className="absolute top-0 left-0">
                  Throw: {round} / {modeMap.get(mode)}
                </span>
                <p>Left</p>
                <h3 className={`text-9xl transition ${error ? "blur-sm" : ""}`}>
                  {scoreLeft}
                </h3>
                {error && (
                  <div className="absolute top-16 text-center text-5xl text-red-400 drop-shadow-xl">
                    Invalid Score!
                  </div>
                )}
              </div>
              <hr />
              <div className="mt-2 grid grid-cols-2 gap-5">
                <button
                  className="btn col-span-2"
                  onClick={undoScore}
                  disabled={!gameStarted}
                >
                  Undo
                </button>
                <input
                  id="score"
                  type="number"
                  className="appearance-none rounded-md border border-white/50 bg-white/10 px-2"
                  onKeyDown={(e) => handleScoreInputKeyPress(e)}
                />
                <button className="btn" onClick={addScore} disabled={gameOver}>
                  Add score
                </button>
                <button
                  className="btn"
                  onClick={() => nextGame(true)}
                  disabled={!success}
                >
                  +1 Target
                </button>
                <button
                  className="btn"
                  onClick={() => nextGame(false)}
                  disabled={!gameOver}
                >
                  Try again
                </button>
                {success && (
                  <p className="col-span-2 text-center text-4xl">
                    Congrats, you hit the finish!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {help && <TrainFinishingRules onClose={setHelp} />}
    </>
  );
};

export default TrainFinishing;
