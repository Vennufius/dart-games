import type { NextPage } from "next";
import { useState } from "react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const MAX_ROUNDS = 5;
  const utils = api.useContext();
  const highSegmentScoringQuery =
    api.highSegmentScoringRouter.getAll.useQuery();
  const highSegmentScoringCreate =
    api.highSegmentScoringRouter.create.useMutation({
      async onSuccess() {
        await utils.highSegmentScoringRouter.getAll.invalidate();
      },
    });
  const segments = ["20", "19", "18", "Bull"];
  const [totalScore, setTotalScore] = useState(0);
  const [round, setRound] = useState(1);
  const [roundScore, setRoundScore] = useState({
    dart1: 0,
    dart2: 0,
    dart3: 0,
  });
  const [dart, setDart] = useState(1);
  const [segment, setSegment] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function scoreDart(score: number) {
    if (dart === 1) {
      setRoundScore({
        ...roundScore,
        dart1: score,
      });
    }
    if (dart === 2) {
      setRoundScore({
        ...roundScore,
        dart2: score,
      });
    }
    if (dart === 3) {
      setRoundScore({
        ...roundScore,
        dart3: score,
      });
    }
    setDart(dart + 1);
    setTotalScore(totalScore + score);
  }

  function undoDart() {
    const undoScore = Object.values(roundScore)[dart - 2];
    if (undoScore !== undefined) {
      setDart(dart - 1);
      setTotalScore(totalScore - undoScore);
      return;
    }
    console.error("Round score undefined");
  }

  function nextSegment() {
    setDart(1);
    if (segment < segments.length - 1) {
      setSegment(segment + 1);
    } else {
      setSegment(0);
      if (round === MAX_ROUNDS) {
        setGameOver(true);
        highSegmentScoringCreate.mutate(totalScore);
        return;
      }
      setRound(round + 1);
    }
  }

  function restartGame() {
    setDart(1);
    setRound(1);
    setSegment(0);
    setTotalScore(0);
    setGameOver(false);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#005165] to-[#001e29]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl font-semibold tracking-tight text-[hsl(185,80%,65%)] lg:text-5xl">
            High Segment Scoring
          </h1>

          <div className="flex w-full justify-center text-xl font-semibold text-white">
            {gameOver && (
              <div>
                <h1>GAME OVER</h1>
                <p>You got {totalScore} points!</p>
                <button onClick={restartGame}>Play again!</button>
              </div>
            )}
            {!gameOver && (
              <div className="max-w-lg flex-1">
                <div className="mb-5">
                  <div className="lg:text-md flex justify-between text-sm">
                    <span>
                      Round: {round} / {MAX_ROUNDS}
                    </span>
                    <span>Score: {totalScore}</span>
                  </div>
                  <div className="grid place-content-center p-4 text-center">
                    <h3 className="text-sm lg:text-lg">Current Segment</h3>
                    <span className="text-5xl lg:text-9xl">
                      {segments[segment]}
                    </span>
                  </div>
                </div>
                <div className="lg:text-md grid grid-cols-3 gap-5 text-center text-sm lg:gap-8">
                  <div className="">Dart 1</div>
                  <div>Dart 2</div>
                  <div>Dart 3</div>
                  <div>{dart > 1 ? roundScore.dart1 : "-"}</div>
                  <div>{dart > 2 ? roundScore.dart2 : "-"}</div>
                  <div>{dart > 3 ? roundScore.dart3 : "-"}</div>
                  <hr className="col-span-3" />
                  <button
                    className="btn"
                    onClick={() => scoreDart(0)}
                    disabled={dart > 3}
                  >
                    Miss
                  </button>
                  <button
                    className="btn"
                    onClick={() => scoreDart(1)}
                    disabled={dart > 3}
                  >
                    {segments[segment] === "Bull" ? "Bull's ring" : "Single"}
                  </button>
                  <button
                    className="btn"
                    onClick={() => scoreDart(3)}
                    disabled={dart > 3}
                  >
                    {segments[segment] === "Bull" ? "Bullseye" : "Trebel"}
                  </button>

                  <button
                    className="btn col-span-3"
                    onClick={undoDart}
                    disabled={dart <= 1}
                  >
                    Undo
                  </button>
                  <button
                    className="btn col-span-3"
                    onClick={nextSegment}
                    disabled={dart < 4}
                  >
                    {round < MAX_ROUNDS
                      ? segment < segments.length - 1
                        ? "Next Segment"
                        : "Next Round"
                      : segment < segments.length - 1
                      ? "Next Segment"
                      : "End Game"}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="text-white">
            <h1>Highscores:</h1>
            <ul>
              {highSegmentScoringQuery.data
                ?.sort((a, b) => b.score - a.score)
                .map((result) => (
                  <li key={result.id}>
                    {result.createdAt.toLocaleDateString()} - {result.score} pts
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
