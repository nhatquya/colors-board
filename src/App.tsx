import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import Board from "./Board";

const wrapperStyle: React.CSSProperties = {
  textAlign: "center",
};

const containerStyle = {
  width: 500,
  height: 500,
  border: "1px solid gray",
  margin: "0 auto",
};

function App() {
  return (
    <div style={wrapperStyle}>
      <h2>Colors Board</h2>
      <div style={containerStyle}>
        <DndProvider backend={Backend}>
          <Board />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
