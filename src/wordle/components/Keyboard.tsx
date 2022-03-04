import React, { useEffect } from "react";
import classnames from "classnames";
import { letterStatus } from "../wordle.utils";
import { useWordle } from "../wordle.hooks";

interface KeyProps {
  label?: string;
  value: string;
}

const sendKey = (code: string) => {
  if (code === "Backspace") {
    return "guess.backspace";
  } else if (code === "Enter") {
    return "guess.submit";
  } else {
    return {
      type: "guess.key",
      key: code.toUpperCase(),
    };
  }
};

const Key: React.FC<KeyProps> = ({ label, value }) => {
  const { state, send } = useWordle();
  const { guesses, answer } = state.context;
  const status = letterStatus(value, answer, guesses);
  const letter = label || value;

  const onClick = (letter: string) => {
    const data = sendKey(letter);
    send(data);
  };

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={classnames("Keyboard-key", {
        [`Keyboard-key--${status}`]: status !== "unplayed",
      })}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default function Keyboard() {
  const letterMap = (key: string) => <Key key={key} value={key} />;
  const { send } = useWordle();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const data = sendKey(e.key);
      send(data);
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
      <div className="Keyboard-col">
        <Key value="Enter" />
        {"zxcvbnm".split("").map(letterMap)}
        <Key value="Backspace" label="(X)" />
      </div>
    </div>
  );
}
