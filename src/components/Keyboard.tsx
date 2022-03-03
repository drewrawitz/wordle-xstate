import React from "react";
import { letterStatus } from "../utils/wordle";
import classnames from "classnames";
import useWordle from "../hooks/useWordle";

interface KeyProps {
  label: string;
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

const Key: React.FC<KeyProps> = ({ label }) => {
  const { state, send } = useWordle();

  const letter = getKeyLabel(label);
  const { guesses, answer } = state.context;
  const status = letterStatus(letter, answer, guesses);

  const onClick = (letter: string) => {
    send({
      type: "guess.key",
      key: letter.toUpperCase(),
    });
  };

  return (
    <button
      type="button"
      onClick={() => onClick(letter)}
      className={classnames("Keyboard-key", {
        [`Keyboard-key--${status}`]: status !== "unplayed",
      })}
    >
      {letter}
    </button>
  );
};

export default function Keyboard() {
  const letterMap = (key: string) => <Key key={key} label={key} />;

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
