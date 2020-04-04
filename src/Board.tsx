import React, { useState } from "react";
import BoardSquare, { Position } from "./BoardSquare";
import { prepareBoardSquares } from "./utils";

const BOARD_SIZE = 8;

const boardStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap",
};

export interface BoardSquare {
  x: number;
  y: number;
  color: string;
}

function renderSquare(
  square: BoardSquare,
  swapSquare: (source: Position, target: Position) => void
) {
  const { x, y, color } = square;
  return (
    <BoardSquare
      key={`x-${x}-y${y}`}
      position={{ x, y }}
      color={color}
      swapSquare={swapSquare}
    />
  );
}

const Board: React.FC = () => {
  const squares = prepareBoardSquares(BOARD_SIZE);
  const [boardSquares, setBoardSquares] = useState(squares);

  const swapSquare = (source: Position, target: Position) => {
    const sourceIndex = boardSquares.findIndex(
      (item) => item.x === source.x && item.y === source.y
    );
    const targetIndex = boardSquares.findIndex(
      (item) => item.x === target.x && item.y === target.y
    );
    const newBoardSquares = [...boardSquares];
    const tmpSquare = { ...newBoardSquares[sourceIndex] };
    newBoardSquares[sourceIndex].color = newBoardSquares[targetIndex].color;
    newBoardSquares[targetIndex].color = tmpSquare.color;
    setBoardSquares(newBoardSquares);
  };

  return (
    <div style={boardStyle}>
      {boardSquares.map((item) => renderSquare(item, swapSquare))}
    </div>
  );
};
export default Board;
