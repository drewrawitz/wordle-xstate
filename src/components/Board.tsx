import classnames from "classnames";
import { letterStatus } from "../utils/wordle";
import useWordle from "../hooks/useWordle";

interface RowsProps {
  guess?: string;
  isCurrent: boolean;
  currentGuess: string;
  answer: string;
}

const Rows: React.FC<RowsProps> = ({
  guess,
  currentGuess,
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
    <div className="Row-wrapper">
      {Array.from(rowKeys).map((i, idx) => {
        const letter = guessArray[idx] || "";
        const status = getLetterStatus(letter, idx);

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

  const { guess, guesses, answer } = state.context;

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i, idx) => {
        const rowGuess = guesses[idx];

        return (
          <div key={i} className="Column">
            <Rows
              guess={rowGuess}
              answer={answer}
              currentGuess={guess}
              isCurrent={idx === guesses.length}
            />
          </div>
        );
      })}
    </div>
  );
}
