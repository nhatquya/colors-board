import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ITEM_TYPE } from "./constants";

export interface Position {
  x: number;
  y: number;
}

interface BoardSquareProps {
  position: Position;
  color: string;
  swapSquare: (source: Position, target: Position) => void;
}

const boardSquareStyle = (color: string, opacity: number) =>
  ({
    position: "relative",
    width: "12.5%",
    height: "12.5%",
    boxShadow: "inset 0px 0px 0px 0.3px #000",
    backgroundColor: color,
    opacity,
  } as React.CSSProperties);

const BoardSquare: React.FC<BoardSquareProps> = (props) => {
  const { color, position, swapSquare } = props;
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE.BOARD_SQUARE, data: position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE.BOARD_SQUARE,
    canDrop: (item: any) => item !== position,
    drop: (item: any) => {
      swapSquare(item.data, position);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const opacity = isDragging || isOver ? 0.5 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={boardSquareStyle(color, opacity)}
      className="board-square"
    />
  );
};

export default BoardSquare;
