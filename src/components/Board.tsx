import classnames from "classnames";
import { wordleMachine } from "../machines/wordle";
import { useMachine } from "@xstate/react";
import { letterStatus } from "../utils/wordle";

interface RowsProps {
  guess?: string;
  answer: string;
}

const Rows: React.FC<RowsProps> = ({ guess, answer }) => {
  const ROWS = 5;
  const rowKeys = Array(ROWS).keys();
  const guessArray = guess?.split("") || [];

  const getLetterStatus = (letter: string, index?: number) =>
    letter ? letterStatus(letter, answer, guessArray, index) : "unplayed";

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
  const [state] = useMachine(wordleMachine);
  const { guesses, answer } = state.context;

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i, idx) => {
        const guess = guesses[idx];

        return (
          <div key={i} className="Column">
            <Rows guess={guess} answer={answer} />
          </div>
        );
      })}
    </div>
  );
}
