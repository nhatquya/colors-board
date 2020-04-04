import reshader from "reshader";
import { COLOR_PLATE } from "./constants";

export const prepareBoardSquares  = (boardSize) => {
  const squares = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const { variations } = reshader(COLOR_PLATE[y], {
        numberOfVariations: boardSize,
        contrastRatio: 0.2
      });
      squares.push({ x, y, color: variations.all[x] });
    }
  }
  return squares;
};
export default {};
