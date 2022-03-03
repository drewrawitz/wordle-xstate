function Rows() {
  const ROWS = 5;
  const rowKeys = Array(ROWS).keys();

  return (
    <div className="Row-wrapper">
      {Array.from(rowKeys).map((i) => (
        <div key={i} className="Row-tile"></div>
      ))}
    </div>
  );
}

export default function Board() {
  const COLUMNS = 6;
  const columnKeys = Array(COLUMNS).keys();

  return (
    <div className="Board">
      {Array.from(columnKeys).map((i) => (
        <div key={i} className="Column">
          <Rows />
        </div>
      ))}
    </div>
  );
}
