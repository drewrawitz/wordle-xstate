import classnames from "classnames";
import { letterStatus } from "../wordle.utils";
import { useWordle } from "../wordle.hooks";
import type { WordleContext } from "../wordle.machine";

interface RowsProps {
  state: WordleContext;
  guess?: string;
  isCurrent?: boolean;
  isSolving?: boolean;
  isRevealing?: boolean;
}

const Rows: React.FC<RowsProps> = ({
  state,
  guess,
  isRevealing = false,
  isSolving = false,
  isCurrent = false,
}) => {
  const ROWS = 5;
  const { answer } = state;
  const currentGuess = state.guess;
  const rowKeys = Array(ROWS).keys();
  const rowGuess = isCurrent ? currentGuess : guess;
  const guessArray = rowGuess?.split("") || [];

  const getLetterStatus = (letter: string, index?: number) =>
    letter && !isCurrent
      ? letterStatus(letter, answer, guessArray, index)
      : "unplayed";

  return (
    <div
      className={classnames("Row-wrapper", {
        "Row-wrapper--revealing": isRevealing && isSolving,
      })}
    >
      {Array.from(rowKeys).map((i, rowIdx) => {
        const letter = guessArray[rowIdx] || "";
        const status = getLetterStatus(letter, rowIdx);

        return (
          <div
            key={i}
            className={classnames("Row-tile", {
              [`Row-tile--${status}`]: status !== "unplayed",
            })}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default function Board() {
  const COLUMNS = 6;
  const columnKeys = Array(COLUMNS).keys();
  const { state } = useWordle();
  const { guesses, solvingRow } = state.context;

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i, idx) => {
        const rowGuess = guesses[idx];

        return (
          <div key={i} className="Column">
            <Rows
              isRevealing={state.value === "revealing"}
              state={state.context}
              guess={rowGuess}
              isSolving={idx + 1 === solvingRow}
              isCurrent={idx === guesses.length}
            />
          </div>
        );
      })}
    </div>
  );
}
