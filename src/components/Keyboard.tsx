import React from "react";
import { wordleMachine } from "../machines/wordle";
import { letterStatus } from "../utils/wordle";
import { useMachine } from "@xstate/react";
import classnames from "classnames";

interface KeyProps {
  label: string;
  status: string;
}

const getKeyLabel = (label: string) => {
  switch (label) {
    case "~":
      return "Enter";
    case "_":
      return "(X)";
    default:
      return label;
  }
};

const Key: React.FC<KeyProps> = ({ label, status }) => {
  const letter = getKeyLabel(label);

  return (
    <div
      className={classnames("Keyboard-key", {
        [`Keyboard-key--${status}`]: status !== "unplayed",
      })}
    >
      {letter}
    </div>
  );
};

export default function Keyboard() {
  const [state] = useMachine(wordleMachine);
  const { guesses, answer } = state.context;

  const getLetterStatus = (letter: string, index?: number) =>
    letterStatus(letter, answer, guesses, index);

  const letterMap = (key: string) => (
    <Key key={key} label={key} status={getLetterStatus(key)} />
  );

  return (
    <div className="Keyboard-wrapper">
      <div className="Keyboard-col">
        {"qwertyuiop".split("").map(letterMap)}
      </div>
      <div className="Keyboard-col">{"asdfghjkl".split("").map(letterMap)}</div>
      <div className="Keyboard-col">{"~zxcvbnm_".split("").map(letterMap)}</div>
    </div>
  );
}
