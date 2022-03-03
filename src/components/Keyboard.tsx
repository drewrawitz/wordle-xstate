import React from "react";

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
  return <div className="Keyboard-key">{getKeyLabel(label)}</div>;
};

export default function Keyboard() {
  return (
    <div className="Keyboard-wrapper">
      <div className="Keyboard-col">
        {"qwertyuiop".split("").map((key) => (
          <Key label={key} />
        ))}
      </div>

      <div className="Keyboard-col">
        {"asdfghjkl".split("").map((key) => (
          <Key label={key} />
        ))}
      </div>

      <div className="Keyboard-col">
        {"~zxcvbnm_".split("").map((key) => (
          <Key label={key} />
        ))}
      </div>
    </div>
  );
}
