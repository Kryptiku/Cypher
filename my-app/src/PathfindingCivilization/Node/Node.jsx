import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      row,
      isWall,
      isFinish,
      isStart,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      selectedAlgorithm,
    } = this.props;
    const extraClassName = isFinish
      ? `${
          selectedAlgorithm === "Dijkstra"
            ? "node-dijkstra-finish"
            : selectedAlgorithm === "A*"
            ? "node-astar-finish"
            : ""
        }`
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
        className={`node ${extraClassName}`}
      ></div>
    );
  }
}
