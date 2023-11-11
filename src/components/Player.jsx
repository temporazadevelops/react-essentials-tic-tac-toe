import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActivePlayer,
  onChangePlayerName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditButton = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  };
  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  let displayPlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    displayPlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerNameChange}
      />
    );
  }

  return (
    <li className={isActivePlayer ? "active" : ""}>
      <span className="player">
        {displayPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
