import classnames from "classnames";
import { letterStatus } from "../wordle.utils";
import { useWordle } from "../wordle.hooks";

interface RowsProps {
  guess?: string;
  isCurrent?: boolean;
  isSolving?: boolean;
  isRevealing?: boolean;
  currentGuess: string;
  answer: string;
}

const Rows: React.FC<RowsProps> = ({
  guess,
  currentGuess,
  isRevealing = false,
  isSolving = false,
  isCurrent = false,
  answer,
}) => {
  const ROWS = 5;
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
  const { guess, guesses, answer, solvingRow } = state.context;

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i, idx) => {
        const rowGuess = guesses[idx];

        return (
          <div key={i} className="Column">
            <Rows
              isRevealing={state.value === "revealing"}
              guess={rowGuess}
              answer={answer}
              currentGuess={guess}
              isSolving={idx + 1 === solvingRow}
              isCurrent={idx === guesses.length}
            />
          </div>
        );
      })}
    </div>
  );
}
