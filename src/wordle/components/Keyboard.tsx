import React, { useEffect } from "react";
import classnames from "classnames";
import { letterStatus } from "../wordle.utils";
import { useWordle } from "../wordle.hooks";

const KEY_ENTER = "~";
const KEY_BACKSPACE = "_";

interface KeyProps {
  label: string;
}

const getKeyLabel = (label: string) => {
  switch (label) {
    case KEY_ENTER:
      return "Enter";
    case KEY_BACKSPACE:
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
    if (letter === KEY_BACKSPACE) {
      send("guess.backspace");
    } else if (letter === KEY_ENTER) {
      send("guess.submit");
    } else {
      send({
        type: "guess.key",
        key: letter.toUpperCase(),
      });
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={classnames("Keyboard-key", {
        [`Keyboard-key--${status}`]: status !== "unplayed",
      })}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default function Keyboard() {
  const letterMap = (key: string) => <Key key={key} label={key} />;
  const { send } = useWordle();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        send({ type: "guess.backspace" });
      } else if (e.key === "Enter") {
        send("guess.submit");
      } else {
        send({
          type: "guess.key",
          key: e.key.toUpperCase(),
        });
      }
    };

    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);

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
