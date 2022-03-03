import { wordleMachine } from "../machines/wordle";
import { useMachine } from "@xstate/react";

interface RowsProps {
  guess?: string;
}

const Rows: React.FC<RowsProps> = ({ guess }) => {
  const ROWS = 5;
  const rowKeys = Array(ROWS).keys();
  const guessArray = guess?.split("") || [];

  return (
    <div className="Row-wrapper">
      {Array.from(rowKeys).map((i, idx) => (
        <div key={i} className="Row-tile">
          {guessArray[idx]}
        </div>
      ))}
    </div>
  );
};

export default function Board() {
  const COLUMNS = 6;
  const columnKeys = Array(COLUMNS).keys();
  const [state] = useMachine(wordleMachine);
  const { guesses } = state.context;

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i, idx) => {
        const guess = guesses[idx];

        return (
          <div key={i} className="Column">
            <Rows guess={guess} />
          </div>
        );
      })}
    </div>
  );
}
