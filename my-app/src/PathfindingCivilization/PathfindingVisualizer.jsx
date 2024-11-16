import React, { Component } from "react";
import Node from "./Node/Node";

import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

<<<<<<< Updated upstream
  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
=======
  visualize(algorithm) {
    const { selectedAlgorithm } = this.state;
    
    this.setState({
      algorithmTimer: null,
      animationTimer: null,
    });

    if (!selectedAlgorithm) {
        const descriptionElement = document.getElementById("algo_description");
        if (descriptionElement) {
            descriptionElement.classList.add("shake");
            setTimeout(() => {
                descriptionElement.classList.remove("shake");
            }, 300);
        }
        this.playDenySound();
        return;
    }

    const algorithmStartTime = Date.now(); // Start the algorithm timer

    this.setState({ buttonDisabled: true });
    this.clearGrid(false);
    this.playStartSound();
    this.playClickSound();

    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;

    switch (algorithm) {
        case "A*":
            visitedNodesInOrder = aStar(grid, startNode, finishNode);
            break;
        case "Dijkstra":
            visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            break;
        default:
            return;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    const algorithmEndTime = Date.now(); // Calculate and store the algorithm timer
    const algorithmDuration = algorithmEndTime - algorithmStartTime;
    this.setState({ algorithmTimer: algorithmDuration });
    
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

    // Start the animation timer
    const animationStartTime = Date.now();

    setTimeout(() => {
        this.playFinishSound();
        this.setState({ buttonDisabled: false });

        // Calculate and store the animation timer
        const animationEndTime = Date.now();
        const animationDuration = animationEndTime - animationStartTime;
        this.setState({ animationTimer: animationDuration });
    }, 10 * visitedNodesInOrder.length + 100 * nodesInShortestPathOrder.length);
}

>>>>>>> Stashed changes

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
<<<<<<< Updated upstream
        <div id="controls_container">
          <button className="djikstra_button" onClick={() => this.visualizeDijkstra()}>
=======
        <Howler src={BgMusic} playing={isMusicPlaying} volume={0.5} loop />
        <Howler src={RunningSound} playing={this.state.buttonDisabled} loop />
        <div id="controls">
          <div id="dropdown-container">
            <DropdownList
              id="dropdown-list"
              data={algorithms}
              value={selectedAlgorithm || "Algorithms:"}
              onChange={this.handleChange}
              open={isDropdownOpen}
              onToggle={this.toggleDropdown} // toggle dropdown visibility manually
            />
          </div>
          <button
            onClick={() => {
              this.visualize(selectedAlgorithm);
            }}
            style={{
              backgroundColor: this.state.buttonDisabled ? "red" : "#87A330",
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Visualize {selectedAlgorithm}
          </button>
          <button
            onClick={() => {
              this.playClearSound();
              this.playClickSound();
              this.clearGrid(true);
            }}
            style={{
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Clear Grid
          </button>
          <button
            onClick={() => {
              this.playClearSound();
              this.playClickSound();
              this.clearGrid(false);
            }}
            style={{
              cursor: this.state.buttonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={this.state.buttonDisabled}
          >
            Clear Path
          </button>
          <button
            onClick={() => {
              this.toggleMusic(!this.state.isMusicPlaying);
              this.playClickSound();
            }}
          >
            <img
              src={isMusicPlaying ? MusicOnIcon : MusicOffIcon}
              alt={isMusicPlaying ? "Music On" : "Music Off"}
              style={{ width: "24px", height: "24px" }}
            />
>>>>>>> Stashed changes
          </button>
          <h1>Visualize Djikstra</h1>
        </div>
<<<<<<< Updated upstream
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, row, col, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
=======
        <div id="algo_description_container">
          <div id="algo_description">
            {this.getAlgorithmDescription(selectedAlgorithm)}
          </div>
        </div>
        <div id="gridcontainer">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {
                      isStart,
                      isFinish,
                      row,
                      col,
                      isWall,
                      heuristic,
                      fCost,
                    } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        fCost={fCost}
                        heuristic={heuristic}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => {
                          if (!isStart && !isFinish) {
                            this.handleMouseDown(row, col);
                          }
                        }}
                        onMouseEnter={(row, col) => {
                          if (!isStart && !isFinish) {
                            this.handleMouseEnter(row, col);
                          }
                        }}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div id="timer-container">
              <div id="algorithm-timer">
                <strong>Algorithm Time: </strong>
                <p class="time">
                {this.state.algorithmTimer
                  ? `${this.state.algorithmTimer} ms`
                  : "Not started"}
                </p>
              </div>
              <div id="animation-timer">
                <strong>Animation Time: </strong>
                <p class="time">
                {this.state.animationTimer
                  ? `${(this.state.animationTimer / 1000).toFixed(2)} ms`
                  : "Not started"}
                </p>
              </div>
>>>>>>> Stashed changes
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
